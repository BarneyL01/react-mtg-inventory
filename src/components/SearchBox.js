import React from "react";
import { debounce } from "../utils/utils";
// import { useState } from "react";
// import PropTypes from "prop-types";

const SearchBox = () => {
    const autocomplete = () => {
        console.log("%c autocomplete", "color:red");
    };
    return (
        <input
            className="search-input"
            placeholder="Search for a card to add"
            onChange={debounce(() => autocomplete())}
        ></input>
    );
};

export default SearchBox;
