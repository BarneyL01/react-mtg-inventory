import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import PasteBox from "./components/PasteBox";
import ExportBox from "./components/ExportBox";
import ItemTable from "./components/ItemTable";
import AddCard from "./components/AddCard";
import Papa from "papaparse";
import ItemDetails from "./components/itemDetails";
import axios from "axios";

function App() {
  const [mainInventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [exportedInventory, setExportedInventory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Stops scrolling if modal is open:
    isOpen && (document.body.style.overflow = "hidden");
    !isOpen && (document.body.style.overflow = "unset");
  }, [isOpen]);

  const parseCsvToInventory = (inputCsv) => {
    let inventory = Papa.parse(inputCsv, {
      header: true,
      skipEmptyLines: true,
    }).data;
    for (let index = 0; index < inventory.length; index++) {
      const element = inventory[index];
      element.id = index;
      element.Quantity = parseInt(element.Quantity);
    }
    setInventory(inventory);
  };
  const exportCsv = (format) => {
    let exportConfig = {};
    if (format === "moxfield") {
      exportConfig = {
        columns: ["Quantity", "Name"],
        delimiter: " ",
        header: false,
        escapeChar: "",
        quoteChar: "",
      };
    }
    let inventory = Papa.unparse(mainInventory, exportConfig);
    console.log("%c inventory", "color:hotpink", { inventory });
    setExportedInventory(inventory);
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
      selectedItem.ScryfallId = mainInventory[itemId]["Scryfall ID"] ?? "";
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
          mainInventory[itemId]["Image URL"] = response.data.image_uris.normal;
        } catch (error) {
          console.error({ error });
        }
      }
    }
    setSelectedItem(selectedItem);
  };
  const addItem = (item) => {
    setInventory([
      ...mainInventory,
      { ...item, id: mainInventory.length, Quantity: 1 },
    ]);
  };

  return (
    <>
      <div>
        <header className="app-header">MTG Inventory</header>
        <a
          className="github-link"
          href="https://github.com/BarneyL01/react-mtg-inventory"
        >
          <img
            alt="github"
            src={process.env.PUBLIC_URL + "/GitHub-Mark-Light-32px.png"}
          ></img>
        </a>
        <div className="app flex-container">
          <div className="flex-left">
            <div>
              <PasteBox onClickFunction={parseCsvToInventory} />
            </div>
            <div className="container">
              <header className="inventory-header">Inventory</header>
              <button
                className="add-card-button import-button primary-button action-button"
                onClick={() => setIsOpen(true)}
              >
                Add Card
              </button>
              <div className="inventory-section">
                <ItemTable
                  inventory={mainInventory}
                  loadItemFunction={loadItem}
                />
              </div>
            </div>
            <div>
              <ExportBox
                onClickFunction={exportCsv}
                exportedCsv={exportedInventory}
              />
            </div>
          </div>
          <div className="flex-right">
            <ItemDetails item={selectedItem} />
          </div>
          {isOpen && (
            <AddCard setIsOpen={setIsOpen} addItemFunction={addItem} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
