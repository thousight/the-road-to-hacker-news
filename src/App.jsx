import React, { Component } from 'react'
import axios from 'axios'
import { notification } from 'antd'

import './styles/App.css'

import Search from './components/Search'
import Table from './components/Table'
import { HACKERNEWS_API_PATH } from './constants/strings'
import { HACKERNEWS_API_SEARCH_RESULT_COUNT } from './constants/numbers'

class App extends Component {

  state = {
    searchTerm: '',
    searchKey: '',
    result: {},
    sortKey: 'DEFAULT'
  }
  onSearchChange = this.onSearchChange.bind(this)
  onSearchSubmit = this.onSearchSubmit.bind(this)
  onSort = this.onSort.bind(this)
  onDismiss = this.onDismiss.bind(this)
  setSearchNewsResult = this.setSearchNewsResult.bind(this)
  handleHackerNewsFetch = this.handleHackerNewsFetch.bind(this)

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  onSearchSubmit(event) {
    event.preventDefault()
    const { searchTerm, result } = this.state

    this.setState({
      searchKey: searchTerm
    }, () => {
      if (!result[searchTerm]) {
        this.handleHackerNewsFetch()
      }
    })
  }

  onSort(sortKey) {
    this.setState({ sortKey });
  }

  onDismiss(id) {
    const { result, searchKey } = this.state

    this.setState({
      result: {
        ...result,
        [searchKey]: {
          ...result[searchKey],
          hits: result[searchKey].hits.filter(item => item.objectID !== id)
        }
      }
    }, () => {
      notification.warning({
        message: 'Dismiss success',
        description: `You've dismissed a message from the list.`,
        duration: 2.5
      })
    })
  }

  setSearchNewsResult(result) {
    const { searchKey } = this.state

    if (this.state.result[searchKey]) {
      // If searchKey already exist
      this.setState({
        result: {
          ...this.state.result,
          [this.state.searchKey]: {
            ...result,
            hits: this.state.result[this.state.searchKey].hits.concat(result.hits),
          }
        }
      })
    } else {
      // If this is a new search key
      this.setState({
        result: {
          ...this.state.result,
          [this.state.searchKey]: result
        }
      })
    }
  }

  handleHackerNewsFetch() {
    const { searchKey, result } = this.state

    if (searchKey && searchKey.length > 0) {
      axios.get(`${HACKERNEWS_API_PATH}/search?query=${searchKey}&page=${result[searchKey] ? ++result[searchKey].page : 0}&hitsPerPage=${HACKERNEWS_API_SEARCH_RESULT_COUNT}`)
        .then(res => {
          if (!result[searchKey] || res.data.page === result[searchKey].page) {
            this.setSearchNewsResult(res.data)
          }
        })
        .catch(error => {
          console.log(error)
          notification.error({
            message: 'Something wrong happened',
            description: error.message ? error.message : 'Please check the console for the error',
            duration: 3
          })
        })
    } else {
      this.setSearchNewsResult({})
    }
  }

  render() {
    const { searchTerm, searchKey, result, sortKey } = this.state
    let data = result[searchKey]

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
            result && data && data.hits
              ?
              <Table
                list={data.hits}
                onBottomVisible={this.handleHackerNewsFetch}
                isAtEnd={data.nbPages <= 0 || (data.nbPages - 1) === data.page}
                sortKey={sortKey}
                onSort={this.onSort}
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
