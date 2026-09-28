import { createSelector } from "reselect";

// import DC_SHOP_DATA2 from "../../DC_SHOP_DATA2";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories,
);

export const selectCurrentProduct = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.currentProduct,
);

export const selectIsProductLoading = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.isProductLoading,
);

export const selectProductError = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.productError,
);
// export const selectCategories = createSelector(
//   [selectCategoryReducer],
//   (categoriesSlice) => DC_SHOP_DATA2,
// );

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items.splice(0, 5);
      return acc;
    }, {}),
);

// export const selectCategoriesMap = createSelector(
//   [selectCategories],
//   (categories) =>
//     categories.reduce((acc, category) => {
//       const { title, items } = category;
//       acc[title.toLowerCase()] = items.splice(0, 5);
//       return acc;
//     }, {}),
// );

export const selectIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading,
);
