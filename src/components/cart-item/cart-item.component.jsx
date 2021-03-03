import React from 'react';

const CartItem = ({ props: {poster_path, title, release_date}, id, handleRemoveFromCart}) => {
    return (
        <li key={id} className="cart__list-item">
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={poster_path}
                 className="cart__list-item-image"/>
            <div className="cart__list-item-text">
                <h2>{title}</h2>
                <span>{release_date}</span>
            </div>
            <button className="cart__list-item-btn" data-id={id} onClick={e => handleRemoveFromCart({
                type: 'REMOVE_FROM_CART',
                payload: e.target.dataset.id
            })}>&times;</button>
        </li>
    )
}

export default CartItem;