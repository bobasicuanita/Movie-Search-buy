import React from 'react';

const SearchBar = ({handleSearch, handleSort}) => {
    return (
        <header className="header">
            <input
                type="text"
                className="header__search-input"
                placeholder="Search your movie..."
                onChange={e => handleSearch({type: 'SET_TEMPORARY_QUERY', payload: e.target.value})}
            />
            <select
                name="sort"
                id="sort"
                className="header__sort-dropdown"
                onChange={e => handleSort({type: 'SORT_MOVIES', payload: e.target.value})}>
                <option value="Default">Default</option>
                <option value="Highest Vote">Highest Vote</option>
                <option value="Lowest Vote">Lowest Vote</option>
            </select>
        </header>
    )
}

export default SearchBar;