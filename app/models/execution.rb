class Execution
  include Mongoid::Document

  field :hour,          type: String
  field :total_hits,    type: Integer
  field :total_users,   type: Integer
  field :total_errors,  type: Integer 
  field :values,        type: Hash

  # values: {
  #   0: {
  #      0: 12, 
  #      6: 23, 
  #     12: 20, 
  #     18: 19, 
  #     24: 13,
  #     30: 12,
  #     36: 14,
  #     42: 15,
  #     48: 23,
  #     54: 13
  #   },
  #   1: { },
  #   2: { },
  #   ...
  #   59:{ }
  # }

  belongs_to :scheduler

  def self.create_with_default_values(execution_hourly, scheduler_id)
    execution = self.create(
      hour: execution_hourly,
      total_hits: 0,
      total_users: 0,
      total_errors: 0,
      scheduler_id: scheduler_id,
      values: {}
    )
  end

  def self.insert(hourly, min, second, value, scheduler_id)
    unless self.where({ hour: hourly, scheduler_id: scheduler_id }).exists?
      self.create_with_default_values(hourly, scheduler_id)
    end
      
    self.where({ hour: hourly, scheduler_id: scheduler_id }).set("values.#{min}.#{second}" => value)
  end
end
