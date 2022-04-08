import React from "react";
import PropTypes from "prop-types";
import ManaValueDisplay from "./ManaValueDisplay";
import EditLocation from "./EditLocation";

function ItemDetails(props) {
  const addQuantity = () => {
    console.log("addQuantity");
    props.AddQuantityFunction();
  };
  const minusQuantity = () => {
    if (props.item.Quantity > 1) {
      props.MinusQuantityFunction();
    }
  };

  if (
    props.item !== undefined &&
    props.item["Image URL"] !== undefined &&
    props.item["Image URL"].length > 0
  ) {
    return (
      <div className="item-details">
        <img className="card-image" src={props.item["Image URL"]}></img>
        <div className="item-details-content">
          <header className="item-details-header" data-cy="item-details-name">
            {props.item.Name}
          </header>
          <div>
            <span>Mana Cost: </span>
            <ManaValueDisplay manaValue={props.item["Mana Value"]} />
          </div>
          <div>Edition: {props.item.Edition}</div>
          <div>
            Location:
            <EditLocation
              mainInventory={props.mainInventory}
              currentLocation={props.item.Location}
            />
          </div>
          {/* <div>Location: {props.item.Location}</div> */}
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
    id: PropTypes.number,
    Name: PropTypes.string,
    Edition: PropTypes.string,
    "Mana Value": PropTypes.string,
    "Image URL": PropTypes.string,
    Location: PropTypes.string,
    Quantity: PropTypes.number,
  }),
  AddQuantityFunction: PropTypes.func,
  MinusQuantityFunction: PropTypes.func,
  mainInventory: PropTypes.array,
};

export default ItemDetails;
