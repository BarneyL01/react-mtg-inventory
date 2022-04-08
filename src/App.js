import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import PasteBox from "./components/PasteBox";
import ExportBox from "./components/ExportBox";
import ItemTable from "./components/ItemTable";
import AddCard from "./components/AddCard";
import Papa from "papaparse";
import ItemDetails from "./components/itemDetails";
import { scryfallGetByScryfallId } from "./utils/scryfallApis";

function App() {
  const [mainInventory, setInventory] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [exportedInventory, setExportedInventory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Stops scrolling if modal is open:
    isOpen && (document.body.style.overflow = "hidden");
    !isOpen && (document.body.style.overflow = "unset");
  }, [isOpen]);

  useEffect(() => {
    async function updateImageUrlFromScryfall() {
      if (
        mainInventory.length > 0 &&
        mainInventory[selectedItemId] !== undefined &&
        mainInventory[selectedItemId]["Scryfall ID"] !== undefined &&
        mainInventory[selectedItemId]["Scryfall ID"].length > 0 &&
        (mainInventory[selectedItemId]["Image URL"] === undefined ||
          mainInventory[selectedItemId]["Image URL"].length == 0)
      ) {
        let data = await scryfallGetByScryfallId(
          mainInventory[selectedItemId]["Scryfall ID"]
        );
        updateItem(selectedItemId, "Image URL", data.image_uris.normal);
      }
    }
    updateImageUrlFromScryfall();
  }, [selectedItemId]);

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
  const addQuantity = () => {
    updateItem(
      selectedItemId,
      "Quantity",
      mainInventory[selectedItemId]["Quantity"] + 1
    );
  };
  const minusQuantity = () => {
    // don't allow less than 1
    updateItem(
      selectedItemId,
      "Quantity",
      Math.max(1, mainInventory[selectedItemId]["Quantity"] - 1)
    );
  };
  const updateItem = (itemId, itemFieldName, newValue) => {
    const newInventory = mainInventory.map((obj) => {
      if (obj.id === itemId)
        return {
          ...obj,
          [itemFieldName]: newValue,
        };
      return obj;
    });

    setInventory(newInventory);
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
                  selectItemFunction={setSelectedItemId}
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
            <ItemDetails
              item={mainInventory[selectedItemId]}
              AddQuantityFunction={addQuantity}
              MinusQuantityFunction={minusQuantity}
              mainInventory={mainInventory}
              UpdateItemFunction={updateItem}
            />
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
