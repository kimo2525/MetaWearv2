import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen,
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems,
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => {
    if (!cartItems) {
      return 0;
    }
    cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0,
    );
  },
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => {
    if (!cartItems) {
      return 0;
    }
    return cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
  },
);
