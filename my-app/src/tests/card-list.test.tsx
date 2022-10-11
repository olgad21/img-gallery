import React from "react";
import { render, screen } from "@testing-library/react";
import CardList from "../components/card-list/card-list.component";
import monsters from "../constants";

describe("Card list component", () => {
  test("it contains all cards", () => {
    render(<CardList monsters={monsters} />);
    for (const monster of monsters) {
      expect(screen.getByText(monster.name)).toBeInTheDocument();
    }
  });
});
