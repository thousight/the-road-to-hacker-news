import React from 'react'
import PropTypes from 'prop-types'

const Search = ({ value, onChange, onSubmit, children }) => (
    <form onSubmit={onSubmit}>
        <input
            placeholder={children}
            type="text"
            value={value}
            onChange={onChange} />
        <button type="submit">
            {children}
        </button>
    </form>
)

Search.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    children: PropTypes.node
}

export default Search