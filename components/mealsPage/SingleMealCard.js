import Image from 'next/image';
import React from 'react';
import Title from '../text/Title';
import classes from './SingleMealCard.module.scss';

function SingleMealCard({ meal }) {
  return (
    <div className={classes.item}>
      <Image src={meal.strMealThumb} height="200" width="300" />
      <Title className={classes.title} variant="secondary">{meal.strMeal}</Title>
    </div>
  );
}

export default SingleMealCard;
