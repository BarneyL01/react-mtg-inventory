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
    const [selectedItem, setSelectedItem] = useState({});
    const parseCsvToInventory = (inputCsv) => {
        let inventory = Papa.parse(inputCsv, { header: true }).data;
        for (let index = 0; index < inventory.length; index++) {
            const element = inventory[index];
            element.id = index;
        }
        setInventory(inventory);
    };
    const logInventory = () => {
        console.log("%c inventory:", "color:plum", { mainInventory });
    };
    // let loadedId = "";
    const loadItem = async function (itemId) {
        setSelectedItem({});
        let selectedItem = {};

        if (mainInventory[itemId] !== undefined) {
            selectedItem.Name = mainInventory[itemId].Name;
            selectedItem.ManaValue = mainInventory[itemId]["Mana Value"] ?? "";
            selectedItem.Edition = mainInventory[itemId].Edition ?? "";
            selectedItem.ScyfallId = mainInventory[itemId]["Scryfall ID"] ?? "";
            let requestUrl = `https://api.scryfall.com/cards/${selectedItem.ScyfallId}?format=json`;
            try {
                let response = await axios.get(requestUrl);

                console.log("%c loadItem:", "color:lightgreen", {
                    d: response.data,
                });
                selectedItem.ImageUrl = response.data.image_uris.normal;
            } catch (error) {
                console.error({ error });
            }
            setSelectedItem(selectedItem);
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
                    <ItemTable
                        inventory={mainInventory}
                        loadItemFunction={loadItem}
                    />
                </div>
            </div>
            <div className="flex-right">
                <ItemDetails item={selectedItem} />
            </div>
        </div>
    );
}

export default App;
