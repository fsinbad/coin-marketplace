import React from "react";
import SearchBar from "./search-bar";
import Button from "./button";
import { Link, Outlet } from "react-router-dom";

function SearchBox({ setSearch, setFavorites }) {
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="searchBox">
      <div className="buttonGroup">
        <Link to="/coins">Cryptocurrencies</Link>
        <Link to="/Exchanges">Exchanges</Link>
        <Link to="/Favorites">Favorites</Link>
      </div>
      {/*<Button label="USD"></Button>*/}
      <SearchBar handleChange={handleChange}></SearchBar>
      {/*<Outlet />*/}
    </div>
  );
}

export default SearchBox;
