import React from "react";
import { useState } from "react";
import Papa from "papaparse";

function PasteBox() {
    const [pasteContents, setTextarea] = useState(
        "Hello, hello"
    );

    const handleChange = (event) => {
        setTextarea(event.target.value);
    };
    // let parsedDetails = [];
    const parseContents = () => {
				console.log("%c pasteContents:" + pasteContents, "color:pink");
				let parsedDetails = Papa.parse(pasteContents);
        console.log("%c parsedDetails", "color:plum", { parsedDetails });
				
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
            <button onClick={parseContents}>Update</button>
        </div>
    );
}

export default PasteBox;
