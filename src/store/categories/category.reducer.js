import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,

  currentProduct: null,
  isProductLoading: false,
  productError: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {},
) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, isLoading: false, categories: payload };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, isLoading: false, error: payload };

    case CATEGORIES_ACTION_TYPES.FETCH_PRODUCT_START:
      return {
        ...state,
        currentProduct: null,
        isProductLoading: true,
        productError: null,
      };

    case CATEGORIES_ACTION_TYPES.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        currentProduct: payload,
        isProductLoading: false,
        productError: null,
      };

    case CATEGORIES_ACTION_TYPES.FETCH_PRODUCT_FAILED:
      return {
        ...state,
        currentProduct: null,
        isProductLoading: false,
        productError: payload,
      };

    default:
      return state;
  }
};
