import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const AddCard = ({ setIsOpen }) => {
    const [card, ] = useState({});
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
                        <input
                            className="search-input"
                            placeholder="Search for a card to add"
                        ></input>
                    </div>
                    <div className="flex-container section">
                        <div className="flex-equal">
                            <div
                                className={
                                    card.name === undefined
                                        ? "card-image__empty"
                                        : "card-image"
                                }
                            >
                                nothing
                            </div>
                        </div>
                        <div className="flex-equal">Name:</div>
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
