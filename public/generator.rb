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
      HTTParty.get( host + "/generators/update_status?generator=#{whoami}")
    rescue => err
      $LOGGER.debug("send heart beat failed")
    end
  end

  def send_data(jsonstr)
    begin
      HTTParty.post( 
        host + "/schedulers/591469bb8fb238054bf1e5e7/executions/upsert",
        body: jsonstr,
        headers: { 'Content-Type' => 'application/json' }
      )
    rescue
      $LOGGER.debug("send data failed")
    end
  end

  def whoami
    Socket.gethostname.upcase
  end

  def host
    "http://127.0.0.1:3000"
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
  #   "generator"=>"CYs-MacBook-Pro.local", 
  #   "time"=>"2017-04-14T08:00:00Z", 
  #   "cmd"=>"ping www.google.com -c 30"
  # }
  def next_task()
    all_active_tasks()
    heart_beat()

    if @response_body == nil
      {}
    else
      tasks = JSON.parse(@response_body)
      my_tasks = tasks.select do |t|
        t["schedule"].map{|x| x["generator"]}.include?(whoami)
      end

      if my_tasks.empty?
        {}
      else
        # narrow down my tasks
        my_tasks.\
        map{|x| x["schedule"]}.reduce(:+).\
        select{|x| x["generator"].include?(whoami)}.\
        sort_by{|x| x["time"]}[0]
      end
    end
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

  def all_active_tasks()
    @response_body = nil
    begin
      response = HTTParty.get("http://127.0.0.1:3000/schedulers/active")
      @response_body = response.body
    rescue => err
      $LOGGER.debug("get config failed")
    end

    unless valid_json?(@response_body) && valid_json_content?(@response_body)
      $LOGGER.debug("invalid JSON response: #{@response_body}")
      @response_body = nil
    end
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

  def self.read(str)
    jsonstr = self.parse(str).to_json
    self.send_data(jsonstr)
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
# ========== Main ==========
every_n_seconds(6) do

  if $generator.status == :running
    $LOGGER.info("#{$task[:cmd]} is running with pid = #{$generator.pid}")
    $generator.read_output do |each_line, line_num|
      PingParser.read(each_line)
      Utils.heart_beat
    end
  else
    if $task.empty?
      $LOGGER.info("no task")
    else
      $LOGGER.info("task: #{$task}")
      if true
      # if Time.now.utc.iso8601 >= $task["time"]
        $LOGGER.info("trigger task #{$task['cmd']}")
        $generator.run($task["cmd"])
        $task = {}
      end
    end
  end

  $task = $config.next_task
end