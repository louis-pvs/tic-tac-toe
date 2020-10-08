import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Toggle from "./index";

const CLASSNAMES = {
  input: "toggle__input",
  toggle: "toggle",
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
    const mockCallback = jest.fn();
    const { container } = render(
      <Toggle onToggleChanged={mockCallback} checked={false} disabled={false} />
    );
    const toggle = container.querySelector(`.${CLASSNAMES.toggle}`);
    const checkbox = container.querySelector(`.${CLASSNAMES.input}`);
    expect(checkbox.checked).toBeFalsy();

    fireEvent(toggle, new MouseEvent("click"));
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(checkbox.checked).toBeTruthy();
  });
  it("shouldn't able to interact when it is disabled", () => {
    const mockCallback = jest.fn();
    const { container } = render(
      <Toggle onToggleChanged={mockCallback} checked={false} disabled={true} />
    );
    const toggle = container.querySelector(`.${CLASSNAMES.toggle}`);
    fireEvent(toggle, new MouseEvent("click"));
    expect(mockCallback).toHaveBeenCalledTimes(0);
  });
  it("should show the correct label when it is disabled", () => {
    const { container } = render(<Toggle checked={false} disabled={true} />);
    const circleIcon = container.querySelector(`.${CLASSNAMES.circleIcon}`);
    const crossIcon = container.querySelector(`.${CLASSNAMES.crossIcon}`);
    const toggle = container.querySelector(`.${CLASSNAMES.toggle}`);

    expect(
      circleIcon.classList.contains("toggle__icon-placeholder--disabled")
    ).toBeTruthy();
    expect(
      crossIcon.classList.contains("toggle__icon-placeholder--disabled")
    ).toBeTruthy();
    expect(toggle.classList.contains("toggle--disabled")).toBeTruthy();
  });
});
