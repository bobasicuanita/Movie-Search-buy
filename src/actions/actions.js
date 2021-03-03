// Sort movies based on <select> value
export const handleSortAction = (data, payload) => {
    if (payload === 'Highest Vote') {
        const sortDesc = data.sort((a, b) => b.vote_average - a.vote_average);
        return sortDesc;
    } else if (payload === 'Lowest Vote') {
        const sortAsc = data.sort((a, b) => a.vote_average - b.vote_average);
        return sortAsc;
    } else {
        const defaultSort = data.sort((a, b) => {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });
        return defaultSort;
    }
}

// Find the movie to add by id
export const handleAddToCart = (data, payload) => data.find(el => el.id === parseInt(payload));

export const handleRemoveFromCart = (cart, payload) => {
    // Find the movie to delete in cart
    const movieToRemove = cart.find(el => el.id === parseInt(payload))

    // Index of the movie to be removed
    const movieToRemoveIndex = cart.indexOf(movieToRemove);

    // remove it from cart
    if (movieToRemoveIndex > -1) cart.splice(movieToRemoveIndex, 1);

    return cart;
}

