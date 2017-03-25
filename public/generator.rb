require 'json'
require 'httparty'
require 'socket'

class Config
  def update
    response = HTTParty.get("http://127.0.0.1:3000/schedulers/active")
    task = next_task(JSON.parse(response.body))

    {
      cmd: "ping www.baidu.com",
      time: task["date"]
    }
  end

  def next_task(schedulers)
    # me = Socket.gethostname
    me = "SF2-WGROAPP313"
    
    tmp = schedulers.select do |scheduler| 
      scheduler["schedule"].map{|x| x["generator"]}.include?(me) 
    end

    tmp == nil ? nil : tmp[0]
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

puts Config.new.update

# every_n_seconds(6) do
#   c = Config.update()
#   cmd = c.cmd
#   time = c.time

#   if already_running
#     HeartBeat.send(status)
#     check-process-is-running
#   else
#     if (time-is-up)
#       process = IO.open3(c.cmd)
#       status = running
#     end
#   end
# end