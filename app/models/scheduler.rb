class Scheduler
  include Mongoid::Document

  field :schedule,  type: Array
end