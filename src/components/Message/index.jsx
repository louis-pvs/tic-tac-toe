import React from "react";
import propTypes from "prop-types";
import "./Message.scss";

const Result = ({ renderBeforeMessage, renderAfterMessage, message }) => {
  return (
    <p className="message">
      {renderBeforeMessage && renderBeforeMessage()}
      <span className="message__span">{message}</span>
      {renderAfterMessage && renderAfterMessage()}
    </p>
  );
};

Result.defaultProps = {
  message: "",
  renderBeforeMessage: () => null,
  renderAfterMessage: () => null,
};

Result.propTypes = {
  message: propTypes.string,
  renderBeforeMessage: propTypes.func,
  renderAfterMessage: propTypes.func,
};

export default Result;