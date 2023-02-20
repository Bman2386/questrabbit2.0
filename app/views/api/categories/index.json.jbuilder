@categories.each do |category|
  json.set! category.id do
    json.extract! category, :id, :category_name, :ex_description
  end
end