import React from "react";
import { render, screen } from "@testing-library/react";
import CardList from "../components/card-list/card-list.component";
import { responsePhotos } from "../constants";

describe("Card list component", () => {
  test("it contains all cards", () => {
    render(<CardList photos={responsePhotos[0].photo} />);
    for (const photo of responsePhotos[0].photo) {
      expect(screen.getByText(`ID: ${photo.id}`)).toBeInTheDocument();
    }
  });
});
