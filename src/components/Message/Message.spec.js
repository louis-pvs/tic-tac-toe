import React from "react";
import { render } from "@testing-library/react";
import Message from "./index";

describe("<Result />", () => {
  it("should render message from prop", () => {
    const { container } = render(<Message message="awesome message" />);
    expect(container.firstChild.textContent).toBe("awesome message");
  });
  it("should trigger call back", () => {
    const mockCallback = jest.fn();
    render(
      <Message message="awesome message" renderAfterMessage={mockCallback} />
    );
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
