export const categoryShow = (categoryId) => {
    const categories = ['Fetch', 'Craft', 'Escort', 'Slay'];
    return categories[categoryId - 1];
};

export const adventurerShow = (adventurerId) => {
    if (typeof adventurerId === 'string') adventurerId = parseInt(adventurerId);
    const adventurerNames = ['Hercules', 'Goblin Slayer', 'Isaac Newton'];
    return adventurerNames[adventurerId - 2];
};

export const dateShow = (date) => {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Firday",
        "Saturday"
    ]
    const months = [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const fullDate = new Date(date);
    const weekDay = days[fullDate.getDay()];
    const hour = () => {
        const hours = fullDate.getHours();
        if (hours > 12) {
            return (hours - 12)
        } else {
            return hours
        }
    }
    const min = () => {
        const questMinutes = fullDate.getMinutes();
        if (questMinutes === 0) {
            return '00';
        } else {
            return questMinutes;
        };
    };
    const month = months[fullDate.getMonth()];
    const monthDay = fullDate.getDate();
    const year = fullDate.getFullYear();
    const amPm = () => {
        if (fullDate.getHours() > 11) {
            return 'pm';
        } else {
            return 'am';
        };
    };
    return `${weekDay} ${month} ${monthDay} ${year} ${hour()}:${min()}${amPm()}`;
};
