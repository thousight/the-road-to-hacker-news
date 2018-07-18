import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { PulseLoader } from 'react-spinners'
import PropTypes from 'prop-types'
import { Icon } from 'antd'

import '../styles/Table.css'

import DismissButton from './DismissButton'
import { primaryBlue } from '../constants/colors'

const Table = ({ list, onDismiss, onBottomVisible, isAtEnd }) => (
    <div className="table">
        {list.map(item =>
            <div key={item.objectID} className="table-row">
                <span style={{ width: '40%' }}>
                    <a href={item.url}>{item.title}</a>
                </span>
                <span style={{ width: '30%' }}>
                    {item.author}
                </span>
                <span style={{ width: '10%' }}>
                    {item.num_comments}
                </span>
                <span style={{ width: '10%' }}>
                    {item.points}
                </span>
                <span style={{ width: '10%' }}>
                    <DismissButton onClick={() => onDismiss(item.objectID)}>
                        <Icon type="close" />
                    </DismissButton>
                </span>

            </div>
        )}

        <div className="loading-spinner-wrapper">
            <VisibilitySensor
                active={!isAtEnd}
                onChange={isVisible => isVisible ? onBottomVisible() : null}>
                {
                    isAtEnd ?
                        <p>All results are loaded</p>
                        :
                        <PulseLoader color={primaryBlue} />
                }
            </VisibilitySensor>
        </div>
    </div>
)

Table.propTypes = {
    list: PropTypes.array.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onBottomVisible: PropTypes.func.isRequired,
    isAtEnd: PropTypes.bool.isRequired
}

export default Table