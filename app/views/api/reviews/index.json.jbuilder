# json.array! @reviews do |review|
#     json.partial! 'api/reviews/review', review: review 
# end
@reviews.each do |review|
    json.set! review.id do
    json.extract! review, :id, :rating, :body, :adventurer_id, :user_id, :username
    end
end
