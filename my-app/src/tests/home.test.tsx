import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Home from "../routes/home/home.component";

afterAll(() => {
  jest.resetAllMocks();
});

const monsters = [
  {
    id: "1",
    name: "Bret",
    website: "hildegard.org",
    email: "Shanna@melissa.tv",
    username: "Leanne",
  },
  {
    id: "2",
    name: "Antonette",
    website: "anastasia.net",
    email: "Nathan@yesenia.net",
    username: "McKenziehaven",
  },
];

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: async () => Promise.resolve(monsters),
  })
);

test("cards are rendered according to search value", async () => {
  render(<Home />);

  const cardList = await screen.findAllByTestId("card");

  expect(cardList?.length).toBe(monsters.length);

  const input = screen.getByTestId("search-bar") as HTMLInputElement;
  fireEvent.change(input, { target: { value: monsters[0].name } });

  const cardListFiltered = await screen.findAllByTestId("card");

  expect(cardListFiltered?.length).toBe(1);
});
