import "./App.css";
import React from "react";
import { useState } from "react";
import PasteBox from "./components/PasteBox";
import ItemRow from "./components/ItemRow";
import Papa from "papaparse";

function App() {
    const [mainInventory, setInventory] = useState([]);
    const parseCsvToInventory = (inputCsv) => {
        setInventory(Papa.parse(inputCsv).data);
    };
    // const logInventory = () => {
    //     console.log("%c inventory:", "color:plum", { mainInventory });
    // };
    return (
        <div className="app flex-container">
            <div className="flex-left">
                <header className="app-header">
                    <PasteBox onClickFunction={parseCsvToInventory} />
                </header>
                <div className="inventory-section">
                    {/* <button onClick={logInventory}>Log Inventory</button> */}
                    <ul>
                        {mainInventory.map((item) => (
                            <ItemRow key={item[0]} item={item} />
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex-right"></div>
        </div>
    );
}

export default App;
