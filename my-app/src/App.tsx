import './App.css';
import { Component, ChangeEvent } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBar from './components/search-bar/search-bar.component';
import getData from './utils/data.utils';

export interface Monster {
  id: string,
  name: string,
  website: string,
  email: string,
  username: string,
}

type State = {
  monsters: Monster[]; 
  searchValue: string;
};

class App extends Component<{}, State> {
  state: State = {
    monsters: [],
    searchValue: '',
  };

  componentDidMount() {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users');
      this.setState(
        () => {
          return { monsters: users }
        }, 
      )
    }

    fetchUsers();
  }

  onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState(() => {
      return { searchValue: event.target.value };
    })
  }

  render () {
    const { monsters, searchValue } = this.state;
    const searchedMonsters = monsters.filter(monster => {
      return monster.name.toLowerCase().includes(searchValue.toLowerCase())
    });

    return (
      <div className="App">
        <h1 className='app-title'>Choose Your Monster</h1>
        <SearchBar 
          onChangeHandler={this.onSearchChange}
          className='monsters-search-box'
        />
        <CardList monsters={searchedMonsters}/>
      </div>
    );
  }
}

export default App;
