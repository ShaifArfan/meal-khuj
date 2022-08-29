import React from 'react';
import Text from '../text/Text';
import Title from '../text/Title';
import classes from './IngredientsTable.module.scss';

function IngredientsTable({ ingredientsWithMeasures }) {
  return (
    <>
      <Title className={classes.title}>Ingredients</Title>
      <table className={classes.ingredientsTable}>
        <tbody>
          {ingredientsWithMeasures.map((ingredient) => (
            <tr key={ingredient.index}>
              <td>
                <Text>
                  {ingredient.ingredient}
                </Text>
              </td>
              <td>
                <Text>
                  {ingredient.measure}
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default IngredientsTable;
