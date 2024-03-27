import React, { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import RecipeDetails from './components/RecipeDetails';
import RandomButton from './components/RandomButton';
import useFetch from './hooks/useFetch';
import './App.css'

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('meals');

  const mealUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  const cocktailUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`;


  const { data: cocktailData, loading: cocktailLoading, error: cocktailError } = useFetch(
    type === 'cocktails' ? cocktailUrl : ''
  );
  const { data: mealData, loading: mealLoading, error: mealError } = useFetch(
    type === 'meals' ? mealUrl : ''
  );

  

  const handleSearch = (query, type) => {
    setSelectedRecipe(null)
    setQuery(query);
    setType(type);
    if (type === 'meals' && mealData) {
      setSearchResults(mealData.meals);
    } else if (type === 'cocktails' && cocktailData) {
      setSearchResults(cocktailData.drinks);
    }
  };

  const handleRecipeSelect = (id) => {
    const result = searchResults.find((result) => (type == 'meals' ? result.idMeal : result.idDrink) === id);
    console.log(result)
    setSelectedRecipe(result);
  };

  const handleRandom = async () => {
    let randomUrl;
    if (type === 'meals') {
      randomUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
    } else if (type === 'cocktails') {
      randomUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    }

    try {
      const response = await fetch(randomUrl);
      if (!response.ok) {
        throw new Error('Error fetching random data');
      }

      const data = await response.json();

      if (type === 'meals') {
        console.log(data.meals);
        setSelectedRecipe(data.meals[0]);
      } else if (type === 'cocktails') {
        setSelectedRecipe(data.drinks[0]);
      }
    } catch (error) {
      console.error('Error fetching random:', error.message);
    }
  };




  return (
    <div className='container'>
      <div className="search-area">
        <SearchBar
          query={query}
          setQuery={setQuery}
          type={type}
          setType={setType}
          onSearch={handleSearch}
        />
        <RandomButton onClick={handleRandom} />
      </div>
      {(mealLoading || cocktailLoading) && <div className='loading'></div>}
      {type == 'meals' ? (mealError && <div>{mealError.message}</div>) : (cocktailError && <div>{cocktailError.message}</div>)}
      {selectedRecipe && <RecipeDetails type={type} recipe={selectedRecipe} />}
      <SearchResults results={searchResults} type={type} onSelect={handleRecipeSelect} />
    </div>
  );
};

export default App;
