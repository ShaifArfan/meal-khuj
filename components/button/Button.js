import React from 'react';
import classes from './Button.module.scss';

function Button({ children, variant = 'secondary' }) {
  return (
    <button
      type="button"
      className={`${classes.button} ${classes[`variant__${variant}`]}`}
    >
      {children}

    </button>
  );
}

export default Button;
