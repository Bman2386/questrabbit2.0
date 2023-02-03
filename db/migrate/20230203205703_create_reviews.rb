class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
    t.string "body", null: false
    t.string "rating", null: false
    t.integer "adventurer_id", null: false
    t.integer "user_id", null: false
    t.string "username"
    t.timestamps
    end
    add_index :reviews, :adventurer_id
  end
end
