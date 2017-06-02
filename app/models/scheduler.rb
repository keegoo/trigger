class Scheduler
  include Mongoid::Document

  field :tasks,         type: Array,    default: []
  field :total_hits,    type: Integer,  default: 0
  field :total_errors,  type: Integer,  default: 0


  def self.create_with_defaults(schedule)
    status = :waiting
    status = :missed if self.schedule_expired?(schedule[:tasks])
    default_task = {
      generator:  "sample-generator".upcase,
      time:       Time.now.utc.iso8601,
      cmd:        "ping www.google.com -c",
      status:     status,
      running:    0,
      stopped:    0
    }

    tasks = schedule[:tasks].map{|x| default_task.merge(x)}
    self.create({ tasks: tasks })
  end

  def self.progress(id)
    self.progresses([id])[0][:status]
  end

  def self.progresses(ids)
    docs = self.where( _id: { "$in": ids } )
    docs.map do |doc| 
      {
        _id: doc._id,
        status: self.get_status(doc.tasks.map{|x| x[:status] })
      } 
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
        "tasks.$.running": bhash[:ustart] - bhash[:ustop],
        "tasks.$.stopped": bhash[:ustop]
      }, 
      "$set": {
        "tasks.$.status": bhash[:status]
      })
  end

  private

  def self.get_status(status_ary)
    return :running if status_ary.include?(:running)
    uniq_status_ary = status_ary.uniq
    uniq_status_ary.length == 1 ? uniq_status_ary[0] : :error
  end

  def self.schedule_expired?(tasks)
    tasks.map{|x| x[:time]}.sort[0] > (Time.now + 12).utc.iso8601 ? false : true
  end
end