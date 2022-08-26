import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Categories from '../components/category/Categories';
import SearchBar from '../components/mealsPage/SearchBar';
import SingleMealCard from '../components/mealsPage/SingleMealCard';
import PointText from '../components/text/PointText';
import classes from './meals.module.scss';

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
    data: categories, isLoading: isCategoryLoading, isError: isCategoryError, error: categoryError,
  } = useQuery('catagories', getCategories);

  const {
    data: queriedData, isLoading: queryLoading, isError: queryError,
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
        isCategoryLoading={isCategoryLoading}
        isCategoryError={isCategoryError}
        categoryError={categoryError}
        setQuery={setQuery}
      />
      {isLoading ? <div>Loading...</div> : null}
      <div className={classes.meals__container}>
        { !isLoading && !isError
        && data && data.map((meal) => (
          <SingleMealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
      <div className={classes.meals__container}>
        { !queryLoading && !queryError
        && queriedData && queriedData.map((meal) => (
          <SingleMealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}

export default Meals;
