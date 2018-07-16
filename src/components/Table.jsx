import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'

import Button from './Button'

const Table = ({ list, onDismiss, onBottomVisible }) => (
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
        <VisibilitySensor onChange={isVisible => isVisible ? onBottomVisible() : null} />
    </div>
)

export default Table