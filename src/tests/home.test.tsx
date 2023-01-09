import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Home from "../routes/home/home.component";

const data = {
  stat: "OK",
  photos: {
    page: 1,
    pages: 1,
    perpage: 2,
    total: 2,
    photo: [
      {
        id: "52425432016",
        owner: "181776069@N02",
        title: "Margo",
        secret: "3408aefc14",
        server: "65535",
        farm: "66",
      },
      {
        id: "52425889655",
        owner: "48110669@N05",
        title: "Chelsea Market",
        secret: "d236070f4f",
        server: "65535",
        farm: "66",
      },
    ],
  },
};

jest.mock("../utils/data.utils", () => {
  return {
    getData: jest.fn().mockImplementation(() => data),
  };
});

describe("Home component", () => {
  test("cards are rendered after search", async () => {
    render(<Home />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() => {
      waitForElementToBeRemoved(() => screen.findByTestId("loading"));
    });

    expect(screen.getByTestId("card-list")).toBeInTheDocument();

    const card = await screen.findByText(/52425432016/i);
    expect(card).toBeInTheDocument();
  });

  test("input is rendered and works correctly", () => {
    render(<Home />);
    const input = screen.getByTestId("search-bar") as HTMLInputElement;
    act(() => {
      fireEvent.keyUp(input, {
        target: { value: "somestring" },
      });
    });
    expect(input.value).toBe("somestring");
  });
});
