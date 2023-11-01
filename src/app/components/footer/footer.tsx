'use client'
import Image from 'next/image';
import s from '../../index/index.module.scss'
import React, { useEffect, useState } from 'react';

export const Footer = () => {
    return (
        <>
            <footer className=' h-56 flex-col w-full relative flex items-center justify-between'>
                <Image
                    src='/assets/footer.png'
                    width={0}
                    height={0}
                    className='block'
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto', padding: '2vw' }}
                    alt='navbaricon' />
            </footer>
        </>
    )
}