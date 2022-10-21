import React, { Component, KeyboardEventHandler } from "react";
import CardList from "../../components/card-list/card-list.component";
import SearchBar from "../../components/search-bar/search-bar.component";
import { getData } from "../../utils/data.utils";
import { host, apiKey } from "../../constants";
import Photo, { FlickrResponse } from "Interfaces";
import DownloadMessage from "components/download-message/download-message.component";

export type HomeState = {
  photos: Photo[];
  searchValue: string;
  isLoading: boolean;
};

const ErrorMessage = () => {
  return (
    <div>
      <p>No results containing all your search terms were found.</p>
    </div>
  );
};

class Home extends Component<{}, HomeState> {
  state: HomeState = {
    photos: [],
    searchValue: localStorage.getItem("search") || "",
    isLoading: false,
  };

  componentDidMount() {
    window.addEventListener("beforeunload", this.saveToStorage);
    this.fetchUsers(this.state.searchValue);
  }

  componentWillUnmount() {
    this.saveToStorage();
    window.removeEventListener("beforeunload", this.saveToStorage);
  }

  fetchUsers = async (searchedText: string) => {
    try {
      this.setState({ isLoading: true });
      const response = await getData<FlickrResponse>(
        `${host}&api_key=${apiKey}&text=${searchedText}&per_page=100&page=1&format=json&nojsoncallback=1`
      );
      const photos = response.photos.photo;
      this.setState({ photos: photos, isLoading: false });
    } catch {
      this.setState({ photos: [], isLoading: false });
    }
  };

  saveToStorage = () => {
    localStorage.setItem("search", this.state.searchValue);
  };

  onSearchChange: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      this.setState({ searchValue: (event.target as HTMLInputElement).value });
      this.fetchUsers((event.target as HTMLInputElement).value);
    }
  };

  render() {
    const { photos, searchValue, isLoading } = this.state;
    console.log(photos);
    return (
      <div className="App" id="home">
        <h1 className="app-title">Image Gallery</h1>
        <SearchBar
          onChangeHandler={this.onSearchChange}
          className="monsters-search-box"
          defaultValue={searchValue}
        />
        {isLoading && <DownloadMessage />}
        {photos.length ? <CardList photos={photos} /> : <ErrorMessage />}
      </div>
    );
  }
}

export default Home;
