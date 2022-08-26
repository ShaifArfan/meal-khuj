import React from 'react';
import classes from './Title.module.scss';

function Title({ children, className, variant = 'primary' }) {
  return (
    <h2 className={`${classes.title} ${className} ${classes[`title__${variant}`]}`}>{children}</h2>
  );
}

export default Title;
