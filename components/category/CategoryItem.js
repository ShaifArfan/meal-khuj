import clsx from 'clsx';
import React from 'react';
import classes from './CategoryItem.module.scss';

function CategoryItem({ category, selectedCategory, onClickHandler }) {
  const isSelected = category.strCategory === selectedCategory;

  return (
    <button
      type="button"
      className={clsx(classes.item, isSelected && classes.item__selected)}
      onClick={onClickHandler}
    >
      {category.strCategory}

    </button>
  );
}

export default CategoryItem;
