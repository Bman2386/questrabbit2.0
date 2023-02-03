class CreateQuests < ActiveRecord::Migration[7.0]
  def change
    create_table :quests do |t|
    t.string "quest_name", null: false
    t.integer "category_id", null: false
    t.string "details", null: false
    t.integer "creator_id", null: false
    t.datetime "start_time"
    t.boolean "completed"
    t.integer "adventurer_id"
      t.timestamps
    end
    add_index :quests, :quest_name
  end
end
