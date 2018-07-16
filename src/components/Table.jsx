import React, { Component } from 'react';

import Button from './Button'

export default class Table extends Component {

    isSearched(searchTerm) {
        return function (item) {
            return item.title.toLowerCase().includes(searchTerm.toLowerCase());
        }
    }

    render() {
        const { list, pattern, onDismiss } = this.props;
        return (
            <div className="table">
                {list.filter(this.isSearched(pattern)).map(item =>
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
            </div>
        )
    }
}