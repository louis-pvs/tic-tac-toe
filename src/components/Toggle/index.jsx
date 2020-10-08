import React from "react";
import propTypes from "prop-types";
import cx from "classnames";
import "./Toggle.scss";

const Toggle = ({ onToggleChanged, checked, disabled }) => {
  const handleChange = ({ target }) => {
    if (target.checked) onToggleChanged("x");
    else onToggleChanged("o");
  };
  const toggleClassname = cx({
    toggle: true,
    "toggle--disabled": disabled,
  });
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
    <label className={toggleClassname}>
      <span className="toggle__label">First Move</span>
      <i className={circleIconClassnames} />
      <span className={knobPlaceholderClassnames}>
        <span className={knobClassnames}></span>
        <input
          className="toggle__input"
          type="checkbox"
          onChange={handleChange}
          disabled={disabled}
        />
      </span>
      <i className={crossIconClassnames} />
    </label>
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
