import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import cx from "classnames";

import "./StrikeLine.scss";

const StyledDiv = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${(props) =>
    props.isRow &&
    `
    top: ${(100 / 3) * props.index[0] + 100 / 6}%;
  `}
  ${(props) =>
    props.isColumn &&
    `
    left: ${(100 / 3) * props.index[1] + 100 / 6}%;
    transform: translate(-50%, 0) rotate(-90deg);
  `}
  ${(props) =>
    props.isBackSlash &&
    `
    transform: translate(-50%, -50%) rotate(-45deg) scaleX(1.4);
  `}
  ${(props) =>
    props.isForwardSlash &&
    `
    transform: translate(-50%, -50%) rotate(45deg) scaleX(1.4);
  `}
`;

const StrikeLine = ({ strikeIndex, mark }) => {
  if (!strikeIndex || strikeIndex.length < 3) return null;
  const lineClassnames = cx({
    "strike-line": true,
    [`strike-line--${mark}`]: !!mark,
  });

  const [indexOne, indexTwo, indexThree] = strikeIndex;
  const isRow = indexOne[0] === indexTwo[0] && indexTwo[0] === indexThree[0];
  const isColumn = indexOne[1] === indexTwo[1] && indexTwo[1] === indexThree[1];
  const isBackSlash = indexOne[0] === indexThree[1] && indexTwo === "11";
  const isForwardSlash =
    indexOne[0] === indexOne[1] &&
    indexThree[0] === indexThree[1] &&
    indexTwo === "11";

  return (
    <StyledDiv
      className={lineClassnames}
      isRow={isRow}
      isColumn={isColumn}
      isBackSlash={isBackSlash}
      isForwardSlash={isForwardSlash}
      index={indexOne}
    />
  );
};

StrikeLine.defaultProps = {
  strikeIndex: [],
  mark: "",
};

StrikeLine.propTypes = {
  strikeIndex: propTypes.arrayOf(propTypes.string),
  mark: propTypes.string,
};

export default StrikeLine;
