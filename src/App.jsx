import React, { Component } from "react"
import axios from "axios"
import { uniqBy } from 'lodash'
import { Layout, Row, Col, notification, BackTop } from "antd"

import "./styles/App.css"

import Search from "./components/Search"
import Table from "./components/Table"
import {
  HACKERNEWS_API_PATH,
  HACKERNEWS_API_SEARCH_RECENT
} from "./constants/strings"
import { HACKERNEWS_API_SEARCH_RESULT_COUNT } from "./constants/numbers"
import Logo from './img/Logo.svg'

class App extends Component {
  state = {
    searchTerm: '',
    searchKey: '',
    searchBy: HACKERNEWS_API_SEARCH_RECENT,
    result: {},
    isLoading: false
  }
  onSearchChange = this.onSearchChange.bind(this)
  onSearchSubmit = this.onSearchSubmit.bind(this)
  onSortSelect = this.onSortSelect.bind(this)
  onDismiss = this.onDismiss.bind(this)
  setSearchNewsResult = this.setSearchNewsResult.bind(this)
  handleHackerNewsFetch = this.handleHackerNewsFetch.bind(this)

  componentDidMount() {
    this.handleHackerNewsFetch()
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  onSearchSubmit(event) {
    event.preventDefault()
    const { searchTerm, result, searchBy } = this.state
    const key = searchBy + searchTerm

    this.setState(
      {
        searchKey: searchTerm
      },
      () => {
        if (!result[key]) {
          this.handleHackerNewsFetch()
        }
      }
    )
  }

  onSortSelect(searchBy) {
    const { searchKey, result } = this.state
    const key = searchBy + searchKey

    this.setState({ searchBy }, () => {
      if (!result[key]) {
        this.handleHackerNewsFetch()
      }
    })
  }

  onDismiss(id) {
    const { result, searchKey, searchBy } = this.state
    const key = searchBy + searchKey

    this.setState(
      {
        result: {
          ...result,
          [key]: {
            ...result[key],
            hits: result[key].hits.filter(item => item.objectID !== id)
          }
        }
      },
      () => {
        notification.warning({
          message: "Dismiss success",
          description: `You've dismissed a message from the list.`,
          duration: 2.5
        })
      }
    )
  }

  setSearchNewsResult(result) {
    const { searchKey, searchBy } = this.state
    const key = searchBy + searchKey

    if (this.state.result[key]) {
      // If searchKey already exist
      this.setState({
        result: {
          ...this.state.result,
          [key]: {
            ...result,
            hits: uniqBy(this.state.result[key].hits.concat(result.hits), 'objectID')
          }
        }
      }, () => this.setState({ isLoading: false }))
    } else {
      // If this is a new search key
      this.setState({
        result: {
          ...this.state.result,
          [key]: result
        }
      }, () => this.setState({ isLoading: false }))
    }
  }

  handleHackerNewsFetch() {
    const { searchKey, result, searchBy } = this.state
    const key = searchBy + searchKey

    this.setState({ isLoading: true }, () => {
      axios.get(`${HACKERNEWS_API_PATH}${searchBy}?query=${searchKey}&page=${result[key] ? ++result[key].page : 0}&hitsPerPage=${HACKERNEWS_API_SEARCH_RESULT_COUNT}&tags=story`)
        .then(res => {
          if (!result[key] || res.data.page === result[key].page) {
            this.setSearchNewsResult(res.data)
          }
        })
        .catch(error => {
          console.log(error)
          notification.error({
            message: "Something wrong happened",
            description: error.message
              ? error.message
              : "Please check the console for the error",
            duration: 3
          })
        })
    })
  }

  render() {
    const { searchTerm, searchKey, result, searchBy, isLoading } = this.state
    const data = result[searchBy + searchKey]

    return (
      <Layout className="page">
        <Layout.Header>
          <BackTop />
          <Row>
            <Col xs={2} md={4}>
              <img className="logo" src={Logo} alt="Logo" />
            </Col>
            <Col xs={20} md={16}>
              <Search
                value={searchTerm}
                isLoading={isLoading}
                onSortSelect={this.onSortSelect}
                onSubmit={this.onSearchSubmit}
                onChange={this.onSearchChange} />
            </Col>
          </Row>
        </Layout.Header>

        <Layout.Content>
          <Row>
            <Col xs={24}>
              {
                data && data.hits ?
                  <Table list={data.hits}
                    onBottomVisible={this.handleHackerNewsFetch}
                    isAtEnd={data.nbPages <= 0 || data.nbPages - 1 === data.page}
                    searchBy={searchBy} />
                  :
                  null
              }
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    )
  }
}

export default App
