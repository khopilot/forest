'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function MerchPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
      setEmail('');
    }
  };

  const merchPreviews = [
    {
      src: "/crimepolarbear/cp-crew picts /new extra posters 25/shot poster website 25.png",
      alt: "Limited Edition Poster",
      title: "Limited Edition Posters"
    },
    {
      src: "/crimepolarbear/cp-crew picts /new extra posters 25/pet shop poster (1).png",
      alt: "Exclusive Artwork",
      title: "Exclusive Artwork"
    },
    {
      src: "/crimepolarbear/cp-crew picts /new extra posters 25/faded web 25.png",
      alt: "Collector's Items",
      title: "Collector's Items"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-zinc-800/20 to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 relative">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 1,
            ease: [0.21, 1.02, 0.47, 0.98]
          }}
          className="w-full max-w-[200px] mx-auto mb-16 relative aspect-square"
        >
          <Image
            src="/logo/Untitled_design__5_-removebg-preview.png"
            alt="Crime Polar Bear Logo"
            fill
            className="object-contain"
            sizes="200px"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Coming Soon
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-400 mb-8"
          >
            Get ready for our exclusive collection of limited edition merchandise.
            Be the first to know when we launch.
          </motion.p>
        </motion.div>

        {/* Preview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {merchPreviews.map((preview, index) => (
            <motion.div
              key={preview.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.21, 0.68, 0.47, 0.98]
              }}
              className="relative group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-900">
                <Image
                  src={preview.src}
                  alt={preview.alt}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{preview.title}</h3>
                  <p className="text-zinc-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Limited availability. Sign up to be notified.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-md mx-auto"
        >
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="w-16 h-16 bg-crimson rounded-full mx-auto mb-4 flex items-center justify-center"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                <p className="text-zinc-400">We'll notify you when our store launches.</p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-2xl bg-zinc-800/50 border border-zinc-700 focus:border-crimson focus:ring-crimson text-white placeholder-zinc-500 backdrop-blur-sm transition-all"
                  />
                  <motion.button
                    type="submit"
                    className="absolute right-2 top-2 px-6 py-2 bg-crimson text-white rounded-xl hover:bg-crimson/90 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Notify Me
                  </motion.button>
                </div>
                <p className="mt-4 text-sm text-zinc-500 text-center">
                  Be the first to access our exclusive merchandise collection
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {[
            { title: "Limited Edition", description: "Exclusive designs available only for a limited time", icon: "✨" },
            { title: "Early Access", description: "Subscribers get first access to new merchandise", icon: "🎯" },
            { title: "Special Offers", description: "Exclusive discounts for our early supporters", icon: "🎁" }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + (index * 0.1) }}
              className="text-center p-6"
            >
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 