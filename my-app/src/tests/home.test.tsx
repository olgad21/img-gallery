import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Home from "../routes/home/home.component";
import { responsePhotos, flickrResponse } from "../constants";

afterAll(() => {
  jest.resetAllMocks();
});

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: async () => Promise.resolve(flickrResponse),
  })
);

test("cards are rendered after search", () => {
  render(<Home />);

  const input = screen.getByTestId("search-bar") as HTMLInputElement;
  act(() => {
    fireEvent.keyUp(input, {
      target: { value: flickrResponse.photos[0].photo[0].title },
    });
  });

  setTimeout(() => {
    const cardList = screen.getAllByTestId("card");
    expect(cardList?.length).toBe(flickrResponse.photos[0].photo.length);
  }, 1000);
});
