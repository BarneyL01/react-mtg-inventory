import React from "react";
import PropTypes from "prop-types";

function ItemRow(props) {
    const lookupItem = () => {
        if (
            props.item !== undefined &&
            props.item["Scryfall ID"] !== undefined
        ) {
						props.loadItem(props.item["Scryfall ID"]);
        }
    };
    if (props.item !== undefined && props.item.Name !== undefined) {
        return (
            <li>
                <span>{props.item.Name}</span>
                <span>{props.item.Quantity}</span>
                <span>
                    <button onClick={lookupItem}>Select</button>
                </span>
            </li>
        );
    }
    return <div>no data</div>;
}

ItemRow.propTypes = {
    item: PropTypes.object,
		loadItem: PropTypes.func,
};

export default ItemRow;
