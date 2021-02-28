# Getting Started with Movie-Search-Buy

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Summary

When the page loads the user has a default 'Lord of the rings' search query on load.There is a search-bar, a dropdown for sorting and a cart section on the right.
When the user is querying a loading spinner appears till the content loads while fetching from the external API.

When the content appears the user can hover over each movie and he can read the title and give him the ability to add/remove an item from the cart.

After adding the movies he wants to the cart (in which he can remove items too) he can purchase them.

If everything goes well a green message appears,else a red one. In the meantime while processing the request the button gets disabled and a loading spinner appears.

On mobile or tablet, the search-bar and the main content goes 100% width, and the cart becomes a toggling button fixed to the right of the screen.

## Technical Summary

The project's state management was handled with React Hooks and the useReducer Hook.

In the beginning I considered using Redux and Redux Thunk but since the project was not large enough I decided to develop it with the similar useReducer Hook method.

The application is quite responsive on mobile devices.

External Modules Used:
   1) @material-ui/icons 
   2) node-sass

Loading Spinner credits: [loading.io](https://loading.io/css/)

## Technologies Used

React, React JSX, CSS, SCSS

## Installation Instructions

In the project directory, you can run:

### `npm i`
to install all the necessary dependencies to run this project.

## Execution Instructions

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.