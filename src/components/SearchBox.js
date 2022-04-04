import React from "react";
import { debounce } from "../utils/utils";
import { scryfallAutocomplete } from "../utils/scryfallApis";
// import { useState } from "react";
// import PropTypes from "prop-types";

const SearchBox = () => {
    const autocomplete = (event) => {
        console.log("%c autocomplete:" + event.target.value, "color:red");
        scryfallAutocomplete(event.target.value);
    };
    return (
        <input
            className="search-input"
            placeholder="Search for a card to add"
            onChange={debounce(autocomplete)}
        ></input>
    );
};

export default SearchBox;
