import React from "react";
import PropTypes from "prop-types";

const AutocompleteSuggestions = ({ onClick, suggestions }) => {
    if (suggestions.length === 0) {
        return <></>;
    }
    return (
        <ul>
            {suggestions.map((suggestion) => {
                // console.log("%c index:" + index, "color:grey");
                return (
                    <li
                        // className={className}
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
