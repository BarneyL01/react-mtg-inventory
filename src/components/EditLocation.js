import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

function EditLocation({ mainInventory, currentLocation }) {
  const [location, setLocation] = useState(currentLocation);
  const listOfExistingLocations = mainInventory
    .map((item) => item.Location)
    .filter((value, index, self) => self.indexOf(value) === index);
  // console.log("%c list:", "color:orange", { listOfExistingLocations });

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        name="location"
        list="locationList"
        value={location}
        onChange={handleChange}
      />
      <datalist id="locationList">
        {listOfExistingLocations.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </datalist>
    </>
  );
}

EditLocation.propTypes = {
  mainInventory: PropTypes.array.isRequired,
  currentLocation: PropTypes.string,
};

export default EditLocation;
