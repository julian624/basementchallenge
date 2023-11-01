'use client'
import { Navbar } from '../components/navbar/navbar'
import { Main } from '../components/main/main'
import { Footer } from '../components/footer/footer'
import { useEffect, useRef, useState } from 'react'


interface Product {
  id: number;
  imageSrc: string;
  hoverImageSrc: string;
  name: string;
  price: string;
}
export default function Index() {
  const containerRef = useRef(null)
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const products: Product[] = [
    {
      id: 1,
      imageSrc: '/assets/shirt.png',
      hoverImageSrc: '/assets/add.png',
      name: 'Black t-shirt',
      price: '$20.00',
    },
    {
      id: 2,
      imageSrc: '/assets/hoodie.png',
      hoverImageSrc: '/assets/add.png',
      name: 'Black hoodie',
      price: '$20.00',
    },
    {
      id: 3,
      imageSrc: '/assets/cap.png',
      hoverImageSrc: '/assets/add.png',
      name: 'Black Cap',
      price: '$20.00',
    },
  ];
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
