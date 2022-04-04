import React from "react";
// import { useState } from "react";
import PropTypes from "prop-types";

const AddCard = ({ setIsOpen }) => {
    return (
        <>
            <div className="glass-modal">
                <div className="modal-content">
                    <header>Add Card</header>
                    <button
                        className="close-button"
                        onClick={() => setIsOpen(false)}
                        alt="close"
                    ></button>
                    <div>
                        <input className="search-input"></input>
                    </div>
                    <div>
                        <button className="primary-button">Add</button>
                        <button className="secondary-button">Cancel</button>
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
