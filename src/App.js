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
            element.Quantity = parseInt(element.Quantity);
        }
        setInventory(inventory);
    };
    const logInventory = () => {
        console.log("%c inventory:", "color:plum", { mainInventory });
    };
    // let loadedId = "";
    const addQuantity = (id) => {
        mainInventory[id]["Quantity"] += 1;
        loadItem(id);
    };
    const minusQuantity = (id) => {
        // don't allow less than 1
        mainInventory[id]["Quantity"] = Math.max(
            1,
            mainInventory[id]["Quantity"] - 1
        );
        loadItem(id);
    };
    const loadItem = async function (itemId) {
        setSelectedItem({});
        let selectedItem = {};

        if (mainInventory[itemId] !== undefined) {
            selectedItem.Id = itemId;
            selectedItem.Name = mainInventory[itemId]["Name"];
            selectedItem.ManaValue = mainInventory[itemId]["Mana Value"] ?? "";
            selectedItem.Edition = mainInventory[itemId]["Edition"] ?? "";
            selectedItem.ScryfallId =
                mainInventory[itemId]["Scryfall ID"] ?? "";
            selectedItem.ImageUrl = mainInventory[itemId]["Image URL"] ?? "";
            selectedItem.Location = mainInventory[itemId]["Location"] ?? "";
            selectedItem.Quantity = mainInventory[itemId]["Quantity"] ?? "";
            selectedItem.AddQuantityFunction = addQuantity;
            selectedItem.MinusQuantityFunction = minusQuantity;

            // Only Load the Image URL if its blank:
            if (
                selectedItem.ScryfallId.length > 0 &&
                (mainInventory[itemId]["Image URL"] === undefined ||
                    mainInventory[itemId]["Image URL"].length == 0)
            ) {
                try {
                    let requestUrl = `https://api.scryfall.com/cards/${selectedItem.ScryfallId}?format=json`;
                    let response = await axios.get(requestUrl);

                    console.log("%c loadItem:", "color:lightgreen", {
                        d: response.data,
                    });
                    selectedItem.ImageUrl = response.data.image_uris.normal;
                    mainInventory[itemId]["Image URL"] =
                        response.data.image_uris.normal;
                } catch (error) {
                    console.error({ error });
                }
            }
        }
        setSelectedItem(selectedItem);
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
