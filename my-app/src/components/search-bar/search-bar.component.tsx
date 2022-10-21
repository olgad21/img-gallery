import React, { KeyboardEventHandler, FC } from "react";
import "./search-bar.styles.css";

interface SearchBarProps {
  onChangeHandler: KeyboardEventHandler<HTMLInputElement>;
  className: string;
  defaultValue: string;
}

const SearchBar: FC<SearchBarProps> = ({
  onChangeHandler,
  className,
  defaultValue,
}) => {
  return (
    <input
      data-testid="search-bar"
      className={`search-box ${className}`}
      type="search"
      placeholder="Search name"
      onKeyUp={onChangeHandler}
      defaultValue={defaultValue}
    />
  );
};

export default SearchBar;
