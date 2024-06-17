import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { getIngredientsSelector } from '../../services/slices/ingredientsSlice';
import { useSelector } from '../../services/store';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>();
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);

  const ingredientData =
    ingredients.find((ingredient) => ingredient._id === id) || null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
