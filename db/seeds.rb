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
    username: 'Hercules',
    password: 'hunter12',
    adventurer: true,
    avg_rating: 0,
    total_ratings: 0,
    elite: false,
    pitch: 'I am the strongest there is!',
    family_crest: 'Zues',
    realm: 'Divinity',
    star_sign: 'Ox'
})

goblin_slayer = User.create({
    username: 'Goblin Slayer',
    password: 'hunter12',
    adventurer: true,
    avg_rating: 0,
    total_ratings: 0,
    elite: true,
    pitch: "I'll slay anything, especially goblins",
    family_crest: 'Sword and Shield',
    realm: 'Darkness',
    star_sign: 'Leo'
})

isaac_newton = User.create({
    username: 'Isaac Newton',
    password: 'hunter12',
    adventurer: true,
    avg_rating: 0,
    total_ratings: 0,
    elite: false,
    pitch: 'I can create math for all uses and applications',
    family_crest: 'Owl',
    realm: 'Earth',
    star_sign: 'Capricorn'
})


