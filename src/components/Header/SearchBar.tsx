import React from "react";
import "./SearchBar.scss";

const SearchBar = () => (
  <input
    className="search-bar"
    type="text"
    placeholder="Search recipes or categories..."
  />
);

export default SearchBar;
