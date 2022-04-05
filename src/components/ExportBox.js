import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

function ExportBox(props) {
  // const [pasteContents, setPasteContents] = useState("");
  const [visibility, setVisibility] = useState(false);

  // const handleChange = (event) => {
  //     setPasteContents(event.target.value);
  // };

  const handleExport = () => {
    props.onClickFunction("");
  };
  const handleExportToMoxfield = () => {
    props.onClickFunction("moxfield");
  };
  const toggleVisibility = () => {
    setVisibility(!visibility);
  };
  return (
    <div className="paste-box">
      <button className="accordion-header" onClick={toggleVisibility}>
        <strong>Export</strong>
        <span>
          {visibility ? (
            <i className="ms ms-untap"></i>
          ) : (
            <i className="ms ms-tap"></i>
          )}
        </span>
      </button>
      <div
        className={
          visibility
            ? "accordion-content paste-box-contents visible"
            : "accordion-content not-visible"
        }
      >
        <div>
          <textarea
            className="paste-box-textarea"
            value={props.exportedCsv}
            readOnly={true}
          ></textarea>
        </div>
        <div>
          <button
            className="import-button primary-button action-button"
            onClick={handleExport}
          >
            Export
          </button>
          <button
            className="moxfield-button import-button primary-button action-button"
            onClick={handleExportToMoxfield}
          >
            Moxfield
          </button>
        </div>
      </div>
    </div>
  );
}

ExportBox.propTypes = {
  onClickFunction: PropTypes.func.isRequired,
  exportedCsv: PropTypes.string,
};

export default ExportBox;
