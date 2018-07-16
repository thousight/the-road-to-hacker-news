import React from 'react'

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

export default Search