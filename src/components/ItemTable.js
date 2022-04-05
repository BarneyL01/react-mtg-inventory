import React from "react";
import PropTypes from "prop-types";
import ItemRow from "./ItemRow";

function ItemTable(props) {
  if (props.inventory !== undefined) {
    return (
      <>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Color ID</th>
              <th>Mana</th>
              <th>Ed</th>
              <th>Qty</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {props.inventory.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                loadItem={props.loadItemFunction}
              />
            ))}
          </tbody>
        </table>
      </>
    );
  }
  return <></>;
}

ItemTable.propTypes = {
  inventory: PropTypes.array.isRequired,
  loadItemFunction: PropTypes.func.isRequired,
};

export default ItemTable;
