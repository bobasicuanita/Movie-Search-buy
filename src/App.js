import React, {useReducer} from 'react';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import useWindowResize from './hooks/useWindowResize';
import './App.scss';

import {handleSortAction, handleAddToCart, handleRemoveFromCart} from "./actions/actions";

import SearchBar from "./components/search-bar/search-bar.component";
import MovieResults from "./components/movie-results/movie-results.component";
import Cart from "./components/cart/cart.component";
import useGetMovies from "./hooks/useGetMovies";
import useBuyMovies from "./hooks/useBuyMovies";

const App = () => {

    const windowSize = useWindowResize();

    const initialState = {
        data: '',
        query: 'Lord of the Rings',
        searching: false,
        purchasing: false,
        cart: [],
        isBuyButtonclicked: false,
        purchaseMessage: '',
        status: '',
        isCartIconVisible: true,
        isCartWindowOpen: true
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_QUERY':
                return {...state, query: action.payload}
            case 'SEARCHING_STARTED':
                return {...state, searching: true}
            case 'SEARCHING_FINISHED':
                return {...state, searching: false}
            case 'PURCHASE_STARTED':
                return {...state, purchasing: true}
            case 'PURCHASE_FINISHED':
                return {...state, purchasing: false}
            case 'SEARCH_MOVIES':
                return {...state, data: action.payload.results};
            case 'SORT_MOVIES':
                return {...state, data: handleSortAction(state.data, action.payload)}
            case 'ADD_TO_CART':
                return {...state, cart: [...state.cart, handleAddToCart(state.data, action.payload)]};
            case 'REMOVE_FROM_CART':
                return {...state, cart: handleRemoveFromCart(state.cart, action.payload)};
            case 'BUY_MOVIES':
                return {...state, isBuyButtonclicked: true}
            case 'SUCCESSFUL_PURCHASE':
                return {
                    ...state,
                    purchaseMessage: 'Successful Order!',
                    isBuyButtonclicked: false,
                    status: 'success',
                    purchasing: false
                }
            case 'FAILURE_PURCHASE':
                return {
                    ...state,
                    purchaseMessage: 'There was an error with your purchase!',
                    isBuyButtonclicked: false,
                    status: 'fail',
                    purchasing: false
                }
            case 'TOGGLE_CART_ICON':
                return {
                    ...state,
                    isCartIconVisible: !state.isCartIconVisible,
                    isCartWindowOpen: !state.isCartWindowOpen
                };
            case 'CLOSE_CART_WINDOW':
                if (windowSize.width <= 1200) {
                    return {
                        ...state,
                        isCartWindowOpen: !state.isCartWindowOpen,
                        isCartIconVisible: !state.isCartIconVisible
                    }
                } else {
                    return state;
                }
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useGetMovies(state.query, dispatch);

    useBuyMovies(state.query, state.isBuyButtonclicked, state.cart, dispatch);

    return (
        <div className="app">
            <div className="main">
                <h2 className='heading-secondary'>{state.cart.length ? `You have selected ${state.cart.length} movies.` : 'You have not selected any movies.'}</h2>
                <SearchBar
                    data={state.data}
                    handleSearch={dispatch}
                    handleSort={dispatch}
                />
                <div className="catalog">
                    {state.searching ? (<div
                        className={state.searching ? "loading-spinner--catalog" : "loading-spinner--catalog not-visible"}></div>) : (
                        <MovieResults
                            data={state.data}
                            toggleCart={dispatch}
                            cart={state.cart}
                        />)}
                </div>
            </div>
            <Cart status={state.status}
                  cart={state.cart}
                  handleRemoveFromCart={dispatch}
                  handleBuy={dispatch}
                  handleCloseCart={dispatch}
                  isCartWindowOpen={state.isCartWindowOpen}
                  purchasing={state.purchasing}
                  purchaseMessage={state.purchaseMessage}
                  isCartIconVisible={state.isCartIconVisible}
                  windowSize={windowSize}
            />
            <ShoppingCartOutlinedIcon
                className="cart cart--icon"
                style={windowSize.width <= 1200 && state.isCartIconVisible ? {display: 'inline-block'} : {display: 'none'}}
                onClick={() => dispatch({type: "TOGGLE_CART_ICON"})}/>
        </div>
    );
}

export default App;
