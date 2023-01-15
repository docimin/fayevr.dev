require "test_helper"

class GalleryControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get gallery_home_url
    assert_response :success
  end
end
