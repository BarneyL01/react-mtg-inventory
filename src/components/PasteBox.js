import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

function PasteBox(props) {
    const [pasteContents, setPasteContents] = useState("Hello, hello");

    const handleChange = (event) => {
        setPasteContents(event.target.value);
    };
    return (
        <div className="paste-box">
            <h2>Paste to import</h2>
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
            <h3>Import Requirements/Features</h3>
            <ul>
                <li>CSV (comma separated values)</li>
                <li>First row header</li>
                <li>Minimum items: Name, Quantity</li>
                <li>
                    Supports Scryfall data if: &#34;Scryfall ID&#34; included
                </li>
                <li>
                    Also supports: &#34;Edition code&#34;, &#34;Mana Value&#34;,
                    Card Text
                </li>
                <li>Custom support: &#34;Custom Image URL&#34;</li>
                <li>
                    Inventory support: &#34;Location&#34; (i.e. Binder, Deck)
                </li>
            </ul>
        </div>
    );
}

PasteBox.propTypes = {
    onClickFunction: PropTypes.func.isRequired,
};

export default PasteBox;
