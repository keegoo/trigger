class ExecutionTunnel
  include Mongoid::Document

  field :hour,          type: String
  field :values,        type: Hash,     default: {}

  belongs_to :scheduler

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

  def self.insert(min, second, hits, scheduler_id, hourly)
    self.create_if_not_exist(hourly, scheduler_id)
    doc = self.where({ hour: hourly, scheduler_id: scheduler_id }).first
    
    a_min, a_sec = self.get_adjusted_min_second(min, second)
    doc.inc("values.#{a_min}.#{a_sec}" => hits) if hits > 0
  end

  private

  def self.create_if_not_exist(hourly, scheduler_id)
    unless self.where(hour: hourly, scheduler_id: scheduler_id).exists?
      self.create(hour: hourly, scheduler_id: scheduler_id)
    end
  end

  def self.get_adjusted_min_second(min, second)
    total = min.to_i * 60 + second.to_i
    # increase to base of six
    adjusted_total = (6 - total % 6) + total
    return (adjusted_total / 60).to_s, (adjusted_total % 60).to_s
  end
end