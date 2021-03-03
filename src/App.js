import React, {useReducer, useMemo, createContext} from 'react';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import useGetMovies from "./hooks/useGetMovies";
import useBuyMovies from "./hooks/useBuyMovies";
import useWindowResize from './hooks/useWindowResize';
import useCheckConnection from "./hooks/useCheckConnection";
import useTemporaryQuery from "./hooks/useTemporaryQuery";
import useTemporaryPage from './hooks/useTemporaryPage';

import './App.scss';

import {handleSortAction, handleAddToCart, handleRemoveFromCart} from "./actions/actions";

import SearchBar from "./components/search-bar/search-bar.component";
import MovieResults from "./components/movie-results/movie-results.component";
import Cart from "./components/cart/cart.component";
import Pagination from './components/pagination/pagination.component'

const App = () => {

    // Check Viewport size and return its width
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
        isCartWindowOpen: true,
        isOnline: true,
        timedQuery: '',
        timedPage: '',
        currentPage: 1,
        pages: 1,
        pageError: '',
        nextDisabled: false,
        previousDisabled: true
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_TEMPORARY_QUERY':
                return {...state, timedQuery: action.payload}
            case 'SET_QUERY':
                return {...state, query: action.payload, pageError: ''}
            case 'SEARCHING_STARTED':
                return {...state, searching: true}
            case 'SEARCHING_FINISHED':
                return {...state, searching: false}
            case 'PURCHASE_STARTED':
                return {...state, purchasing: true}
            case 'PURCHASE_FINISHED':
                return {...state, purchasing: false}
            case 'SEARCH_MOVIES':
                return {...state, data: action.payload.results, pages: action.payload.total_pages};
            case 'SORT_MOVIES':
                return {...state, data: handleSortAction(state.data, action.payload)}
            case 'ADD_TO_CART':
                return {
                    ...state,
                    cart: [...state.cart, handleAddToCart(state.data, action.payload)],
                    purchaseMessage: ''
                };
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
                    purchasing: false,
                    cart: []
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
            case 'USER_IS_ONLINE':
                return {...state, isOnline: true}
            case 'USER_IS_OFFLINE':
                return {...state, isOnline: false}
            case 'SET_TEMPORARY_PAGE':
                return {...state, timedPage: action.payload, pageError: ''}
            case 'SET_PAGE':
                // Pagination Input Validation
                if (action.payload < 1 || action.payload > state.pages) {
                    return {...state, pageError: `You need to enter a value between 1 and ${state.pages}`}
                } else if (action.payload === 1) {
                    return {...state, pageError: '', currentPage: action.payload, previousDisabled: true}
                } else if (action.payload === state.pages) {
                    return {...state, pageError: '', currentPage: action.payload, nextDisabled: true}
                } else {
                    return {...state, pageError: '', currentPage: action.payload }
                }
            case 'GO_TO_PREVIOUS_PAGE':
                // Handle Previous Button Click and disable button
                if (state.currentPage === 1) {
                    return {...state, previousDisabled: true, nextDisabled: false}
                } else {
                    return {...state, currentPage: parseInt(state.currentPage) - 1, nextDisabled: false};
                }
            case 'GO_TO_NEXT_PAGE':
                // Handle Next Button Click and disable button
                if (parseInt(state.currentPage) === state.pages) {
                    return {...state, nextDisabled: true, previousDisabled: false}
                } else {
                    return {...state, currentPage: parseInt(state.currentPage) + 1, previousDisabled: false};
                }
            default:
                return state;
        }
    }

    // Initialize State, Reducer and Actions
    const [state, dispatch] = useReducer(reducer, initialState);

    // Fetch Movies Hook
    useGetMovies(state.query, state.currentPage, dispatch);

    // Purchase Moview listed in the cart Hook
    useBuyMovies(state.query, state.isBuyButtonclicked, state.cart, dispatch);

    // Chck if user is online/offline Hook
    useCheckConnection(dispatch);

    // Prevent Multiple Requests , delay hook
    useTemporaryQuery(state.timedQuery, dispatch);
    useTemporaryPage(state.timedPage, dispatch);

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
                    {state.searching && state.isOnline ? (<div className={state.searching ? "loading-spinner--catalog" : "loading-spinner--catalog not-visible"}></div>) : !state.isOnline ? (
                        <h1 class="catalog__error">You seem to have lost your connection. Please find it.</h1>) : (
                        <MovieResults
                            data={state.data}
                            toggleCart={dispatch}
                            cart={state.cart}
                        />)}
                </div>
                <Pagination pages={state.pages} currentPage={state.currentPage} handlePageChange={dispatch} nextDisabled={state.nextDisabled} previousDisabled={state.previousDisabled}
                            pageError={state.pageError} handleNextPage={dispatch} handlePreviousPage={dispatch}/>
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
