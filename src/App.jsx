import React, { Component } from 'react'
import axios from 'axios'
import './styles/App.css'

import Search from './components/Search'
import Table from './components/Table'
import { HACKERNEWS_API_PATH } from './constants/strings'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      result: {
        hits: []
      }
    }

    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)    
    this.onDismiss = this.onDismiss.bind(this)
    this.setSearchNewsResult = this.setSearchNewsResult.bind(this)
    this.handleHackerNewsFetch = this.handleHackerNewsFetch.bind(this)
  }

  componentDidMount() {
    this.handleHackerNewsFetch()
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  onSearchSubmit(event) {
    event.preventDefault()
    this.handleHackerNewsFetch(this.state.searchTerm)
  }

  onDismiss(id) {
    this.setState({
      result: {
        ...this.state.result,
        hits: this.state.result.hits.filter(item => item.objectID !== id)
      }
    })
  }

  setSearchNewsResult(result) {
    this.setState({ result })
  }

  handleHackerNewsFetch() {
    let { searchTerm } = this.state
    if (searchTerm && searchTerm.length > 0) {
      axios.get(`${HACKERNEWS_API_PATH}/search?query=${searchTerm}`)
      .then(res => {
        this.setSearchNewsResult(res.data)
      })
      .catch(error => {
        console.log(error.response)
      })
    } else {
      this.setSearchNewsResult(null)
    }
  }

  render() {
    const { searchTerm, result } = this.state

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onSubmit={this.onSearchSubmit}
            onChange={this.onSearchChange}>
            Search
          </Search>

          {
            result && result.hits
              ?
              <Table
                list={result.hits}
                onDismiss={this.onDismiss} />
              : 
              null
          }

        </div>
      </div>
    )
  }
}

export default App
