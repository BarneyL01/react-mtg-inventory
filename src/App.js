import "./App.css";
import React from "react";
import { useState } from "react";
import PasteBox from "./components/PasteBox";
import ItemRow from "./components/ItemRow";
import Papa from "papaparse";
import ItemDetails from "./components/itemDetails";

function App() {
    const [mainInventory, setInventory] = useState([]);
    const [loadedId, setLoadedId] = useState("");
    const parseCsvToInventory = (inputCsv) => {
        setInventory(Papa.parse(inputCsv, { header: true }).data);
    };
    const logInventory = () => {
        console.log("%c inventory:", "color:plum", { mainInventory });
    };
    // let loadedId = "";
    const loadItem = (itemId) => {
        console.log("%c loadItem:"+ itemId, "color:red");
        setLoadedId(itemId)
    }
    return (
        <div className="app flex-container">
            <div className="flex-left">
                <header className="app-header">
                    <PasteBox onClickFunction={parseCsvToInventory} />
                </header>
                <div className="inventory-section">
                    <button onClick={logInventory}>Log Inventory</button>
                    <ul>
                        {mainInventory.map((item) => (
                            <ItemRow key={item.Name} item={item} loadItem={loadItem} />
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex-right">
                <ItemDetails scryfallId={loadedId} />

            </div>
        </div>
    );
}

export default App;
