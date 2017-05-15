class Execution
  include Mongoid::Document

  field :hour,          type: String
  field :total_hits,    type: Integer
  field :total_errors,  type: Integer 
  field :users,         type: Hash
  field :values,        type: Hash

  # users: {
  #   "APC-WGROAPP301": { "running": 12, "stopped": 8},
  #   ...
  # }
  # ==================
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
      total_errors: 0,
      users: {},
      scheduler_id: scheduler_id,
      values: {}
    )
  end

  def self.insert(min, second, value, scheduler_id, hourly)
    doc = self.where({ hour: hourly, scheduler_id: scheduler_id })
    unless doc.exists?
      self.create_with_default_values(hourly, scheduler_id)
    end
    
    a_min, a_sec = self.get_adjusted_min_second(min, second)
    doc.first.inc("values.#{a_min}.#{a_sec}" => value) if value > 0
  end

  def self.add_to_users(generator, type, value, scheduler_id, hourly)
    doc = self.where({ hour: hourly, scheduler_id: scheduler_id }).first

    if value > 0
      doc.inc("users.#{generator}.started" => value) if type == :ustart
      doc.inc("users.#{generator}.stopped" => value) if type == :ustop
    else
      doc
    end
  end

  def self.add_to_summary(field, value, scheduler_id, hourly)
    doc = self.where({ hour: hourly, scheduler_id: scheduler_id }).first

    if [:total_hits, :total_errors].include?(field)
      doc.inc("#{field}" => value) if value > 0
    else
      doc
    end
  end

  private

  def self.get_adjusted_min_second(min, second)
    total = min.to_i * 60 + second.to_i
    # increase to base of six
    adjusted_total = (6 - total % 6) + total
    return (adjusted_total / 60).to_s, (adjusted_total % 60).to_s
  end
end
