import React from "react";
import PropTypes from "prop-types";
import ManaValueDisplay from "./ManaValueDisplay";

function ItemDetails(props) {
  const addQuantity = () => {
    props.item.AddQuantityFunction(props.item.Id);
  };
  const minusQuantity = () => {
    if (props.item.Quantity > 1) {
      props.item.MinusQuantityFunction(props.item.Id);
    }
  };

  if (
    props.item !== undefined &&
    props.item.ImageUrl !== undefined &&
    props.item.ImageUrl.length > 0
  ) {
    return (
      <div className="item-details">
        <img className="card-image" src={props.item.ImageUrl}></img>
        <div className="item-details-content">
          <header className="item-details-header">{props.item.Name}</header>
          <div>
            Mana Cost:
            <ManaValueDisplay manaValue={props.item.ManaValue} />
          </div>
          <div>Edition: {props.item.Edition}</div>
          <div>Location: {props.item.Location}</div>
          <div>Quantity: {props.item.Quantity}</div>
          <div>
            <button onClick={addQuantity}>add</button>
            <button onClick={minusQuantity}>minus</button>
          </div>
        </div>
      </div>
    );
  }
  return <div>loading...</div>;
}

ItemDetails.propTypes = {
  item: PropTypes.shape({
    Id: PropTypes.number,
    Name: PropTypes.string,
    Edition: PropTypes.string,
    ManaValue: PropTypes.string,
    ImageUrl: PropTypes.string,
    Location: PropTypes.string,
    Quantity: PropTypes.number,
    AddQuantityFunction: PropTypes.func,
    MinusQuantityFunction: PropTypes.func,
  }),
};

export default ItemDetails;
