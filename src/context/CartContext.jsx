import {

  createContext,
  useContext,
  useState,

} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartItems, setCartItems] =
    useState([]);

  // Add To Cart
  const addToCart = (item) => {

    const existingItem = cartItems.find(

      (cartItem) =>
        cartItem.id === item.id
    );

    if (existingItem) {

      setCartItems(

        cartItems.map((cartItem) =>

          cartItem.id === item.id

            ? {

                ...cartItem,

                quantity:
                  cartItem.quantity + 1,
              }

            : cartItem
        )
      );

    } else {

      setCartItems([

        ...cartItems,

        {
          ...item,
          quantity: 1,
        },
      ]);
    }
  };

  // Remove
  const removeFromCart = (id) => {

    setCartItems(

      cartItems.filter(
        (item) => item.id !== id
      )
    );
  };

  // Increase Quantity
  const increaseQuantity = (id) => {

    setCartItems(

      cartItems.map((item) =>

        item.id === id

          ? {

              ...item,

              quantity:
                item.quantity + 1,
            }

          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {

    setCartItems(

      cartItems.map((item) =>

        item.id === id

          ? {

              ...item,

              quantity:

                item.quantity > 1

                  ? item.quantity - 1

                  : 1,
            }

          : item
      )
    );
  };

  // Clear Cart
  const clearCart = () => {

    setCartItems([]);
  };

  // Total Price
  const totalPrice = cartItems.reduce(

    (total, item) =>

      total +
      item.price * item.quantity,

    0
  );

  return (

    <CartContext.Provider
      value={{

        cartItems,

        addToCart,

        removeFromCart,

        increaseQuantity,

        decreaseQuantity,

        clearCart,

        totalPrice,
      }}
    >

      {children}

    </CartContext.Provider>
  );
}

export function useCart() {

  return useContext(CartContext);
}