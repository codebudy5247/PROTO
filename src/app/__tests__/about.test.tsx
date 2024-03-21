import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "../about/page";

test("About Page", () => {
  render(<About />);
  expect(
    screen.getByRole("heading", { level: 1, name: "About" }),
  ).toBeDefined();
});
