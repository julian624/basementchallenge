'use client'
import Image from "next/image"
import s from '../../index/index.module.scss'
import '../../css/helpers.scss'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


interface Product {
	id: number;
	imageSrc: string;
	hoverImageSrc: string;
	name: string;
	price: string;
}

interface MainProps {
	products: Product[]; 
	onAddToCart: (product: Product) => void;
}
interface MousePosition {
	x: number;
	y: number;
}
export const Main: React.FC<MainProps> = ({ products, onAddToCart }) => {
	useGSAP(() => {
        gsap.from('#heading div', {
            filter: 'blur(0.15em)',
            stagger: {
                each: 0.15,
            },
			delay:'2',
            duration: (i) => 0.3 + i * 0.11,
            ease: 'power2.inOut',
        });

        gsap.from('#heading div', {
            xPercent: (i) => (i + 1) * 20,
            opacity: 0,
            stagger: {
                each: 0.1,
            },
			delay:'2',
            duration: (i) => 0.3 + i * 0.11,
            ease: 'power2.inOut',
        });
		gsap.from('#supply', {
            xPercent: (i) => (i + 1) * 20,
            opacity: 0,
			delay:'2.5',
            duration: (i) => 2 ,
            ease: 'power2.inOut',
        });
    });

	const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const x = e.nativeEvent.offsetX;
		const y = e.nativeEvent.offsetY;
		setMousePosition({ x, y })
	}

	return (
		<>
			<main className=' pt-20 flex-col w-full  min-h-[80vh] top-0 flex items-center justify-between sm:p-14 '>
				<Image
					src='/assets/asterisk.png'
					width={0}
					height={0}
					className='hidden md:block absolute bottom-44 right-10 z-20'
					sizes="100vw"
					style={{ width: 'auto', height: 'auto' }}
					alt='navbaricon'
				/>
				<Image
					src='/assets/asterisk.png'
					width={0}
					height={0}
					className='hidden md:block absolute bottom-32 pt-10 left-10 z-20'
					sizes="100vw"
					style={{ width: 'auto', height: 'auto' }}
					alt='navbaricon'
				/>
				<motion.div className={s.homeFonts}>
					<motion.h1
						id='h1'
						animate={{ opacity: 1 }}
						initial={{ opacity: 1 }}
						transition={{ duration: 1.5, ease: 'easeOut', delay: 0 }}
					>
						<div className='flex' id='heading'>
							<div>B</div>
							<div>A</div>
							<div>S</div>
							<div>E</div>
							<div>M</div>
							<div>E</div>
							<div>N</div>
							<div id='neon'>T</div>
						</div>
					</motion.h1>
					<motion.div
						className='flex justify-between w-full items-center'
						transition={{ duration: 1, delay: 0, ease: 'easeOut' }}>
						<motion.h5>
							EST
						</motion.h5>
						<motion.h2 id='supply'
						>
							SUPPLY
						</motion.h2>
						<motion.h5>
							2k19
						</motion.h5>
					</motion.div>
				</motion.div>
				<div className={`${s.marquee}`}>
					<div className={`${s.marquee__container} hover-container`}>
						A man can’t have enough base­ment swag  —  A man can’t have enough base­ment swag
						A man can’t have enough base­ment swag  —  A man can’t have enough base­ment swag
						A man can’t have enough base­ment swag  —  A man can’t have enough base­ment swag
					</div>
				</div>
				<div id="cards" onMouseMove={handleMouseMove} className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
					{products.map((product) => (
						<div
							onClick={() => onAddToCart(product)} key={product.id} className={`${s.product}`}>
							<img id={s.imagehover} src={product.hoverImageSrc} alt="remera" width={100} height={40} />
							<img src={product.imageSrc} alt="productos" />
							<div className={s.product__footer}>
								<p>{product.name}</p>
								<p>{product.price}</p>
								<button className='sm:hidden'>Agregar</button>
							</div>

						</div>
					))}
				</div>
			</main>

		</>
	)
}
