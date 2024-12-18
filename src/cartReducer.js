import { ADD_TO_CART, REMOVE_FROM_CART, CALCULATE_TOTAL } from "./actions.js";
const initialState = { products: {}, cartTotal: 0 };

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const productId = action.payload.id;
      return {
        products: {
          ...state.products,
          [productId]: {
            product: action.payload,
            quantity: (state.products[productId]?.quantity || 0) + 1,
          },
        },
        cartTotal: state.cartTotal + action.payload.price,
      };
    case REMOVE_FROM_CART:
      return {
        products: Object.keys(state.products).reduce((acc, curr) => {
          if (curr != action.payload.product.id) {
            acc[curr] = state.products[curr];
          }
          return acc;
        }, {}),
        cartTotal:
          state.cartTotal -
          action.payload.product.price * action.payload.quantity,
      };
    case CALCULATE_TOTAL:
      return {
        products: state.products,
        cartTotal: state.products.reduce((acc, curr) => acc + curr.price, 0),
      };
    default:
      return state;
  }
};
