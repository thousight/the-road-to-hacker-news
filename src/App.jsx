import React, { Component } from 'react'
import axios from 'axios'
import './styles/App.css'

import Search from './components/Search'
import Table from './components/Table'
import { HACKERNEWS_API_PATH } from './constants/strings'
import { HACKERNEWS_API_SEARCH_RESULT_COUNT } from './constants/numbers'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      result: [],
      page: 0,
      isAtEnd: false
    }

    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)    
    this.onDismiss = this.onDismiss.bind(this)
    this.setSearchNewsResult = this.setSearchNewsResult.bind(this)
    this.handleHackerNewsFetch = this.handleHackerNewsFetch.bind(this)
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value, page: 0 })
  }

  onSearchSubmit(event) {
    event.preventDefault()
    this.setState({ result: [] }, () => {
      this.handleHackerNewsFetch(this.state.searchTerm)
    })
  }

  onDismiss(id) {
    this.setState({
      result: this.state.result.filter(item => item.objectID !== id)
    })
  }

  setSearchNewsResult(result, page, isAtEnd) {
    this.setState({ result: this.state.result.concat(result), page, isAtEnd })
  }

  handleHackerNewsFetch() {
    let { searchTerm, page } = this.state
    if (searchTerm && searchTerm.length > 0) {
      axios.get(`${HACKERNEWS_API_PATH}/search?query=${searchTerm}&page=${page}&hitsPerPage=${HACKERNEWS_API_SEARCH_RESULT_COUNT}`)
      .then(res => {
        this.setSearchNewsResult(res.data.hits, ++page, res.data.nbPages <= 0)
      })
      .catch(error => {
        console.log(error.response)
      })
    } else {
      this.setSearchNewsResult(null, 0)
    }
  }

  render() {
    const { searchTerm, result, isAtEnd } = this.state

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
            result && result.length > 0
              ?
              <Table
                list={result}
                onBottomVisible={this.handleHackerNewsFetch}
                isAtEnd={isAtEnd}
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
