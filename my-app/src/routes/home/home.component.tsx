import React, { KeyboardEventHandler, useEffect, useState, FC } from "react";
import CardList from "../../components/card-list/card-list.component";
import SearchBar from "../../components/search-bar/search-bar.component";
import Photo from "Interfaces";
import DownloadMessage from "components/download-message/download-message.component";
import { fetchPhotos, selectPhotos, selectStatus } from "redux/photosSlice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

export type HomeState = {
  searchValue: string;
};

const ErrorMessage = () => {
  return (
    <div>
      <p>No results containing all your search terms were found.</p>
    </div>
  );
};

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const photos = useAppSelector(selectPhotos);
  const photosStatus = useAppSelector(selectStatus);

  const initialSearchValue = localStorage.getItem("search") || "";
  const [searchValue, setSearchValue] = useState(initialSearchValue);

  const saveToStorage = () => {
    localStorage.setItem("search", searchValue);
  };

  const onFetchPhotos = (searchedText: string) => {
    dispatch(fetchPhotos(searchedText));
  };

  useEffect(() => {
    onFetchPhotos(initialSearchValue);
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", saveToStorage);

    return () => {
      saveToStorage();
      window.removeEventListener("beforeunload", saveToStorage);
    };
  }, [searchValue]);

  const onSearchChange: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      const value = (event.target as HTMLInputElement).value;
      setSearchValue(value);
      onFetchPhotos(value);
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
      {photosStatus === 'loading' && <DownloadMessage />}
      {photosStatus === 'succeeded' && photos.length ? <CardList photos={photos} /> : <ErrorMessage />}
    </div>
  );
};

export default Home;
