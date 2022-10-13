import React, { Component, KeyboardEventHandler } from "react";
import CardList from "../../components/card-list/card-list.component";
import SearchBar from "../../components/search-bar/search-bar.component";
import { getData } from "../../utils/data.utils";
import { host, apiKey } from '../../constants';
import Photo, { FlickrResponse } from "Interfaces";

export type HomeState = {
  photos: Photo[];
  searchValue: string;
};

class Home extends Component<{}, HomeState> {
  state: HomeState = {
    photos: [],
    searchValue: localStorage.getItem("search") || "",
  };

  componentDidMount() {
    window.removeEventListener("beforeunload", this.saveToStorage);
    this.fetchUsers();
  };

  componentWillUnmount() {
    this.saveToStorage();
    window.removeEventListener("beforeunload", this.saveToStorage);
  };

  componentDidUpdate(_prevProps: {}, prevState: HomeState) {
    if (this.state.searchValue !== prevState.searchValue) {
      this.fetchUsers();
    }
  };

  fetchUsers = async () => {
    const response = await getData<FlickrResponse>(
      `${host}&api_key=${apiKey}&text=${this.state.searchValue}&per_page=100&page=1&format=json&nojsoncallback=1`
    );
    const photos = response.photos.photo;
    this.setState({ photos: photos });
    console.log(response, 222);
  };

  saveToStorage = () => {
    localStorage.setItem("search", this.state.searchValue);
  };

  onSearchChange: KeyboardEventHandler<HTMLInputElement> = async (event) => {
    if (event.key === 'Enter') {
      this.setState(() => ({ searchValue: (event.target as HTMLInputElement).value }));
    }
  };

  render() {
    const { photos, searchValue } = this.state;

    return (
      <div className="App">
        <h1 className="app-title">Image Gallery</h1>
        <SearchBar
          onChangeHandler={this.onSearchChange}
          className="monsters-search-box"
          defaultValue={searchValue}
        />
        <CardList photos={photos} />
      </div>
    );
  }
}

export default Home;
