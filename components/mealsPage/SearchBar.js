import React from 'react';
import classes from './SearchBar.module.scss';

function SearchBar({ searchText, setSearchText }) {
  return (
    <input
      className={classes.input}
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
}

export default SearchBar;
