# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

11.times do |i|
  HistorialSchedule.create(
    {
      date: "#{i.day.ago.utc.iso8601}", 
      schedule: [
        {generator: "APC-WGROAPP301", time: "11:30", cmd: "ping 127.0.0.1 -t", status: "success"}, 
        {generator: "APC-WGROAPP301", time: "12:30", cmd: "ping 127.0.0.1 -t", status: "success"}, 
        {generator: "APC-WGROAPP301", time: "13:30", cmd: "ping 127.0.0.1 -t", status: "success"}, 
        {generator: "APC-WGROAPP301", time: "14:30", cmd: "ping 127.0.0.1 -t", status: "success"}
      ]
    })
end