import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function App() {
  const [cart, setCart] = useState([]);
  const addToCart = (food) => {
    const existing = cart.find((item) => item.id === food.id);

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }
  };
  const displayCart = () => {
    return cart.map((item) => (
      <Text key={item.id}>
        {item.name} - Qty: {item.quantity}
      </Text>
    ));
  };
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    const item = cart.find((i) => i.id === id);

    if (item.quantity === 1) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map((i) =>
          i.id === id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
      );
    }
  };
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <View style={{ marginTop: 50, padding: 20 }}>
      <Text>CRUD Sample</Text>

      <TouchableOpacity
        onPress={() =>
          addToCart({
            id: 1,
            name: "Burger",
            price: 120,
          })
        }
      >
        <Text>Add Burger</Text>
      </TouchableOpacity>

      {displayCart()}
    </View>
  );
}