class Category < ApplicationRecord
    validates :category_name, presence: true, uniqueness: true
    validates :ex_description, presence: true

    has_many :quest

end
