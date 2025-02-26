'use client';

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Crew", href: "/crew" },
  { name: "Contact", href: "/contact" },
  { name: "Merch", href: "/merch" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
      
      {/* Animated Background Logo */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center mix-blend-lighten contrast-125 saturate-150 pointer-events-none"
      >
        <div className="relative w-[900px] h-[900px]">
          <Image
            src="/logo/Untitled_design__5_-removebg-preview.png"
            alt="Background Logo"
            fill
            className="object-contain brightness-125"
            priority
          />
        </div>
      </motion.div>

      {/* Enhanced Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-8 left-0 right-0 z-10"
      >
        <ul className="flex items-center justify-center gap-8">
          {navigation.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
            >
              <Link
                href={item.href}
                className="relative text-sm text-zinc-500 hover:text-white transition-colors duration-500 group"
              >
                <span>{item.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-crimson group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </ul>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl px-6 py-24">
        {/* Animated Lines */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full h-px bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0"
        />

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="my-16 text-center"
        >
          <h1 className="text-4xl text-transparent duration-1000 cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text bg-gradient-to-r from-white to-zinc-500/80">
            crimsonpolarbear©
          </h1>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full h-px bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0"
        />

        {/* Enhanced Subtitle and CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <span className="inline-flex items-center px-3 py-1 text-sm text-zinc-400 rounded-full bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50">
              Independent Film Production
            </span>
          </motion.div>
          
          <motion.p 
            className="text-zinc-400 max-w-xl mx-auto mb-12 text-sm sm:text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Crafting compelling narratives through innovative filmmaking, 
            bringing unique stories to life with passion and purpose
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center gap-6"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-white bg-crimson/90 px-6 py-3 rounded-lg hover:bg-crimson transition-all duration-300"
            >
              <span>View Our Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="text-zinc-400 hover:text-white transition-colors duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
