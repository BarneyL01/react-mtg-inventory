import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import SearchBox from "./SearchBox";
import {
    scryfallGetCardExactName,
    scryfallGetPublishedCards,
} from "../utils/scryfallApis";

const AddCard = ({ setIsOpen }) => {
    const [card, setCard] = useState({});
    const [editions, setEditions] = useState([]);
    const [selectedEdition, setSelectedEdition] = useState("");

    const copyCardDetails = (cardDetails) => {
        const loadedDetails = {
            Name: cardDetails.name,
            "Image URL": cardDetails.image_uris.normal,
            CMC: cardDetails.cmc,
            Edition: cardDetails.set_name,
            "Edition code": cardDetails.set.toUpperCase(),
            "Collector's number": cardDetails.collector_number,
            "Mana Value": cardDetails.mana_cost,
            "Scryfall ID": cardDetails.id,
        };
        return loadedDetails;
    };

    const selectCard = async function (cardName) {
        let cardDetails = await scryfallGetCardExactName(cardName);
        console.log("%c selectCard-cardDetails:", "color:hotpink", {
            cardDetails,
        });
        setSelectedEdition(cardDetails.id);
        let editionsResponse = await scryfallGetPublishedCards(
            cardDetails.prints_search_uri
        );
        setEditions([...editionsResponse]);
        // console.log("%c selectCard-editionsResponse:", "color:hotpink", {
        //     editionsResponse,
        // });

        setCard(copyCardDetails(cardDetails));
    };

    const selectCardFromEditions = (event) => {
        setCard(
            copyCardDetails(
                editions.find((item) => {
                    return item.id === event.target.value;
                })
            )
        );
        setSelectedEdition(event.target.value);
    };

    return (
        <>
            <div className="glass-modal">
                <div className="modal-content">
                    <button
                        className="close-button"
                        onClick={() => setIsOpen(false)}
                        alt="close"
                    ></button>
                    <div className="section">
                        <SearchBox selectCard={selectCard} />
                    </div>
                    <div className="flex-container section">
                        <div className="flex-equal">
                            <div
                                className={
                                    card["Name"] === undefined
                                        ? "card-image__empty"
                                        : "card-image__loaded"
                                }
                            >
                                {card["Image URL"] !== undefined ? (
                                    <img
                                        className="card-image"
                                        src={card["Image URL"]}
                                    ></img>
                                ) : (
                                    "nothing"
                                )}
                            </div>
                        </div>
                        <div className="flex-equal">
                            <ul className="card-details-list">
                                <li>
                                    <label>Name: </label>
                                    <strong>{card["Name"]}</strong>
                                </li>
                                {editions.length > 0 ? (
                                    <li>
                                        <label>Editions: </label>
                                        <select
                                            value={selectedEdition}
                                            onChange={selectCardFromEditions}
                                        >
                                            {editions.map((item) => {
                                                return (
                                                    <option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.set_name} #{item.collector_number}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </li>
                                ) : (
                                    <></>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <button className="general-button primary-button action-button">
                            Add
                        </button>
                        <button
                            className="general-button secondary-button action-button"
                            onClick={() => setIsOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

AddCard.propTypes = {
    setIsOpen: PropTypes.func.isRequired,
};

export default AddCard;
