import React from "react";
// import { useState } from "react";
import PropTypes from "prop-types";

const AddCard = ({setIsOpen}) => {
    return (
        <>
            <div className="glass-modal" onClick={() => setIsOpen(false)}>
                <div className="modal-content">
									<header>Hello</header>
								</div>
            </div>
        </>
    );
};

AddCard.propTypes = {
    setIsOpen: PropTypes.func.isRequired,
};

export default AddCard;
