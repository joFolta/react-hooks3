import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

test("counter increments the count", () => {
  const { container } = render(<Counter />);
  const button = container.firstChild;
  expect(button.textContent).toBe("0");
  fireEvent.click(button);
  expect(button.textContent).toBe("1");
});

test("reads and writes to localStorage", () => {
  window.localStorage.setItem("count", "3");
  const { container } = render(<Counter />);
  const button = container.firstChild;
  expect(button.textContent).toBe("3");
  fireEvent.click(button);
  expect(window.localStorage.getItem("count")).toBe("4");
  expect(button.textContent).toBe("4");
  // window.localStorage.removeItem("count");   //clean up localStorage 'count' for future tests
});

// this test fails b/c the reset above is commented out (button.textContent is still '4')
test("another test...", () => {
  const { container } = render(<Counter />);
  const button = container.firstChild;
  expect(button.textContent).toBe("0");
});
