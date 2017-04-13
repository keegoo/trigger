require 'json'
require 'httparty'
require 'socket'
require 'time'
require 'logger'
require 'open3'

# preserve 2 log files, each 1MB at most
$LOGGER = Logger.new('generator.log', 2, 1024 * 1000)

class Config
  def update
    begin
      response = HTTParty.get("http://127.0.0.1:3000/schedulers/active")
      # task = next_task(JSON.parse(response.body))
      $LOGGER.debug(response.code)
    rescue => err
      $LOGGER.info("get config failed")
    end
  end

  # ==========================
  # task example:
  # { cmd: 'ping www.google.com', time: '2017-04-13T19:00:00'}
  def next_task(schedulers="")
    # me = Socket.gethostname
    # me = "SF2-WGROAPP313"
    
    # tmp = schedulers.select do |scheduler| 
    #   scheduler["schedule"].map{|x| x["generator"]}.include?(me) 
    # end

    # tmp == nil ? nil : tmp[0]
    {
      cmd: 'ping www.google.com -c 20',
      time: '2017-04-13T12:03:50Z'
    }
  end
end

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
    stdin, stdout, stderr, wait_thr = Open3.popen3(cmd)
    @pid = wait_thr.pid
  end

  def stop
    if status == :running
      Process.kill(0, @pid) rescue false
    end
  end

  private

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
$task = { cmd: "", time: ""}
# ========== Main ==========
every_n_seconds(6) do
  $config.update
  $task = $config.next_task

  if $generator.status == :running
    $LOGGER.info("#{$task[:cmd]} is running with pid = #{$generator.pid}")
  else
    if $task[:cmd].empty?
      $LOGGER.info("no task")
    else
      $LOGGER.info("task: #{$task}")
      if Time.now.utc.iso8601 >= $task[:time]
        $LOGGER.info("trigger task #{$task[:cmd]}")
        $generator.run($task[:cmd])
        $task = { cmd: "", time: ""}
      end
    end
  end
end