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

        setCard({ name: cardName, imageUrl: cardDetails.image_uris.normal });
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
                                    card.name === undefined
                                        ? "card-image__empty"
                                        : ""
                                }
                            >
                                {card.imageUrl !== undefined ? (
                                    <img
                                        className="card-image"
                                        src={card.imageUrl}
                                    ></img>
                                ) : (
                                    "nothing"
                                )}
                            </div>
                        </div>
                        <div className="flex-equal">
                            Name: <strong>{card.name}</strong>
                        </div>
                    </div>
                    <div>
                        <button className="general-button primary-button action-button">
                            Add
                        </button>
                        <button className="general-button secondary-button action-button">
                            Cancel
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
