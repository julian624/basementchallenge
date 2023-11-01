'use client'
import Index from './index'
import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import Lenis from '@studio-freight/lenis'
import Loader from './components/loader/loader';

export default function Home() {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })

  return (
    <ReactLenis root>
      <Loader />
      <Index />
    </ReactLenis>
  )
}
