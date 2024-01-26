'use client'
import { Navbar } from '../components/navbar/navbar'
import { Main } from '../components/main/main'
import { Footer } from '../components/footer/footer'
import { useState } from 'react'
import { products } from '../utils/products'
import { Product } from '../utils/products'


export default function Index() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((cartItems) => [...cartItems, product]);
  };

  return (
    <>
        <Navbar  cartItems={cartItems} />
        <Main  products={products} onAddToCart={handleAddToCart} />
        <Footer />
    </>
  )
}
