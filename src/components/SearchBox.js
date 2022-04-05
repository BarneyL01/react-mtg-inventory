import React from "react";
import { debounce } from "../utils/utils";
import { scryfallAutocomplete } from "../utils/scryfallApis";
import AutocompleteSuggestions from "./AutocompleteSuggestions";
import { useState, useCallback } from "react";
import PropTypes from "prop-types";

const SearchBox = ({ selectCard }) => {
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debouncedAutocomplete = useCallback(
    debounce((newValue) => autocomplete(newValue)),
    []
  );
  const updateInput = (newValue) => {
    setUserInput(newValue);
    debouncedAutocomplete(newValue);
  };
  const autocomplete = async function (searchterm) {
    if (searchterm.length < 2) return;
    console.log("%c autocomplete:" + searchterm, "color:red");
    let result = await scryfallAutocomplete(searchterm);
    setSuggestions(result);
    // setSuggestions(["Hello", "one"]);
  };
  const selectSuggestion = (event) => {
    let selectedCardName = event.currentTarget.innerText;
    console.log("%c selectSuggestion:", "color:cyan", {
      select: selectedCardName,
    });
    setUserInput(selectedCardName);
    setSuggestions([]);
    selectCard(event.currentTarget.innerText);
  };
  return (
    <>
      <input
        className="search-input"
        placeholder="Search for a card to add"
        onChange={(input) => updateInput(input.target.value)}
        value={userInput}
      ></input>
      <AutocompleteSuggestions
        suggestions={suggestions}
        onClick={selectSuggestion}
      />
    </>
  );
};

SearchBox.propTypes = {
  selectCard: PropTypes.func.isRequired,
};

export default SearchBox;
