import React from 'react';
import Text from './Text';
import classes from './PointText.module.scss';

function PointText({ children, className }) {
  return (
    <div className={`${classes.pointText} ${className}`}>
      <div className={classes.circle} />
      <Text className={classes.text}>{children}</Text>
    </div>
  );
}

export default PointText;
