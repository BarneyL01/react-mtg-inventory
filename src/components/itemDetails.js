import React from "react";
import PropTypes from "prop-types";
import ManaValueDisplay from "./ManaValueDisplay";

function ItemDetails(props) {
    if (
        props.item !== undefined &&
        props.item.ImageUrl !== undefined &&
        props.item.ImageUrl.length > 0
    ) {
        return (
            <div>
                <img className="card-image" src={props.item.ImageUrl}></img>
                <h2>{props.item.Name}</h2>
                <div>
                    Mana Cost:
                    <ManaValueDisplay manaValue={props.item.ManaValue} />
                </div>
                <div>Edition: {props.item.Edition}</div>
            </div>
        );
    }
    return <div>loading...</div>;
}

ItemDetails.propTypes = {
    item: PropTypes.shape({
        Name: PropTypes.string,
        Edition: PropTypes.string,
        ManaValue: PropTypes.string,
        ImageUrl: PropTypes.string,
    }),
};

export default ItemDetails;
