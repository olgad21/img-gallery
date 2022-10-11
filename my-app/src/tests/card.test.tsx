import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "../components/card/card.component";
import monsters from "../constants";

test("renders card", () => {
  render(<Card monster={monsters[0]} />);
  const card = screen.getByTestId("card");
  expect(card).toBeDefined();
});
