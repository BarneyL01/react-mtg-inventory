import React from "react";
import PropTypes from "prop-types";
import ItemRow from "./ItemRow";

function ItemTable(props) {
    if (props.inventory !== undefined) {
        return (
            <ul>
                {props.inventory.map((item) => (
                    <ItemRow key={item.id} item={item} loadItem={props.loadItemFunction} />
                ))}
            </ul>
        );
    }
    return <></>;
}

ItemTable.propTypes = {
    inventory: PropTypes.array.isRequired,
    loadItemFunction: PropTypes.func.isRequired,
};

export default ItemTable;
