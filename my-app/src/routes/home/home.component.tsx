import React, { Component, KeyboardEventHandler } from "react";
import CardList from "../../components/card-list/card-list.component";
import SearchBar from "../../components/search-bar/search-bar.component";
import { getData } from "../../utils/data.utils";
import { host, apiKey } from '../../constants';
import Photo, { FlickrResponse } from "Interfaces";
import DownloadMessage from "components/download-message/download-message.component";

export type HomeState = {
  photos: Photo[];
  searchValue: string;
  download: boolean;
};

class Home extends Component<{}, HomeState> {
  state: HomeState = {
    photos: [],
    searchValue: localStorage.getItem("search") || "",
    download: false,
  };

  componentDidMount() {
    window.addEventListener("beforeunload", this.saveToStorage);
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
    this.state.download = true;
    const response = await getData<FlickrResponse>(
      `${host}&api_key=${apiKey}&text=${this.state.searchValue}&per_page=100&page=1&format=json&nojsoncallback=1`
    );
    const photos = response.photos.photo;
    this.setState({ photos: photos });
    this.state.download = false;
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
    const { photos, searchValue, download } = this.state;
    return (
      <div className="App" id='home'>
        <h1 className="app-title">Image Gallery</h1>
        <SearchBar
          onChangeHandler={this.onSearchChange}
          className="monsters-search-box"
          defaultValue={searchValue}
        />
        {download && <DownloadMessage />}
        <CardList photos={photos}/>
      </div>
    );
  }
}

export default Home;
