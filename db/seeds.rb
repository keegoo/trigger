# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

15.times do |i|
  j = rand(0..2)
  prefix = ["APC", "SF1", "SF2", "SZN"]
  n = i.to_s.length == 1 ? "0#{i}" : i
  Generator.create(
    {
      name: "#{prefix[j]}-WGROAPP3#{n}",
      last_used: "#{i.day.ago.utc.iso8601}",
      frequency: 0
    }
  )
end

# test purpose
Generator.create(
  {
      name: "CYs-MacBook-Pro.local",
      last_used: "2017-03-27T07:02:22Z",
      frequency: 0
  }
)