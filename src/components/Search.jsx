import React, { Component } from "react"
import PropTypes from "prop-types"
import { Button, Select, Input } from "antd"

import "../styles/Search.css"

import {
  HACKERNEWS_API_SEARCH_RELEVANCE,
  HACKERNEWS_API_SEARCH_RECENT
} from "../constants/strings"

class Search extends Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus()
    }
  }

  render() {
    const { value, onSortSelect, onChange, onSubmit } = this.props

    return (
      <form className="search-group-center" onSubmit={onSubmit}>
        <Input.Group compact >
          <Select
            defaultValue={HACKERNEWS_API_SEARCH_RELEVANCE}
            onChange={value => onSortSelect(value)} >
            <Select.Option value={HACKERNEWS_API_SEARCH_RELEVANCE} >
              Relevance
            </Select.Option>
            <Select.Option value={HACKERNEWS_API_SEARCH_RECENT} >
              Recent
            </Select.Option>
          </Select>
          <Input className="search-input"
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search with Hacker News powered by Algolia"
            ref={node => (this.input = node)} />
          <Button icon="search" type="primary" />
        </Input.Group>
      </form>
    )
  }
}

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onSortSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Search
