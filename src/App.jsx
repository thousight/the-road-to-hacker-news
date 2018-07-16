import React, { Component } from 'react';
import './App.css';

import Search from './components/Search'
import Table from './components/Table'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      list: [
        {
          title: 'React',
          url: 'https://facebook.github.io/react/',
          author: 'Jordan Walke',
          num_comments: 3,
          points: 4,
          objectID: 0,
        },
        {
          title: 'Redux',
          url: 'https://github.com/reactjs/redux',
          author: 'Dan Abramov, Andrew Clark',
          num_comments: 2,
          points: 5,
          objectID: 1,
        }
      ]
    }

    this.onSearchChange = this.onSearchChange.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  onDismiss(id) {
    this.setState({ list: this.state.list.filter(item => item.objectID !== id) });
  }

  render() {
    const { searchTerm, list } = this.state;

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}>
            Search
        </Search>

          <Table
            list={list}
            pattern={searchTerm}
            onDismiss={this.onDismiss} />
        </div>
      </div>
    );
  }
}

export default App;
