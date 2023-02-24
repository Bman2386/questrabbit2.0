# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Category.delete_all
User.delete_all
Review.delete_all
Quest.delete_all

fetch = Category.create({
    id: 1,
    category_name: 'Fetch',
    ex_description: 'Find and deliver 13 pink frost crystals'
})

craft = Category.create({
    id: 2,
    category_name: 'Craft',
    ex_description: 'Craft an alchemy table'
})

escort = Category.create({
    id: 3,
    category_name: 'Escort',
    ex_description: 'Escort the princess through the forbidden forest'
})

slay = Category.create({
    id: 4,
    category_name: 'Slay',
    ex_description: 'Slay that pesky dragon terrorizing the village'
})

guest = User.create({
    id: 1,
    username: 'Guest',
    password: 'hunter12',
    adventurer: false,
    avg_rating: 0,
    total_ratings: 0,
    elite: false,
    pitch: 'null',
    family_crest: 'Raven',
    realm: 'Earth',
    star_sign: 'North Star' 
})

hercules = User.create({
    id: 2,
    username: 'Hercules',
    password: 'hunter12',
    adventurer: true,
    avg_rating: 5,
    total_ratings: 1,
    elite: false,
    pitch: 'I am the strongest there is!',
    family_crest: 'Zues',
    realm: 'Divinity',
    star_sign: 'Ox'
})

goblin_slayer = User.create({
    id: 3,
    username: 'Goblin Slayer',
    password: 'hunter12',
    adventurer: true,
    avg_rating: 4,
    total_ratings: 1,
    elite: true,
    pitch: "I'll slay anything, especially goblins",
    family_crest: 'Sword and Shield',
    realm: 'Darkness',
    star_sign: 'Leo'
})

isaac_newton = User.create({
    id: 4,
    username: 'Isaac Newton',
    password: 'hunter12',
    adventurer: true,
    avg_rating: 3,
    total_ratings: 2,
    elite: false,
    pitch: 'I can create math for all uses and applications',
    family_crest: 'Owl',
    realm: 'Earth',
    star_sign: 'Capricorn'
})

quest1 = Quest.create({
    id: 1,
    quest_name: 'Moving',
    category_id: 3,
    details: 'I need help moving from 233 mission lane to 466 mission lane',
    creator_id: 1,
    start_time: 'Wed Feb 2 2023 12:00:00 GMT-0500 (Eastern Standard Time)',
    completed: true,
    adventurer_id: 2
})

quest2 = Quest.create({
    id: 2,
    quest_name: 'find my wallet',
    category_id: 1,
    details: 'I lost my wallet in the dungeon, can you find it?',
    creator_id: 1,
    start_time: 'Tue Feb 1 2023 12:00:00 GMT-0500 (Eastern Standard Time)',
    completed: true,
    adventurer_id: 3
})

quest3 = Quest.create({
    id: 3,
    quest_name: 'craft a bench',
    category_id: 2,
    details: 'I ordered a bench from the amazon, need help assembling',
    creator_id: 1,
    start_time: 'Tue Feb 1 2023 12:00:00 GMT-0500 (Eastern Standard Time)',
    completed: true,
    adventurer_id: 4
})
quest4 = Quest.create({
    id: 4,
    quest_name: 'Find the easter eggs in the forest',
    category_id: 1,
    details: 'i need help finding the easter eggs hidden in the forest',
    creator_id: 1,
    start_time: 'Tue Feb 1 2023 12:00:00 GMT-0500 (Eastern Standard Time)',
    completed: false,
    adventurer_id: 4
})
review1 = Review.create({
    body: 'Hercules is so strong!',
    rating: '5',
    adventurer_id: 2,
    user_id: 1,
    username: 'Guest'
})
review2 = Review.create({
    body: 'Goblin Slayer is super efficient, but never takes off armor.',
    rating: '4',
    adventurer_id: 3,
    user_id: 1,
    username: 'Guest'
})
review3 = Review.create({
    body: 'Isaac Newton is incredible!',
    rating: '5',
    adventurer_id: 4,
    user_id: 1,
    username: 'Guest'
})
review4 = Review.create({
    body: 'I just really didnt like Isaac. He insisted on calculating the falling speed and distance travelled of all the apples.',
    rating: '1',
    adventurer_id: 4,
    user_id: 1,
    username: 'Guest'
})