import React, { Component, ChangeEventHandler } from "react";
import "./search-bar.styles.css";

interface SearchBarProps {
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
  className: string;
  value: string;
}

class SearchBar extends Component<SearchBarProps> {
  render() {
    const { onChangeHandler, className, value } = this.props;
    return (
      <input
        data-testid="search-bar"
        className={`search-box ${className}`}
        type="search"
        placeholder="Search name"
        onChange={onChangeHandler}
        value={value}
      />
    );
  }
}

export default SearchBar;
