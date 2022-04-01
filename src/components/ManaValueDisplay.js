import React from "react";
import PropTypes from "prop-types";
import "../../node_modules/mana-font/css/mana.min.css";

function ManaValueDisplay(props) {
    console.log("MVD:" + props.manaValue);
    let processString = props.manaValue;
    let count = 0;
    let display = [];
    if (processString.includes("{1}")) {
        processString = processString.replace("{1}", "");
        // display = display.push(<i key={count} className="ms ms-1"></i>);
        display.push(
            React.createElement("i", { key: count, className: "ms ms-1" }, null)
        );
        count++;
    }
    if (processString.includes("{W}")) {
        processString = processString.replace("{W}", "");
        // display = display.push(<i key={count} className="ms ms-w"></i>);
        display.push(
            React.createElement("i", { key: count, className: "ms ms-w" }, null)
        );
        count++;
    }
    console.log("%c display", "color:red", { display });

    return display;
}
ManaValueDisplay.propTypes = {
    manaValue: PropTypes.string,
};

export default ManaValueDisplay;
