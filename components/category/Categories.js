import React from 'react';
import CategoryItem from './CategoryItem';
import classes from './Categories.module.scss';

export default function Categories({
  setSelectedCategory,
  selectedCategory,
  isCategoryLoading,
  isCategoryError,
  categoryError,
  categories,
  setQuery,
}) {
  if (isCategoryLoading) {
    return <div>Loading...</div>;
  }
  if (isCategoryError) {
    return (
      <div>
        Error:
        {categoryError.message}
      </div>
    );
  }

  return (
    <div className={classes.categories__container}>
      {categories.map((item) => (
        <CategoryItem
          key={item.idCategory}
          category={item}
          onClickHandler={() => {
            setSelectedCategory(item.strCategory);
            setQuery('');
          }}
          selectedCategory={selectedCategory}
        />
      ))}
    </div>
  );
}
