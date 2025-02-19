'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Nav from './nav';

export default function NavigationWrapper() {
  const pathname = usePathname();
  
  if (pathname === '/') {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="navigation"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Nav />
      </motion.div>
    </AnimatePresence>
  );
} 