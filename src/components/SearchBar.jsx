import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('meals'); // Default to meals

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query, type);
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="meals">Meals</option>
                    <option value="cocktails">Cocktails</option>
                </select>
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchBar;
