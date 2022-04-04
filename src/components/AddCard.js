import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import SearchBox from "./SearchBox";
import { scryfallGetCardExactName } from "../utils/scryfallApis";

const AddCard = ({ setIsOpen }) => {
    const [card, setCard] = useState({});

    const selectCard = async function (cardName) {
        let cardDetails = await scryfallGetCardExactName(cardName);
        console.log("%c selectCard-cardDetails:", "color:hotpink", {
            cardDetails,
        });
        const loadedDetails = {
            Name: cardName,
            "Image URL": cardDetails.image_uris.normal,
            CMC: cardDetails.cmc,
            Edition: cardDetails.set_name,
            "Edition code": cardDetails.set.toUpperCase(),
            "Collector's number": cardDetails.collector_number,
            "Mana Value": cardDetails.mana_cost,
        };

        setCard(loadedDetails);
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
                            Name: <strong>{card["Name"]}</strong>
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
