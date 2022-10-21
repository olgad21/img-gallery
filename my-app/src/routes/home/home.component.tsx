import React, { KeyboardEventHandler, useEffect, useState } from "react";
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

const Home = () => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem("search") || ""
  );
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeunload", saveToStorage);
    fetchUsers(searchValue);
  }, []);

  useEffect(() => {
    return () => {
      saveToStorage();
      window.removeEventListener("beforeunload", saveToStorage);
    };
  });

  const saveToStorage = () => {
    localStorage.setItem("search", searchValue);
  };

  const onSearchChange: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      setSearchValue((event.target as HTMLInputElement).value);
      fetchUsers((event.target as HTMLInputElement).value);
    }
  };

  const fetchUsers = async (searchedText: string) => {
    try {
      setIsLoading(true);
      const response = await getData<FlickrResponse>(
        `${host}&api_key=${apiKey}&text=${searchedText}&per_page=100&page=1&format=json&nojsoncallback=1`
      );
      const photos = response.photos.photo;

      setPhotos(photos);
      setIsLoading(false);
    } catch {
      setPhotos([]);
      setIsLoading(false);
    }
  };

  return (
    <div className="App" id="home">
      <h1 className="app-title">Image Gallery</h1>
      <SearchBar
        onChangeHandler={onSearchChange}
        className="monsters-search-box"
        defaultValue={searchValue}
      />
      {isLoading && <DownloadMessage />}
      {photos && <CardList photos={photos} />}
      {!photos.length && <ErrorMessage />}
    </div>
  );
};

export default Home;
