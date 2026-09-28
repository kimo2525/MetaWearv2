import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { createAction } from "../../utils/reducer/reducer.utils";

import { getCategoriesAndProducts, getProductBySlug } from "../../utils/supabase/supabase.utils";

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray,
  );

export const fetchCategoriesFailure = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

export const fetchCategoriesStartAsync = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const categoriesArray = await getCategoriesAndProducts();
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error));
    }
  };
};

export const fetchProductStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_PRODUCT_START);

export const fetchProductSuccess = (product) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_PRODUCT_SUCCESS, product);

export const fetchProductFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_PRODUCT_FAILED, error);

export const fetchProductAsync = (productSlug) => {
  return async (dispatch) => {
    dispatch(fetchProductStart());

    try {
      const product = await getProductBySlug(productSlug);

      dispatch(fetchProductSuccess(product));
    } catch (error) {
      dispatch(fetchProductFailed(error));
    }
  };
};
