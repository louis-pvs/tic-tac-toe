import React from "react";
import propTypes from "prop-types";
import cx from "classnames";
import "./Toggle.scss";

const Toggle = ({ onToggleChanged, checked, disabled }) => {
  const handleChange = ({ target }) => {
    if (target.checked) onToggleChanged("x");
    else onToggleChanged("o");
  };
  const knobClassnames = cx({
    toggle__knob: true,
    "toggle__knob--checked": checked,
  });
  const knobPlaceholderClassnames = cx({
    "toggle__knob-placeholder": true,
    "toggle__knob-placeholder--checked": checked,
    "toggle__knob-placeholder--disabled": disabled,
  });
  const circleIconClassnames = cx({
    icon: true,
    "icon--circle": true,
    "toggle__icon-placeholder": true,
    "toggle__icon-placeholder--disabled": disabled,
    "toggle__icon-placeholder--selected": !checked,
    "toggle__icon-placeholder--circle": true,
  });
  const crossIconClassnames = cx({
    icon: true,
    "icon--cross": true,
    "toggle__icon-placeholder": true,
    "toggle__icon-placeholder--disabled": disabled,
    "toggle__icon-placeholder--selected": checked,
    "toggle__icon-placeholder--cross": true,
  });
  return (
    <div className="toggle">
      <span className="toggle__label">First Move</span>
      <br />
      <i className={circleIconClassnames} />
      <label className={knobPlaceholderClassnames}>
        <span className={knobClassnames}></span>
        <input
          className="toggle__input"
          type="checkbox"
          onChange={handleChange}
          checked={checked}
          disabled={disabled}
        />
      </label>
      <i className={crossIconClassnames} />
    </div>
  );
};

Toggle.defaultProps = {
  onToggleChanged: console.log,
  checked: false,
  disabled: false,
};

Toggle.propTypes = {
  onToggleChanged: propTypes.func,
  checked: propTypes.bool,
  disabled: propTypes.bool,
};

export default Toggle;
