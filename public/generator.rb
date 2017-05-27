require 'json'
require 'httparty'
require 'socket'
require 'time'
require 'logger'
require 'open3'

# preserve 2 log files, each 1MB at most
$LOGGER = Logger.new('generator.log', 2, 1024 * 1000)

# log format
$LOGGER.formatter = proc do |severity, datetime, progname, msg|
   "[#{severity}] #{datetime}: #{msg}\n"
end


# ==========================
# Utils module
#   
#   Provide utilities for other class.
# 
module Utils
  def heart_beat()
    begin
      HTTParty.get( host + "/generators/update_status?generator=#{whoami}", verify: false)
    rescue => err
      $LOGGER.debug("send heart beat failed")
    end
  end

  def send_data(schedule_id, jsonstr)
    begin
      HTTParty.post( 
        host + "/schedulers/#{schedule_id}/update_status",
        body: jsonstr,
        headers: { 'Content-Type' => 'application/json' },
        verify: false
      )
    rescue
      $LOGGER.debug("send data failed")
    end
  end

  # ==========================
  # task example:
  # [
  #   {
  #     "_id": "591ec2358fb2380a31292223",
  #     "schedule": [
  #       { "generator": "APC-WGROAPP302", "time": "2017-05-19T12:00:00Z", "cmd": "ping www.google.com -c 30"},
  #       { "generator": "APC-WGROAPP301", "time": "2017-05-19T12:00:00Z", "cmd": "ping www.google.com -c 30"}
  #     ]
  #   },
  #   ...
  # ]
  def all_active_tasks()
    response_body = ''
    begin
      response = HTTParty.get( host + "/schedulers/active", verify: false)
      response_body = response.body
    rescue => err
      $LOGGER.debug("get config failed")
    end

    unless valid_json?(response_body) && valid_json_content?(response_body)
      $LOGGER.debug("invalid JSON response: #{@response_body}")
      response_body = ''
    end
    response_body
  end

  def whoami
    Socket.gethostname.upcase
  end

  def host
    # "https://trigger-sample.herokuapp.com"
    "http://127.0.0.1:3000"
  end

  private

  def valid_json?(str)
    begin
      JSON.parse(str)
      return true
    rescue JSON::ParserError => e
      return false
    end
  end

  # to-do
  def valid_json_content?(str)
    true
  end

  extend self
end


# ==========================
# Config class
# 
#   It did two things presently:
#     * get all schedules from Trigger and filter out the one for this generator.
#     * send heart beat request to Trigger.
#
class Config
  include Utils
  # ==========================
  # task example:
  # {
  #   "generator"=> "CYs-MacBook-Pro.local", 
  #   "time"=>      "2017-04-14T08:00:00Z", 
  #   "cmd"=>       "ping www.google.com -c 30",
  #   "_id" =>      "591ec2358fb2380a31292223"
  # }
  def next_task()
    heart_beat()
    task = {}

    response_body = all_active_tasks()
    unless response_body == ''
      active_tasks = JSON.parse(response_body)
      return {} if active_tasks.empty?

      task = active_tasks.map do |x| 
        t = my_first_task_in_schedule(x["tasks"])
        if t == nil
          return {}
        else
          t.merge("_id" => x["_id"])
        end
      end.sort_by{|x| x["time"]}[0]
    end
    return task
  end

  private

  # ==========================
  # given: [
  #   {"generator": "me", time:"00:00:20", cmd: "ping"},
  #   {"generator": "me", time:"00:00:10", cmd: "ping"},
  #   {"generator": "notme", time:"00:00:00", cmd: "ping"},
  #   {"generator": "notme", time:"00:00:00", cmd: "ping"},
  # ]
  # return: {"generator": "me", time: "00:00:10", cmd: "ping"}
  def my_first_task_in_schedule(tasks)
    tasks.select{|x| x["generator"] == whoami}.sort_by{|x| x["time"]}[0]
  end
end



# ==========================
# Generator class
# 
#   It controls the execution of sub process. You can:
#   
#     * `run` and `stop` a sub process
#     * `read_output` from a sub process
#     * check `status` of a sub process
#
#   Note: when you `read_output` from a sub process, `read_output`
#           would keep running till sub process finished.
#         I think fork was needed here.
#
class Generator
  attr_accessor :cmd
  attr_reader   :pid
  def initialize(cmd="")
    @cmd = cmd
    @pid = nil
  end

  def status
    if @pid == nil
      :waiting
    else
      processExist?(@pid) ? :running : :stopped
    end
  end

  def run(cmd)
    @stdin, @stdout, @stderr, wait_thr = Open3.popen3(cmd)
    @pid = wait_thr.pid
  end

  def stop
    safe_exit()
    if status == :running
      Process.kill(0, @pid) rescue false
    end
  end

  def read_output()
    line_num = 1
    @stdout.each_line do |line|
      yield(line, line_num) if block_given?
      line_num += 1
    end
  end

  private

  def safe_exit()
    begin 
      @stdin.close
      @stdout.close
      @stderr.close
    rescue => err
    end
  end

  def processExist?(pid)
    begin
      Process.getpgid( pid )
      true
    rescue Errno::ESRCH
      false
    end
  end
end


# ==========================
# PingParser class
# 
#   briefly, it deals with the output of Ping.
#   
#   Ping's output:
#     * ping: cannot resolve verywierfsitenamecouldnothave: Unknown host
#     * PING www.google.com (216.58.221.36): 56 data bytes
#     * 64 bytes from 216.58.221.36: icmp_seq=0 ttl=53 time=17.695 ms
#     * Request timeout for icmp_seq 0
#     * empty line
#     * --- www.google.com ping statistics ---
#     * 5 packets transmitted, 5 packets received, 0.0% packet loss
#     * round-trip min/avg/max/stddev = 17.385/18.388/19.137/0.709 ms
#
#   PingParser's input is Ping's output(each line)
#   PingParser's output is a hash, example:
#
#      {
#        status: "running/stopped/waiting",
#        hits: 1,    # as one Ping is one hit
#        error: 0,   # number of Pings which is timeout: 1 or 0
#        users: 1,   # as Ping is running with one thread, so it's 1
#        timestamp: "20170511T12:10:10Z"
#      }
#
class PingParser
  extend Utils

  def self.read(schedule_id, str)
    jsonstr = self.parse(str).to_json
    self.send_data(schedule_id, jsonstr)
  end

  def self.parse(str)
    default = {
      generator: whoami,
      status: :running,
      hits: 1,
      errors: 0,
      ustart: 0,
      ustop: 0
    }
    nohit       = { hits: 0 }
    user_start  = { ustart: 1 }
    user_stop   = { ustop: 1, status: :stopped }
    error       = { errors: 1 }

    case str
    when /.*?\Wcannot resolve\W.*?\WUnknown host/
      default.merge(nohit)
    when /^PING\W.*data bytes$/
      default.merge(nohit).merge(user_start)
    when /icmp_seq=.* ttl=.* time=.*$/
      default
    when /^Request timeout for/
      default.merge(error)
    when /^$/
      default.merge(nohit)
    when /--- .* statistics ---/
      default.merge(nohit)
    when /.* packet loss$/
      default.merge(nohit)
    when /round-trip/
      default.merge(nohit).merge(user_stop)
    else
      $LOGGER.warn("unknown type of Ping's output: #{str}")
      default.merge(nohit)
    end
  end
end



def every_n_seconds(n)
  loop do
    before = Time.now
    yield
    interval = n - (Time.now - before)
    sleep(interval) if interval > 0
  end
end

# ==========================
# global var
$generator = Generator.new
$config = Config.new
$task = {}
$schedule_id = ''
# ========== Main ==========
every_n_seconds(6) do

  if $generator.status == :running
    $LOGGER.info("#{$task[:cmd]} is running with pid = #{$generator.pid}")
    $generator.read_output do |each_line, line_num|
      PingParser.read($schedule_id, each_line)
      Utils.heart_beat
    end
  else
    if $task.empty?
      $LOGGER.info("no task")
    else
      $LOGGER.info("task: #{$task}")
      if Time.now.utc.iso8601 >= $task["time"]
        $LOGGER.info("trigger task #{$task['cmd']}")
        $generator.run($task["cmd"])
        $schedule_id = $task["_id"]
        $task = {}
      end
    end
  end

  $task = $config.next_task
end