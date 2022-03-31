import React from "react";
import { useState } from "react";
import PropTypes from 'prop-types';

function PasteBox(props) {
    const [pasteContents, setPasteContents] = useState("Hello, hello");

    const handleChange = (event) => {
        setPasteContents(event.target.value);
    };
    return (
        <div>
            <h2>Paste here</h2>
            <textarea
                rows="10"
                cols="100"
                value={pasteContents}
                onChange={handleChange}
            ></textarea>
            <br />
            <button onClick={() => props.onClickFunction(pasteContents)}>
                Update
            </button>
        </div>
    );
}

PasteBox.propTypes = {
  onClickFunction: PropTypes.func.isRequired,
};

export default PasteBox;
