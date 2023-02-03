# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_02_03_210052) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "category_name", null: false
    t.string "ex_description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "quests", force: :cascade do |t|
    t.string "quest_name", null: false
    t.integer "category_id", null: false
    t.string "details", null: false
    t.integer "creator_id", null: false
    t.datetime "start_time"
    t.boolean "completed"
    t.integer "adventurer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["quest_name"], name: "index_quests_on_quest_name"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "body", null: false
    t.string "rating", null: false
    t.integer "adventurer_id", null: false
    t.integer "user_id", null: false
    t.string "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["adventurer_id"], name: "index_reviews_on_adventurer_id"
  end

  create_table "users", force: :cascade do |t|
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
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_token"], name: "index_users_on_session_token"
    t.index ["username"], name: "index_users_on_username"
  end

end
