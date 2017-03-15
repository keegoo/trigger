class Scheduler
  include Mongoid::Document

  field :date,      type: String
  field :schedule,  type: Array
end