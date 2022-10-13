import React, { Component, KeyboardEventHandler } from "react";
import "./search-bar.styles.css";

interface SearchBarProps {
  onChangeHandler: KeyboardEventHandler<HTMLInputElement>;
  className: string;
  defaultValue: string;
}

class SearchBar extends Component<SearchBarProps> {
  render() {
    const { onChangeHandler, className, defaultValue } = this.props;
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
  }
}

export default SearchBar;
