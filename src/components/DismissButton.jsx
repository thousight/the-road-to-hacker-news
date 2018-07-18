import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

const DismissButton = ({ onClick, className = '', children }) => (
  <Button type="danger"
    shape="circle"
    onClick={onClick}
    className={className}>
    {children}
  </Button>
)

DismissButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export default DismissButton
