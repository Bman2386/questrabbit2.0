export const getCategories = () => {
    return (
        $.ajax({
        url: '/api/categories',
        method: 'GET'
    }))
}

export const getCategory = categoryId => (
    $.ajax({
        url: `/api/categories/${categoryId}`,
        method: 'GET'
    })
)