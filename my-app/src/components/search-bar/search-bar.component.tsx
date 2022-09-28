import { Component, ChangeEventHandler } from 'react';
import './search-bar.styles.css';

interface SearchBarProps {
  onChangeHandler: ChangeEventHandler<HTMLInputElement>;
  className: string;
}

class SearchBar extends Component<SearchBarProps> {
  render () {
    const { onChangeHandler, className }: SearchBarProps = this.props;
    return (
      <input 
        className={`search-box ${className}`}
        type='search' 
        placeholder='Search name'
        onChange = {onChangeHandler}
      />
    )
  }
}

export default SearchBar;