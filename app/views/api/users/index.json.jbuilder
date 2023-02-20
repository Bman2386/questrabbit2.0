@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :username, :avg_rating, :elite, :total_ratings, :pitch, :family_crest, :realm, :star_sign
  end
end