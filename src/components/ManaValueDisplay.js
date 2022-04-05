import React from "react";
import PropTypes from "prop-types";
import "../../node_modules/mana-font/css/mana.min.css";
import { iconMap } from "../utils/IconMap";

function ManaValueDisplay(props) {
  let processString = props.manaValue;
  let count = 0;
  let display = [];
  // Split to inner symbols:
  if (processString[0] == "{") processString = processString.substring(1);
  if (processString[processString.length - 1] === "}")
    processString = processString.substring(0, processString.length - 1);
  let manaSymbols = processString.split(/\}\{/);
  React.createElement("i", { key: count, className: "ms ms-1" }, null);
  manaSymbols.forEach((element) => {
    const icon = iconMap[element] ?? "";
    const cn = "ms " + icon;
    display.push(
      React.createElement("i", { key: display.length, className: cn }, null)
    );
  });

  return display;
}
ManaValueDisplay.propTypes = {
  manaValue: PropTypes.string,
};

export default ManaValueDisplay;
