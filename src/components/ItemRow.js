import React from "react";
import PropTypes from 'prop-types';

function ItemRow(props) {
    if (props.item !== undefined && props.item.length > 1) {
        return (
            <li>
                <span>{props.item[0]}</span>
                <span>{props.item[1]}</span>
								<span><button>Select</button></span>
            </li>
        );
    }
    return <div>no data</div>;
}

ItemRow.propTypes = {
  item: PropTypes.arrayOf(PropTypes.string),
};

export default ItemRow;
