import React from "react";
import cx from "classnames";
import propTypes from "prop-types";
import "./Tile.scss";

const Tile = ({ selectedValue, target, id, onTileChecked }) => {
  const handleOnChange = ({ target }) => {
    onTileChecked(target.value);
  };
  const labelClassName = cx({
    tile__label: true,
    'tile__label--dirty': !!selectedValue
  })
  const placeholderClassName = cx({
    tile__placeholder: true,
    "tile__placeholder--selected": !!selectedValue,
    "tile__placeholder--o-selected": selectedValue === "o",
    "tile__placeholder--x-selected": selectedValue === "x",
    icon: true,
    "icon--circle": (!selectedValue && target === "o") || selectedValue === "o",
    "icon--cross": (!selectedValue && target === "x") || selectedValue === "x",
  });
  return (
    <>
      <label className={labelClassName} htmlFor={`${id}-${target}`}>
        <i className={placeholderClassName}></i>
      </label>
      <input
        id={`${id}-o`}
        className="tile__radio-input"
        type="radio"
        value="o"
        name={`${id}-o`}
        onChange={handleOnChange}
      />
      <input
        id={`${id}-x`}
        className="tile__radio-input"
        type="radio"
        value="x"
        name={`${id}-x`}
        onChange={handleOnChange}
      />
    </>
  );
};
Tile.defaultProps = {
  selectedValue: null,
  target: "x",
  onTileChecked: console.log,
};
Tile.propTypes = {
  selectedValue: propTypes.oneOfType([
    propTypes.string,
    propTypes.instanceOf(null),
  ]),
  target: propTypes.string,
  id: propTypes.string.isRequired,
  onTileChecked: propTypes.func,
};

export default Tile;
