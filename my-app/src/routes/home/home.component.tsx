import React, {
  KeyboardEventHandler,
  useEffect,
  useState,
  FC,
  useContext,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import CardList from "../../components/card-list/card-list.component";
import SearchBar from "../../components/search-bar/search-bar.component";
import { getData } from "../../utils/data.utils";
import {
  host,
  apiKey,
  sortOptions,
  onPageOptions,
  pagesCountOptions,
} from "../../constants";
import { FlickrResponse } from "Interfaces";
import DownloadMessage from "components/download-message/download-message.component";
import { AppContext, SortTypes } from "contexts/context";
import Pagination from "components/pagination/pagination.component";

export type HomeState = {
  searchValue: string;
  isLoading: boolean;
};

function isOfType(value: string): value is SortTypes {
  return [
    "date-posted-asc",
    "date-posted-desc",
    "interestingness-desc",
  ].includes(value);
}

const ErrorMessage = () => {
  return (
    <div>
      <p>No results containing all your search terms were found.</p>
    </div>
  );
};

const Home: FC = () => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem("search") || ""
  );
  const { state, dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeunload", saveToStorage);

    return () => {
      saveToStorage();
      window.removeEventListener("beforeunload", saveToStorage);
    };
  }, [searchValue]);

  const saveToStorage = () => {
    localStorage.setItem("search", searchValue);
  };

  const onSearchChange: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      setSearchValue((event.target as HTMLInputElement).value);
      fetchUsers(
        (event.target as HTMLInputElement).value,
        state.sort,
        state.perPage,
        state.page
      );
    }
  };

  const handleSortChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (isOfType(event.target.value)) {
      dispatch({
        type: "changeSorting",
        payload: event.target.value,
      });
      fetchUsers(searchValue, event.target.value, state.perPage, state.page);
    }
  };

  const hanglePerPageCount: ChangeEventHandler<HTMLSelectElement> = (event) => {
    dispatch({
      type: "changePerPageCount",
      payload: +event.target.value,
    });
    fetchUsers(searchValue, state.sort, +event.target.value, state.page);
  };

  const hanglePagesCount: ChangeEventHandler<HTMLSelectElement> = (event) => {
    dispatch({
      type: "changePagesCount",
      payload: +event.target.value,
    });
    fetchUsers(searchValue, state.sort, state.perPage, state.page);
  };

  const handlePageNumber = (page: number) => {
    dispatch({
      type: "changePage",
      payload: page,
    });
    fetchUsers(searchValue, state.sort, state.perPage, page);
  }

  const fetchUsers = async (
    searchedText: string,
    sort: string,
    perPage: number,
    page: number
  ) => {
    try {
      setIsLoading(true);
      const response = await getData<FlickrResponse>(
        `${host}&api_key=${apiKey}&text=${searchedText}&sort=${sort}&per_page=${perPage}}&page=${page}&format=json&nojsoncallback=1`
      );
      const photos = response.photos.photo;

      dispatch({
        type: "addPhotos",
        payload: photos,
      });
      setIsLoading(false);
    } catch {
      dispatch({
        type: "addPhotos",
        payload: [],
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="App" id="home">
      <>
        <h1 className="app-title">Image Gallery</h1>
        <SearchBar
          onChangeHandler={onSearchChange}
          className="monsters-search-box"
          defaultValue={searchValue}
        />
        <div className="selectControllers">
          <select value={state.sort} onChange={handleSortChange}>
            {sortOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select onChange={hanglePerPageCount}>
            {onPageOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select onChange={hanglePagesCount}>
            {pagesCountOptions.map((option) => (
              <option value={option.value} key={`${option.value}totalPages`}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <Pagination pagesCount={state.pagesCount} onPageChange={handlePageNumber}/>
        {isLoading && <DownloadMessage />}
        {state.photos?.length ? (
          <CardList photos={state.photos} />
        ) : (
          <ErrorMessage />
        )}
      </>
    </div>
  );
};

export default Home;
