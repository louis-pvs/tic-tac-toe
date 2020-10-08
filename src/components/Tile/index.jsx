import React from "react";
import cx from "classnames";
import propTypes from "prop-types";
import "./Tile.scss";

const Tile = ({
  selectedValue,
  target,
  id,
  onTileChecked,
  disabled,
  highlight,
}) => {
  const handleOnChange = ({ target }) => {
    onTileChecked(target.value);
  };
  const labelClassName = cx({
    tile__label: true,
    "tile__label--disabled": disabled,
    "tile__label--dirty": !!selectedValue,
    "tile__label--x-highlight": selectedValue === "x" && highlight,
    "tile__label--o-highlight": selectedValue === "o" && highlight,
  });
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
      {["o", "x"].map((mark) => {
        return (
          <input
            key={mark}
            id={`${id}-${mark}`}
            className="tile__radio-input"
            type="radio"
            value={mark}
            name={`${id}-${mark}`}
            checked={selectedValue === mark}
            onChange={handleOnChange}
            disabled={!!selectedValue || disabled}
          />
        );
      })}
    </>
  );
};
Tile.defaultProps = {
  selectedValue: null,
  target: "x",
  onTileChecked: console.log,
  disabled: false,
  highlight: false,
};
Tile.propTypes = {
  selectedValue: propTypes.oneOfType([
    propTypes.string,
    propTypes.instanceOf(null),
  ]),
  target: propTypes.string,
  id: propTypes.string.isRequired,
  onTileChecked: propTypes.func,
  disabled: propTypes.bool,
  highlight: propTypes.bool,
};

export default Tile;
