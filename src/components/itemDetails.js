import React from "react";
import PropTypes from "prop-types";

function ItemDetails(props) {
    console.log("%c id:" + props.scryfallId, "color:blue");
    if (props.scryfallId !== undefined && props.scryfallId.length > 0) {
        let imgSrc =
            "https://c1.scryfall.com/file/scryfall-cards/normal/front/b/c/" +
            props.scryfallId +
            ".jpg";
        return <img className="card-image" src={imgSrc}></img>;
    }
    return <div>no data</div>;
}

ItemDetails.propTypes = {
    scryfallId: PropTypes.string,
};

export default ItemDetails;
