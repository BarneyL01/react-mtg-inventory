import React from "react";
import PropTypes from "prop-types";
import ManaValueDisplay from "./ManaValueDisplay";

function ItemRow(props) {
  const lookupItem = () => {
    if (props.item !== undefined && props.item.id !== undefined) {
      props.loadItem(props.item.id);
    }
  };
  if (props.item !== undefined && props.item.Name !== undefined) {
    return (
      <tr onClick={lookupItem}>
        <td>{props.item.Name}</td>
        <td></td>
        <td>
          <ManaValueDisplay manaValue={props.item["Mana Value"]} />
        </td>
        <td>{props.item["Edition code"]}</td>
        <td>{props.item.Quantity}</td>
        <td>{props.item.Location}</td>
      </tr>
    );
  }
  return <div>no data</div>;
}

ItemRow.propTypes = {
  item: PropTypes.object,
  loadItem: PropTypes.func,
};

export default ItemRow;
