import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { PulseLoader } from 'react-spinners'

import '../styles/Table.css'

import Button from './Button'
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
                    <Button onClick={() => onDismiss(item.objectID)}
                        className="button-inline">
                        Dismiss
                        </Button>
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

export default Table