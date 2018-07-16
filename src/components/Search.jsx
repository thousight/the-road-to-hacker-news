import React from 'react';

const Search = ({ value, onChange, children }) => {
    return (
        <form>
            {children}:{' '}
            <input
                type="text"
                value={value}
                onChange={onChange}
            />
        </form>
    );
}

export default Search