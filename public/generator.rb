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
# Config class
# 
#   It did two things presently:
#     * get all schedules from Trigger and filter out the one for this generator.
#     * send heart beat request to Trigger.
#
class Config
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
      me = Socket.gethostname.upcase
      tasks = JSON.parse(@response_body)
      my_tasks = tasks.select do |t|
        t["schedule"].map{|x| x["generator"]}.include?(me)
      end

      if my_tasks.empty?
        {}
      else
        # narrow down my tasks
        my_tasks.\
        map{|x| x["schedule"]}.reduce(:+).\
        select{|x| x["generator"].include?(me)}.\
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

  def heart_beat()
    begin
      HTTParty.get("http://127.0.0.1:3000/generators/update_status?generator=#{Socket.gethostname}")
    rescue => err
      $LOGGER.debug("send heart beat failed")
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
    @stdout.each_line do |line|
      puts line
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
    $generator.read_output
  else
    if $task.empty?
      $LOGGER.info("no task")
    else
      $LOGGER.info("task: #{$task}")
      # if true
      if Time.now.utc.iso8601 >= $task["time"]
        $LOGGER.info("trigger task #{$task['cmd']}")
        $generator.run($task["cmd"])
        $task = {}
      end
    end
  end

  $task = $config.next_task
end