import { createContext, useReducer } from "react";

const INITIAL = {
  cart: [],
};

export const CartContext = createContext(INITIAL);

export const CartReducer = (state, action) => {
  const { cart } = state;
  const { payload } = action;
  switch (action.type) {
    case "ADD":
      return {
        cart: [...cart, payload],
      };
    case "DELETE":
      const newCart = cart.filter((item) => item._id !== payload);
      return {
        cart: newCart,
      };
    case "CLEAR":
      return INITIAL;
    default:
      return state;
  }
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, INITIAL);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
