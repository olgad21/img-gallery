import { ChangeEvent, Component } from "react";
import CardList from "../../components/card-list/card-list.component";
import SearchBar from "../../components/search-bar/search-bar.component";
import { getData } from "../../utils/data.utils";

export interface Monster {
  id: string,
  name: string,
  website: string,
  email: string,
  username: string,
}

export type State = {
  monsters: Monster[]; 
  searchValue: string;
};

class Home extends Component<{}, State> {
  state: State = {
    monsters: [],
    searchValue: localStorage.getItem('search') || '',
  };

  componentDidMount() {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users');
      this.setState(
        () => ({ monsters: users }),
      )
    }

    fetchUsers();
    window.addEventListener('beforeunload', this.saveToStorage);
  }

  componentWillUnmount() {
    this.saveToStorage();
    window.removeEventListener('beforeunload', this.saveToStorage);
  }

  saveToStorage = () => {
    localStorage.setItem('search', this.state.searchValue);
  }

  onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState(() => ({ searchValue: event.target.value }));
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
          value={searchValue}
        />
        <CardList monsters={searchedMonsters}/>
      </div>
    );
  }
}

export default Home;