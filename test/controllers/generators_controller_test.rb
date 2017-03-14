require 'test_helper'

class GeneratorsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get generators_index_url
    assert_response :success
  end

end
