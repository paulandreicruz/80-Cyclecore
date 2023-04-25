import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    let existingCart = localStorage.getItem("cart");
    if (existingCart) setCart(JSON.parse(existingCart));
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
//const [auth, setauth] = useAuth();

export { useCart, CartProvider };

// import { useState, createContext, useContext, useEffect } from "react";

// const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     let existingCart = localStorage.getItem("cart");
//     if (existingCart) setCart(JSON.parse(existingCart));
//   }, []);

//   const addToCart = (item) => {
//     // Check if item is already in cart
//     const existingItem = cart.find((cartItem) => cartItem.id === item.id);

//     if (existingItem) {
//       // If item already exists in cart, update the quantity
//       const updatedCart = cart.map((cartItem) => {
//         if (cartItem.id === item.id) {
//           return { ...cartItem, quantity: cartItem.quantity + 1 };
//         } else {
//           return cartItem;
//         }
//       });
//       setCart(updatedCart);
//     } else {
//       // If item doesn't exist in cart, add it to cart with a quantity of 1
//       const updatedCart = [...cart, { ...item, quantity: 1 }];
//       setCart(updatedCart);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// const useCart = () => useContext(CartContext);

// export { useCart, CartProvider };

// import { useState, createContext, useContext, useEffect } from "react";

// const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     let existingCart = localStorage.getItem("cart");
//     if (existingCart) setCart(JSON.parse(existingCart));
//   }, []);

//   const addToCart = (item) => {
//     // Check if item is already in cart
//     const existingItem = cart.find((cartItem) => cartItem.id === item.id);

//     if (existingItem) {
//       // If item already exists in cart, update the quantity
//       const updatedCart = cart.map((cartItem) => {
//         if (cartItem.id === item.id) {
//           return { ...cartItem, quantity: cartItem.quantity + 1 };
//         } else {
//           return cartItem;
//         }
//       });
//       setCart(updatedCart);
//     } else {
//       // If item doesn't exist in cart, add it to cart with a quantity of 1
//       const updatedCart = [...cart, { ...item, quantity: 1 }];
//       setCart(updatedCart);
//     }
//   };

//   return (
//     <CartContext.Provider value={[cart, addToCart, setCart]}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// const useCart = () => useContext(CartContext);

// export { useCart, CartProvider };
