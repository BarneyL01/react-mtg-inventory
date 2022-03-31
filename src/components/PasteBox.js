import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const exampleInventory = `Name,Quantity,Color,Card Text,Scryfall ID,Edition,Edition code,Collector's number,Mana Value,CMC
"Renounce the Guilds","1","White","""Each player sacrifices a multicolored permanent.""","bc9acc14-24e0-4c03-a09a-2afee351f2cc","Dragon's Maze","DGM","5","{1}{W}","2"
"Grab the Reins","1","Red","""Choose one —
• Until end of turn, you gain control of target creature and it gains haste.
• Sacrifice a creature. Grab the Reins deals damage equal to that creature's power to any target.
Entwine {2}{R} (Choose both if you pay the entwine cost.)""","d74d181c-6783-4472-a3b9-2f6780e2b89b","Commander 2016","C16","126","{3}{R}","4"`;

function PasteBox(props) {
    const [pasteContents, setPasteContents] = useState(exampleInventory);

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
