import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Tile from "./index";

const CLASSNAMES = {
  label: "tile__label",
  radio: "tile__radio-input",
  placeholder: "tile__placeholder",
};

describe("<Tile />", () => {
  let id = "01";
  let target = "o";
  const XId = "01-x";
  const OId = "01-o";
  it("should contains require fields element", () => {
    const { container } = render(<Tile id={id} />);
    const labelEl = container.querySelector(`.${CLASSNAMES.label}`);
    const inputEls = container.querySelectorAll(`.${CLASSNAMES.radio}`);
    expect(labelEl).not.toBeNull();
    expect(labelEl).not.toBeUndefined();

    expect(inputEls).not.toBeNull();
    expect(inputEls).not.toBeUndefined();
    expect(inputEls.length).toBe(2);
  });
  it("should have correct id in radio element", () => {
    const { container } = render(<Tile id={id} target={target} />);
    const OInput = container.querySelector(`[id="${OId}"]`);
    const XInput = container.querySelector(`[id="${XId}"]`);
    expect(OInput).not.toBeNull();
    expect(OInput).not.toBeUndefined();
    expect(XInput).not.toBeNull();
    expect(XInput).not.toBeUndefined();
  });
  it("should have correct attribute in label element", () => {
    const { container } = render(<Tile id={id} target={target} />);
    const labelEl = container.querySelector(`.${CLASSNAMES.label}`);
    expect(labelEl.getAttribute("for")).toBe(OId);
  });
  it("should select the correct input when user click on label", () => {
    const { container } = render(
      <Tile id={id} target={target} selectedValue="x" />
    );
    const OInput = container.querySelector(`[id="${OId}"]`);
    const XInput = container.querySelector(`[id="${XId}"]`);
    expect(OInput.checked).toBeFalsy();
    expect(XInput.checked).toBeTruthy();
  });
  it("should trigger call back when input selected", () => {
    const mockCacllback = jest.fn();
    const { container } = render(
      <Tile id={id} target={target} onTileChecked={mockCacllback} />
    );
    const labelEl = container.querySelector(`.${CLASSNAMES.label}`);

    fireEvent(labelEl, new MouseEvent("click"));

    expect(mockCacllback).toHaveBeenCalledTimes(1);
  });
  it("should show the correct icon when input selected", () => {
    const { container } = render(
      <Tile id={id} target={target} selectedValue="x" />
    );
    const icon = container.querySelector(`.${CLASSNAMES.placeholder}`);

    expect(
      icon.classList.contains("tile__placeholder--o-selected")
    ).toBeFalsy();
    expect(
      icon.classList.contains("tile__placeholder--x-selected")
    ).toBeTruthy();
  });
});
