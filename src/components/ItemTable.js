import React from "react";
import PropTypes from "prop-types";
import ItemRow from "./ItemRow";

function ItemTable(props) {
  if (props.inventory !== undefined) {
    return (
      <>
        <table className="inventory-table" data-cy="inventory-table">
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
                selectItemFunction={props.selectItemFunction}
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
  selectItemFunction: PropTypes.func.isRequired,
};

export default ItemTable;
