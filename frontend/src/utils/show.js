export const categoryShow = (categoryId) => {
    const categories = ['Fetch', 'Craft', 'Escort', 'Slay'];
    return categories[categoryId - 1];
};

export const adventurerShow = (adventurerId) => {
    if (typeof adventurerId === 'string') adventurerId = parseInt(adventurerId);
    const adventurerNames = ['Hercules', 'Goblin Slayer', 'Isaac Newton'];
    return adventurerNames[adventurerId - 2];
};