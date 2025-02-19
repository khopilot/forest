'use client';

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  ArrowLeft, 
  Menu, 
  X, 
  Film, 
  Info, 
  Users, 
  Mail, 
  ShoppingBag,
  ChevronRight
} from "lucide-react";
import { useState, useEffect } from "react";

const navigation = [
  { 
    name: "Projects", 
    href: "/projects",
    icon: Film,
    description: "Explore our film portfolio"
  },
  { 
    name: "About", 
    href: "/about",
    icon: Info,
    description: "Learn about our story"
  },
  { 
    name: "Crew", 
    href: "/crew",
    icon: Users,
    description: "Meet our talented team"
  },
  { 
    name: "Contact", 
    href: "/contact",
    icon: Mail,
    description: "Get in touch with us"
  },
  { 
    name: "Merch", 
    href: "/merch",
    icon: ShoppingBag,
    description: "Official merchandise"
  },
];

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-gradient-to-b from-black via-black/80 to-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Home Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-6"
          >
            <Link 
              href="/"
              className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-300"
            >
              <motion.div
                whileHover={{ x: -4 }}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300" />
                <span className="text-sm hidden sm:block">Home</span>
              </motion.div>
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-crimson/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Link href="/" className="relative block h-8 w-8">
                <Image
                  src="/logo/Untitled_design__5_-removebg-preview.png"
                  alt="Crimsonpolarbear Logo"
                  fill
                  className="object-contain brightness-125"
                  priority
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onHoverStart={() => setHoveredItem(item.name)}
                    onHoverEnd={() => setHoveredItem(null)}
                  >
                    <Link
                      href={item.href}
                      className={`relative text-sm transition-colors duration-300 group ${
                        pathname === item.href ? 'text-white' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{
                            scale: hoveredItem === item.name ? 1.2 : 1,
                            rotate: hoveredItem === item.name ? 360 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon className="w-4 h-4" />
                        </motion.div>
                        <span className="relative">
                          {item.name}
                          <span className={`absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-crimson/0 via-crimson/50 to-crimson/0 origin-center transition-transform duration-300 ${
                            pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`} />
                        </span>
                      </div>
                      
                      {/* Tooltip */}
                      <AnimatePresence>
                        {hoveredItem === item.name && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-zinc-800/90 text-zinc-300 text-xs rounded-lg whitespace-nowrap backdrop-blur-sm border border-zinc-700/50"
                          >
                            {item.description}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden relative z-50 p-2 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "100vh" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 top-16 bg-black/95 backdrop-blur-md md:hidden z-40"
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-zinc-900/25 to-transparent"
                />
                
                <motion.div 
                  className="relative h-full overflow-auto py-8 px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  {navigation.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                        className="mb-4"
                      >
                        <Link
                          href={item.href}
                          className={`group block p-4 rounded-xl transition-all duration-300 ${
                            isActive 
                              ? 'bg-crimson/10 border border-crimson/20' 
                              : 'bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className={`p-2 rounded-lg ${
                                  isActive ? 'bg-crimson/20' : 'bg-zinc-800/50'
                                }`}
                              >
                                <Icon className={`w-5 h-5 ${
                                  isActive ? 'text-crimson' : 'text-zinc-400'
                                }`} />
                              </motion.div>
                              <div>
                                <h3 className={`font-medium ${
                                  isActive ? 'text-white' : 'text-zinc-300'
                                }`}>
                                  {item.name}
                                </h3>
                                <p className="text-sm text-zinc-500">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                            <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                              isActive ? 'text-crimson' : 'text-zinc-600'
                            } group-hover:translate-x-1`} />
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
} 