'use client'
import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';
const mobile = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        damping: 15, // Reducido el valor del damping
        stiffness: 80, // Reducido el valor del stiffness
      },
    },
    closed: {
      opacity: 0,
      x: '150%',
      transition: {
        type: 'spring',
        damping: 15, // Reducido el valor del damping
        stiffness: 80, // Reducido el valor del stiffness
      },
    },
  };
  
  

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <motion.div
      data-lenis-prevent  
      className="modal__container"
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={mobile}
    >
         <div className="modal-content">
        {children}
      </div>
    </motion.div>
  );
};
