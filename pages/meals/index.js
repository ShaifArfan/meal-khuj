import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import BeatLoader from 'react-spinners/BeatLoader';
import Categories from '../../components/category/Categories';
import SearchBar from '../../components/mealsPage/SearchBar';
import SingleMealCard from '../../components/mealsPage/SingleMealCard';
import PointText from '../../components/text/PointText';
import Text from '../../components/text/Text';
import classes from './meals.module.scss';

const override = {
  display: 'inline-block',
  margin: '0 auto',
};

const getMeals = async ({ queryKey }) => {
  const { data } = await axios.get(`filter.php?c=${queryKey[1]}`);
  return data?.meals || [];
};

const getQueriedMeals = async ({ queryKey }) => {
  const { data } = await axios.get(`search.php?s=${queryKey[1]}`);
  return data?.meals || [];
};

const getCategories = async () => {
  const { data } = await axios.get('/categories.php');
  return data.categories;
};

function Meals() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');

  const {
    data: categories, isLoading: categoryIsLoading, isError: categoryIsError, error: categoryError,
  } = useQuery(['catagories'], getCategories);

  const {
    data: queriedData, isLoading: queryIsLoading, isError: queryError,
  } = useQuery(['mealsByQuery', query], getQueriedMeals, {
    enabled: query !== '',
  });

  const {
    data, isLoading, isError,
  } = useQuery(['mealsByCategory', selectedCategory], getMeals, {
    enabled: query === '',
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchText) {
        setQuery(searchText);
        setSelectedCategory('');
      } else {
        setQuery('');
        if (categories) {
          setSelectedCategory(categories[0].strCategory);
        }
      }
    }, 300);
    return () => {
      setQuery('');
      clearTimeout(timeout);
    };
  }, [searchText, categories]);

  useEffect(() => {
    if (categories) {
      setSelectedCategory(categories[0].strCategory);
    }
  }, [categories]);

  return (
    <div className={classes.meals__page}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <PointText className={classes.text}>search meals or select categories from below.</PointText>

      <Categories
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        categories={categories}
        categoryIsLoading={categoryIsLoading}
        categoryIsError={categoryIsError}
        categoryError={categoryError}
        setQuery={setQuery}
      />

      {isLoading || categoryIsLoading ? (
        <div className={classes.loadingSpinner}>
          <BeatLoader color="#fff" loading={isLoading || categoryIsLoading} cssOverride={override} size={20} />
        </div>
      ) : null}

      <div className={classes.meals__container}>
        { !isLoading && !isError
        && data && data.map((meal) => (
          <SingleMealCard key={meal.idMeal} meal={meal} />
        ))}
        { !queryIsLoading && !queryError
        && queriedData && queriedData.map((meal) => (
          <SingleMealCard key={meal.idMeal} meal={meal} />
        ))}
        {data && queriedData && data.length === 0 && queriedData.length === 0 && (
          <Text>No meals found</Text>
        )}
      </div>
    </div>
  );
}

export default Meals;
