import { useState } from 'react';

interface CartItem {
  id: number;
  imageSrc: string;
  name: string;
  price: string;
}

interface CartItemInfo {
  cantidad: number;
  precioTotal: number;
}

function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(item: CartItem) {
    setCartItems([...cartItems, item]);
  }

  function removeFromCart(itemId: number) {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  }

  function contarCantidadYPrecioTotal(): Record<number, CartItemInfo> {
    const precioPorItemId: Record<number, number> = {};
    const cantidadPorItemId: Record<number, number> = {};

    cartItems.forEach((item) => {
      const itemId = item.id;
      const precio = parseFloat(item.price.replace('$', ''));

      if (cantidadPorItemId[itemId]) {
        cantidadPorItemId[itemId] += 1;
        precioPorItemId[itemId] += precio;
      } else {
        cantidadPorItemId[itemId] = 1;
        precioPorItemId[itemId] = precio;
      }
    })

    const resultado: Record<number, CartItemInfo> = {};
    for (const itemId in cantidadPorItemId) {
      resultado[parseInt(itemId)] = {
        cantidad: cantidadPorItemId[parseInt(itemId)],
        precioTotal: precioPorItemId[parseInt(itemId)],
      };
    }

    return resultado;
  }

  function getTotalCartPrice(): number {
    const totalCartPrice = cartItems.reduce((total, product) => {
      const price = parseFloat(product.price.replace('$', ''));
      return total + price;
    }, 0);
    return totalCartPrice;
  }

  return {
    cartItems,
    addToCart,
    removeFromCart,
    contarCantidadYPrecioTotal,
    getTotalCartPrice,
  };
}

export default useCart;

