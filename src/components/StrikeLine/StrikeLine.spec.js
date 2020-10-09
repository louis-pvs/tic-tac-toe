import React from "react";
import { render } from "@testing-library/react";
import StrikeLine from "./index";

const CLASSNAMES = {
  strikeLine: "strike-line",
};

describe("<StrikeLine />", () => {
  it("shouldn't render if without strikeIndex provide", () => {
    const { container } = render(<StrikeLine strikeIndex={[]} mark="x" />);
    expect(container.childElementCount).toBe(0);
  });
  it("should should correct color base on `mark` prop", () => {
    const { rerender, container } = render(
      <StrikeLine strikeIndex={["00", "01", "02"]} mark="x" />
    );
    let strikeLine = container.querySelector(`.${CLASSNAMES.strikeLine}`);
    expect(strikeLine.classList.contains(`${CLASSNAMES.strikeLine}--x`)).toBeTruthy();

    rerender(<StrikeLine strikeIndex={["00", "01", "02"]} mark="o" />);
    expect(strikeLine.classList.contains(`${CLASSNAMES.strikeLine}--o`)).toBeTruthy();
  });
});
