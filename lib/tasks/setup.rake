namespace :setup do
  task :npms do
    puts "install npms dependency ..."
    system "cd client & npm install & cd .."
  end

  task :build do
    puts "generate bundler.js ..."

    webpack_path = File.join(".", "node_modules", ".bin", "webpack")
    webpack_path.gsub!('/', '\\') if isWindowsPlatform?

    system "cd client & #{webpack_path} -d & cd .."
  end

  task all: [:npms, :build] do 
    puts "ENV setup done!"
  end

  def isWindowsPlatform?
    !!((RUBY_PLATFORM =~ /(win|w)(32|64)$/) || (RUBY_PLATFORM=~ /mswin|mingw/))
  end
end