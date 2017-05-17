class ExecutionSummary
  include Mongoid::Document

  field :total_hits,    type: Integer,    default: 0
  field :total_errors,  type: Integer,    default: 0
  field :users,         type: Array,      default: []
  field :status,        type: Array,      default: []

  belongs_to :scheduler

  # ==================
  # users: [
  #   {name: "APC-WGROAPP301", running: 12, stopped: 8},
  #   ...
  # ]
  # ==================
  # status: [
  #   {name: "APC-WGROAPP301", status: "running/waiting/stopped"},
  #   ...
  # ]
  def self.create_with_status(scheduler_id, generators_ary, status=:waiting)
    if generators_ary.empty?
      self.create( scheduler_id: scheduler_id )
    else
      self.create(
        scheduler_id: scheduler_id,
        status: generators_ary.map{|x| {name: x, status: status} }
      )
    end 
  end

  def self.update(scheduler_id, ahash)
    self.create_if_not_exist(scheduler_id)
    doc = self.where( scheduler_id: scheduler_id ).first
    generator = ahash[:generator]

    if (ahash[:hits] + ahash[:errors] + ahash[:ustart] + ahash[:ustop]) > 0
      self.where({ scheduler_id: scheduler_id }).inc({
        "total_hits": ahash[:hits],
        "total_errors": ahash[:errors]
      })

      self.update_users(generator, ahash[:ustart], ahash[:ustop], scheduler_id)
    end

    if ["running", "waiting", "stopped"].include?(ahash[:status])
      self.update_status(generator, ahash[:status], scheduler_id)
    end
  end

  def self.update_users(generator, ustart, ustop, scheduler_id)
    # add generator into users array if not exist yet
    unless self.where(scheduler_id: scheduler_id, "users.name": generator).exists?
      self.where(scheduler_id: scheduler_id).add_to_set(
        "users": {name: generator, running: 0, stopped: 0} )
    end

    self.where({
      scheduler_id: scheduler_id,
      "users.name": generator
    }).inc("users.$.running": ustart - ustop, "users.$.stopped": ustop)
  end

  def self.update_status(generator, status, scheduler_id)
    # add generator into status array if not exist yet
    unless self.where(scheduler_id: scheduler_id, "status.name": generator).exists?
      self.where(scheduler_id: scheduler_id).add_to_set(
        "status": {name: generator, status: status})
    end

    self.where({
      scheduler_id: scheduler_id,
      "status.name": generator
    }).set("status.$.status": status)
  end

  def self.progress(scheduler_id)
    doc = self.where({ scheduler_id: scheduler_id }).first
    status_ary = doc.status.map{|x| x["status"]}
    return "running" if status_ary.include?("running")

    uniq_ary = status_ary.uniq
    if uniq_ary.size == 1
      return uniq_ary[0]  # waiting/stopped/missed
    else
      puts "warning: doesn't expect this state."
      puts "warning: progress array is: #{progress.inspect}"
      return "dead missed"
    end
  end

  private

  def self.create_if_not_exist(scheduler_id)
    unless self.where(scheduler_id: scheduler_id).exists?
      self.create(scheduler_id: scheduler_id)
    end
  end

end