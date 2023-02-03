class Review < ApplicationRecord
    validates :body, :rating, :adventurer_id, :user_id, presence: true
    
    belongs_to :user
end
