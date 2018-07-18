import React from "react"
import PropTypes from "prop-types"
import { Button } from "antd"

const DismissButton = ({ onClick, className = "" }) => (
  <Button className={className}
    type="danger"
    shape="circle"
    icon="close"
    onClick={onClick} />
)

DismissButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
}

export default DismissButton
