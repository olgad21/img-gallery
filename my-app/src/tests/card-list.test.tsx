import React from "react";
import { render, screen } from "@testing-library/react";
import CardList from "../components/card-list/card-list.component";

const monsters = [
  {
    id: "1",
    name: "aaaa",
    website: "string",
    email: "string",
    username: "string",
  },
  {
    id: "2",
    name: "bbbb",
    website: "string",
    email: "string",
    username: "string",
  },
];

describe("Card list component", () => {
  test("it contains all cards", () => {
    render(<CardList monsters={monsters} />);
    for (const monster of monsters) {
      expect(screen.getByText(monster.name)).toBeInTheDocument();
    }
  });
});
