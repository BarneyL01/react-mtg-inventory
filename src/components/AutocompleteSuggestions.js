import React from "react";
import PropTypes from "prop-types";

const AutocompleteSuggestions = ({ onClick, suggestions }) => {
  if (suggestions.length === 0) {
    return <></>;
  }
  return (
    <ul className="suggestion-list">
      {suggestions.map((suggestion) => {
        return (
          <li
            // className={className}
            className="suggestion-item"
            key={suggestion}
            onClick={onClick}
          >
            {suggestion}
          </li>
        );
      })}
    </ul>
  );
};

AutocompleteSuggestions.propTypes = {
  onClick: PropTypes.func.isRequired,
  suggestions: PropTypes.array,
};

export default AutocompleteSuggestions;
