import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Toggle from "./index";

const CLASSNAMES = {
  input: "toggle__input",
  knobPlaceholder: "toggle__knob-placeholder",
  crossIcon: "icon--cross",
  circleIcon: "icon--circle",
};

describe("<Toggle />", () => {
  it("should have checkbox allow user to interact", () => {
    const { container } = render(<Toggle />);
    const checkbox = container.querySelector(`.${CLASSNAMES.input}`);
    expect(checkbox).not.toBeNull();
    expect(checkbox).not.toBeUndefined();
  });
  it("should fire call back when toggle on click", () => {
    const mockCacllback = jest.fn();
    const { container } = render(
      <Toggle onToggleChanged={mockCacllback} checked={false} />
    );
    const toggle = container.querySelector(`.${CLASSNAMES.knobPlaceholder}`);
    const checkbox = container.querySelector(`.${CLASSNAMES.input}`);
    expect(checkbox.checked).toBeFalsy();

    fireEvent(toggle, new MouseEvent("click"));

    expect(mockCacllback).toHaveBeenCalledTimes(1);
  });
  it("shouldn't able to interact when it is disabled", () => {
    const mockCacllback = jest.fn();
    const { container } = render(
      <Toggle onToggleChanged={mockCacllback} checked={false} disabled={true} />
    );
    const toggle = container.querySelector(`.${CLASSNAMES.knobPlaceholder}`);
    fireEvent(toggle, new MouseEvent("click"));
    expect(mockCacllback).toHaveBeenCalledTimes(0);
  });
  it("should show the correct label when it is uncheck", () => {
    const { container } = render(<Toggle checked={false} />);
    const circleIcon = container.querySelector(`.${CLASSNAMES.circleIcon}`);
    const crossIcon = container.querySelector(`.${CLASSNAMES.crossIcon}`);
    const toggle = container.querySelector(`.${CLASSNAMES.knobPlaceholder}`);

    expect(
      circleIcon.classList.contains("toggle__icon-placeholder--selected")
    ).toBeTruthy();
    expect(
      crossIcon.classList.contains("toggle__icon-placeholder--selected")
    ).toBeFalsy();
    expect(
      toggle.classList.contains("toggle__knob-placeholder--checked")
    ).toBeFalsy();
  });
  it("should show the correct label when it is checked", () => {
    const { container } = render(<Toggle checked={true} />);
    const circleIcon = container.querySelector(`.${CLASSNAMES.circleIcon}`);
    const crossIcon = container.querySelector(`.${CLASSNAMES.crossIcon}`);
    const toggle = container.querySelector(`.${CLASSNAMES.knobPlaceholder}`);

    expect(
      circleIcon.classList.contains("toggle__icon-placeholder--selected")
    ).toBeFalsy();
    expect(
      crossIcon.classList.contains("toggle__icon-placeholder--selected")
    ).toBeTruthy();
    expect(
      toggle.classList.contains("toggle__knob-placeholder--checked")
    ).toBeTruthy();
  });

  it("should show the correct label when it is disabled", () => {
    const { container } = render(<Toggle checked={false} disabled={true} />);
    const circleIcon = container.querySelector(`.${CLASSNAMES.circleIcon}`);
    const crossIcon = container.querySelector(`.${CLASSNAMES.crossIcon}`);
    const toggle = container.querySelector(`.${CLASSNAMES.knobPlaceholder}`);

    expect(
      circleIcon.classList.contains("toggle__icon-placeholder--disabled")
    ).toBeTruthy();
    expect(
      crossIcon.classList.contains("toggle__icon-placeholder--disabled")
    ).toBeTruthy();
    expect(
      toggle.classList.contains("toggle__knob-placeholder--disabled")
    ).toBeTruthy();
  });
});
