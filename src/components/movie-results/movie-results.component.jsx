import React from 'react';

import Card from "../movie-card/movie-card.component";

/*
* Check if data exists. (data && data.length)
*
* For each item check if it contains an image path (item.poster_path)
*
* Check if it is already in cart (cart.indexOf(item))
*
* Display either a Card with "Remove From Cart" or "Add to Cart" button
*
* If there are no data display text
*
* */

const MovieResults = ({data, toggleCart, cart }) => {
    return data && data.length ? data.map((item) => item.poster_path && (cart.indexOf(item) === -1 ? (
        <Card
            key={item.id}
            title={item.title}
            id={item.id}
            image={item.poster_path}
            btnText="Add To Cart"
            toggleCart={toggleCart}
            dispatchType='ADD_TO_CART'
        />) : (
        <Card
            key={item.id}
            title={item.title}
            id={item.id}
            image={item.poster_path}
            btnText="Remove From Cart"
            toggleCart={toggleCart}
            dispatchType='REMOVE_FROM_CART'
        />))) : (
        <h1 className='heading-primary'>No movies where found, please try again.</h1>)
};

export default MovieResults;