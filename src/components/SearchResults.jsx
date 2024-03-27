import React from 'react';

const SearchResults = ({ results, type, onSelect }) => {
  return (
    <div className='search-results'>
      {results.map((result) => (
        <div className="result-item" key={type === 'meals' ? result.idMeal : result.idDrink} onClick={() => onSelect(type === 'meals' ? result.idMeal : result.idDrink)}>
          {result[type === 'meals' ? 'strMealThumb' : 'strDrinkThumb'] && <img className="result-image" src={result[type === 'meals' ? 'strMealThumb' : 'strDrinkThumb']} alt={result[type === 'meals' ? 'strMeal' : 'strDrink']} />}
          <h3 className="result-name">{result[type === 'meals' ? 'strMeal' : 'strDrink']}</h3>
          <p><b>Origin : </b>{result.strArea}</p>
          <p><b>Category</b> : {result.strCategory}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
