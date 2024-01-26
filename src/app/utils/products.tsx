export interface Product {
    id: number;
    imageSrc: string;
    hoverImageSrc: string;
    name: string;
    price: string;
  }
export const products: Product[] = [
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