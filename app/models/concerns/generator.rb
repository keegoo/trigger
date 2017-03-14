class Generator
  include Mongoid::Document

  field :name,      type: String
  field :status,    type: String
  field :last_used, type: String
  field :frequency, type: Integer
end