import "./App.css";
import React from "react";
import { useState } from "react";
import PasteBox from "./components/PasteBox";
import ItemTable from "./components/ItemTable";
import Papa from "papaparse";
import ItemDetails from "./components/itemDetails";
import axios from "axios";

function App() {
    const [mainInventory, setInventory] = useState([]);
    // const [loadedId, setLoadedId] = useState("");
    const [loadedImageUrl, setLoadedImageUrl] = useState("");
    const parseCsvToInventory = (inputCsv) => {
        setInventory(Papa.parse(inputCsv, { header: true }).data);
    };
    const logInventory = () => {
        console.log("%c inventory:", "color:plum", { mainInventory });
    };
    // let loadedId = "";
    const loadItem = async function (itemId) {
        setLoadedImageUrl("");
        // console.log("%c loadItem:" + itemId, "color:red");
        let requestUrl = `https://api.scryfall.com/cards/${itemId}?format=json`;
        try {
            let response = await axios.get(requestUrl);

            console.log("%c loadItem:", "color:lightgreen", {
                d: response.data,
            });
            setLoadedImageUrl(response.data.image_uris.normal);
        } catch (error) {
            console.error({ error });
        }
    };
    return (
        <div className="app flex-container">
            <div className="flex-left">
                <header className="app-header">MTG Inventory</header>
                <div>
                    <PasteBox onClickFunction={parseCsvToInventory} />
                </div>
                <div className="inventory-section">
                    <button onClick={logInventory}>Log Inventory</button>
                    <ItemTable inventory={mainInventory} loadItemFunction={loadItem}/>
                </div>
            </div>
            <div className="flex-right">
                <ItemDetails loadedImageUrl={loadedImageUrl} />
            </div>
        </div>
    );
}

export default App;
