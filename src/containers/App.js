import { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: ''
    }
  }

  componentDidMount () {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then( response => response.json())
      .then( users => this.setState({ robots: users }));
  }

  onSearchChange = (event) => {
    // console.log(event.target.value);
    this.setState({searchField: event.target.value});
  }

  render() {
    const { robots, searchField } = this.state;
    const filteredKittens = robots.filter(kitten => {
      return kitten.name.toLowerCase().includes(searchField.toLowerCase());
    })
    // console.log(filteredKittens);
    return !robots.length ?
      <h1>Loading...</h1> :
      (
        <div className="tc">
          <h1 className="f1">KittenFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <CardList robots={filteredKittens} />
          </Scroll>
        </div>
      );
  }
}

export default App;