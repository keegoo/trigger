class Execution
  include Mongoid::Document

  field :total_hits,    type: Integer
  field :total_users,   type: Integer
  field :total_errors,  type: Integer 
  field :hour,          type: String
  field :values,          type: Hash

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

end
