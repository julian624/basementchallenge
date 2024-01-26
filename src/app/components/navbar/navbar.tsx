'use client'
import Image from "next/image"
import s from '../../index/index.module.scss'
import React, { useState, useEffect } from 'react';
import { Modal } from "./modal";
export const Navbar = ({ cartItems }: { cartItems: any }) => {
    const [scrolled, setScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    const totalCartPrice = cartItems.reduce((total: any, product: any) => {
        const price = parseFloat(product.price.replace('$', ''));
        return total + price;
    }, 0);
    function contarCantidadYPrecioTotal(cartItems: any) {
        const precioPorItemId: Record<number, number> = {};
        const cantidadPorItemId: Record<number, number> = {};
        cartItems.forEach((item: any) => {
            const itemId = item.id;
            const precio = parseFloat(item.price.replace('$', ''));

            if (cantidadPorItemId[itemId]) {
                cantidadPorItemId[itemId] += 1;
                precioPorItemId[itemId] += precio;
            } else {
                cantidadPorItemId[itemId] = 1;
                precioPorItemId[itemId] = precio;
            }
        });
        const resultado: Record<number, { cantidad: number; precioTotal: number }> = {};
        for (const itemId in cantidadPorItemId) {
            resultado[itemId] = {
                cantidad: cantidadPorItemId[itemId],
                precioTotal: precioPorItemId[itemId],
            };
        }

        return resultado;
    }
    const resultado = contarCantidadYPrecioTotal(cartItems);

    return (
        <>
            <nav className={`fixed z-30 top-0 h-10 w-full nav p-10 flex items-center justify-between ${scrolled ? 'backdrop-blur-sm' : ''}`}>
                <h2 className='hidden md:inline sm:text-white text-2xl flex'>basement</h2>
                <h2 className='block text-white text-3xl sm:hidden'>b.</h2>
                <Image
                    src='/assets/Group.png'
                    width={0}
                    height={0}
                    className='hidden md:block'
                    sizes="100vw"
                    style={{ width: 'auto', height: 'auto' }}
                    alt='navbaricon' />
                <button onClick={() => openModal()} className={s.button} >CART({cartItems.length})</button>
            </nav>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <button className='absolute mt-2 text-2xl top-0 right-0' onClick={() => closeModal()}> → Close</button>
                <div className='modal__title'>
                    <h2>YOUR <span>CART</span></h2>
                </div>
                <div className='modal__card__container'>
                    {Array.from(new Set(cartItems.map((item: any) => item.id))).map((uniqueId, index) => {
                        const product = cartItems.find((item: any) => item.id === uniqueId);
                        const cantidadYPrecioTotal = resultado[product.id];
                        return (
                            <div key={index} className='modal__card'>
                                <div className='modal__card__image'>
                                    <img src={product.imageSrc} alt="" />
                                </div>
                                <div className='modal__card__info'>
                                    <div className='modal__card__info__top'>
                                        <h2>{product.name}</h2>
                                        <h5>Unisex Basic Softstyle {product.name}</h5>
                                    </div>
                                    <div className='modal__card__info__bottom'>
                                        <h2>Quantity: {cantidadYPrecioTotal ? cantidadYPrecioTotal.cantidad : 0}</h2>
                                        <div className='flex justify-between'>
                                            <h2>SIZE <span>S</span> M L XL</h2>
                                            <h2>Total: ${(cantidadYPrecioTotal ? cantidadYPrecioTotal.precioTotal : 0).toFixed(2)}</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className='modal__footer'>
                    <div className='modal__footer__total'>Total: ${totalCartPrice.toFixed(2)}</div>
                    <div onClick={() => alert('No hay checkout en este momento')} className='modal__footer__checkout'>CHECKOUT</div>
                </div>
            </Modal>
        </>

    )
}