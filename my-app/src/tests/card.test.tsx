import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "../components/card/card.component";
import { responsePhotos } from "../constants";

test("renders card", () => {
  render(<Card photo={responsePhotos[0].photo[0]} />);
  const card = screen.getByTestId("card");
  expect(card).toBeDefined();
});
