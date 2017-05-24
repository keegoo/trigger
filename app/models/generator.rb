class Generator
  include Mongoid::Document

  field :name,      type: String
  field :last_used, type: String
  field :frequency, type: Integer

  def self.update_status(name)
    if self.where({name: name}).exists?
      self.where({name: name}).update(last_used: Time.now.utc.iso8601)
    else
      self.create({
        name: name, 
        last_used: Time.now.utc.iso8601,
        frequency: 0
      })
    end
  end
end