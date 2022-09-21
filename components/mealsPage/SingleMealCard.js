import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Title from '../text/Title';
import classes from './SingleMealCard.module.scss';

function SingleMealCard({ meal }) {
  return (
    <Link href={`/meals/${meal.idMeal}`}>
      <a className={classes.item}>
        <Image src={meal.strMealThumb} height="200" width="300" alt={meal.strMeal} />
        <Title className={classes.title} variant="secondary">{meal.strMeal}</Title>
      </a>
    </Link>
  );
}

export default SingleMealCard;
