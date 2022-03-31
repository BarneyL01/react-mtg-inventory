import "./App.css";
import React from "react";
import { useState } from "react";
import PasteBox from "./components/PasteBox";
import Papa from "papaparse";

function App() {
    const [mainInventory, setInventory] = useState([]);
    const parseCsvToInventory = (inputCsv) => {
        setInventory(Papa.parse(inputCsv));
    };
    const logInventory = () => {
        console.log("%c inventory:", "color:plum", { mainInventory });
    };
    return (
        <div className="App">
            <header className="App-header">
                <PasteBox onClickFunction={parseCsvToInventory} />
            </header>
            <button onClick={logInventory}>Log Inventory</button>
        </div>
    );
}

export default App;
