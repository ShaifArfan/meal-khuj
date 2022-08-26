import React from 'react';
import classes from './Text.module.scss';

function Text({ children, className }) {
  return (
    <p className={`${classes.text} ${className}`}>{children}</p>
  );
}

export default Text;
