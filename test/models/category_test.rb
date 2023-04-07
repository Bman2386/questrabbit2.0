require 'test_helper'

class CategoryTest < ActiveSupport::TestCase
    test "Categories Exist" do
        categories = Category.all
        assert_not_nil(categories, "Categories Should Exist")
    end

    test "Each Category has a name and description" do
        categories = Category.all
        categories.each do |category|
            assert_not_nil(:category_name, "no name for #{category}")
            assert_not_nil(:ex_description, "no desctiption for #{category}")
        end
    end
    
    test "Each category has an ID" do 
        categories = Category.all
        categories.each do |category|
            assert_not_nil(:id, "#{category} doesn't have an id")
        end
    end
end