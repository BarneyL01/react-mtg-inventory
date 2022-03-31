import React from "react";
import PropTypes from "prop-types";

function ItemDetails(props) {
    console.log("%c id:" + props.loadedImageUrl, "color:blue");
    if (props.loadedImageUrl !== undefined && props.loadedImageUrl.length > 0) {
        return <img className="card-image" src={props.loadedImageUrl}></img>;
    }
    return <div>loading...</div>;
}

ItemDetails.propTypes = {
    loadedImageUrl: PropTypes.string,
};

export default ItemDetails;
