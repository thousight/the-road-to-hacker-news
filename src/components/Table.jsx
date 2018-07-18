import React, { Component } from "react"
import VisibilitySensor from "react-visibility-sensor"
import { PulseLoader } from "react-spinners"
import PropTypes from "prop-types"
import { Table, Icon } from "antd"

import "../styles/Table.css"

import { primaryOrange } from "../constants/colors"

class ResultsTable extends Component {

  columns = [
    {
      title: this.renderHeaderTitle('Title', 'file-text'),
      dataIndex: 'title',
      key: 'title',
      width: '40%',
      render: (title, item) => <a href={item.url} target="_blank">{title}</a>
    }, {
      title: this.renderHeaderTitle('Author', 'user'),
      dataIndex: 'author',
      key: 'author',
      width: '20%'
    }, {
      title: this.renderHeaderTitle('Points', 'like-o'),
      dataIndex: 'points',
      key: 'points',
      width: '15%'
    }, {
      title: this.renderHeaderTitle('Comments', 'message'),
      dataIndex: 'num_comments',
      key: 'num_comments',
      width: '15%'
    }
  ]

  renderHeaderTitle(title, icon) {
    return (
      <div className="table-header">
        <Icon type={icon} />
        <span>{title}</span>
      </div>
    )
  }

  render() {
    const { list, onBottomVisible, isAtEnd } = this.props

    return (
      <div className="table">
        <Table columns={this.columns}
          dataSource={list}
          rowKey="objectID"
          pagination={false} />

        <div className="loading-spinner-wrapper">
          <VisibilitySensor
            active={!isAtEnd}
            onChange={isVisible => (isVisible ? onBottomVisible() : null)}
          >
            {isAtEnd ? (
              <p>All results are loaded</p>
            ) : (
                <PulseLoader color={primaryOrange} />
              )}
          </VisibilitySensor>
        </div>
      </div>
    )
  }
}

ResultsTable.propTypes = {
  list: PropTypes.array.isRequired,
  onBottomVisible: PropTypes.func.isRequired,
  isAtEnd: PropTypes.bool.isRequired
}

export default ResultsTable
