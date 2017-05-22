class Scheduler
  include Mongoid::Document

  field :tasks,         type: Array,    default: []
  field :total_hits,    type: Integer,  default: 0
  field :total_errors,  type: Integer,  default: 0


  def self.create_with_defaults(schedule)
    default_task = {
      generator:  "sample-generator".upcase,
      time:       Time.now.utc.iso8601,
      cmd:        "ping www.google.com -c",
      status:     :disconnected,
      running:    0,
      stopped:    0
    }

    tasks = schedule[:tasks].map{|x| default_task.merge(x)}
    self.create({ tasks: tasks })
  end

  def self.progress(id)
    doc = self.where( _id: id ).first
    status = doc.tasks.map{|x| x[:status]}
    return :running if status.include?("running")

    uniq_status = status.uniq
    if uniq_status.length == 1
      return uniq_status[0].to_sym
    else
      return :error
    end
  end

  def self.update_status(id, generator, ahash)
    bhash = {
      status: "waiting",
      hits:   0,
      errors: 0,
      ustart: 0,
      ustop:  0
    }.merge(ahash)

    self.where( _id: id, "tasks.generator": generator ).update( 
      "$inc": {
        total_hits: bhash[:hits],
        total_errors: bhash[:errors],
        "tasks.$.running": bhash[:ustart],
        "tasks.$.stopped": bhash[:ustop]
      }, 
      "$set": {
        "tasks.$.status": bhash[:status]
      })
  end
end