class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
    t.string "username", null: false
    t.string "session_token"
    t.string "password_digest"
    t.boolean "adventurer"
    t.integer "avg_rating"
    t.integer "total_ratings"
    t.boolean "elite"
    t.string "pitch"
    t.string "family_crest"
    t.string "realm"
    t.string "star_sign"
    t.timestamps
    end
    add_index :users, :username
    add_index :users, :session_token
  end
end
