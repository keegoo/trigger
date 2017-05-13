require 'test_helper'

class RoutesTest < ActionDispatch::IntegrationTest

  test "generators routes test" do
    assert_generates "generators/update_status", { 
      controller: "generators", 
      action: "update_status" 
    }

    assert_generates "generators", {
      controller: "generators",
      action: "index"
    }
  end

  test "schedulers routes test" do
    assert_generates "schedulers", {
      controller: "schedulers",
      action: "index"
    }

    assert_generates "schedulers/1", {
      controller: "schedulers",
      action: "show",
      id: "1"
    }

    assert_generates "schedulers", {
      controller: "schedulers",
      action: "create"
    }

    assert_generates "schedulers/1", {
      controller: "schedulers",
      action: "destroy",
      id: "1"
    }

    assert_generates "schedulers/active", {
      controller: "schedulers",
      action: "active"
    }
  end

  test "executions routes test" do
    assert_generates "schedulers/1/executions", {
      controller: "executions",
      action: "create",
      scheduler_id: "1"
    }
    assert_generates "schedulers/1/executions/2", {
      controller: "executions",
      action: "update",
      scheduler_id: "1",
      id: "2"
    }
  end
end