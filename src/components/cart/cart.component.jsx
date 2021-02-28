import React from 'react';
import CartItem from "../cart-item/cart-item.component";

const Cart = ({
                  cart,
                  handleRemoveFromCart,
                  handleBuy,
                  purchasing,
                  purchaseMessage,
                  status,
                  isCartIconVisible,
                  windowSize,
                  handleCloseCart,
                  isCartWindowOpen
              }) => {
    return (
        <div className="cart"
             style={isCartIconVisible && windowSize.width <= 1200 ? {display: 'none'} : {display: 'inline-block'}}>
            <h1 onClick={() => handleCloseCart({type: 'CLOSE_CART_WINDOW'})}>{!isCartWindowOpen && windowSize.width <= 1200 ? 'Close Cart' : 'Cart'}</h1>
            <ul className="cart__list">
                {cart && cart.length ? cart.map(({id, ...props}) => (
                        <CartItem key={id} props={props} id={id} handleRemoveFromCart={handleRemoveFromCart}/>)) :
                    <h3 className="cart__empty-list"> Your Cart is empty.</h3>}
            </ul>
            {cart && cart.length ? <button className={purchasing ? "btn btn__disabled" : "btn"} disabled={purchasing}
                                           onClick={() => handleBuy({type: 'BUY_MOVIES'})}>Purchase</button> : null}
            <div className="loading-spinner--cart"
                 style={purchasing ? {display: 'inline-block'} : {display: 'none'}}></div>
            <h3 className={status === 'success' ? "heading-tertiary heading-tertiary--success" : "heading-tertiary heading-tertiary--fail"}>{purchaseMessage}</h3>
        </div>
    )
}

export default Cart;