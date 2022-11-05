import Photo from "Interfaces";
import React, { createContext, ReactNode, useState } from "react";

type SearchResultContextType = {
  searchResult: null | Photo[],
  setSearchResult: React.Dispatch<React.SetStateAction<null | Photo[]>>,
}

export const SearchResultContext = createContext<SearchResultContextType>({
  searchResult: [],
  setSearchResult: () => null
});

const SearchResultProvider = ( {children} : {children: ReactNode} ) => {
  const [searchResult, setSearchResult] = useState<null | Photo[]>([]);
  const value = { searchResult, setSearchResult };

  return <SearchResultContext.Provider value={value}>{children}</SearchResultContext.Provider>
}

export default SearchResultProvider;