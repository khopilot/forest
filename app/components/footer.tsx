'use client';

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Instagram, Twitter, Facebook, Mail, Youtube, ArrowUpRight, Play, Star, Film, Clapperboard, Camera, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/crimsonpolarbear",
    icon: Instagram,
    color: "hover:text-pink-500",
    hoverBg: "hover:bg-pink-500/10",
    gradient: "from-pink-500"
  },
  {
    name: "Twitter",
    href: "https://twitter.com/crimsonpolarbear",
    icon: Twitter,
    color: "hover:text-blue-400",
    hoverBg: "hover:bg-blue-400/10",
    gradient: "from-blue-400"
  },
  {
    name: "Facebook",
    href: "https://facebook.com/crimsonpolarbear",
    icon: Facebook,
    color: "hover:text-blue-600",
    hoverBg: "hover:bg-blue-600/10",
    gradient: "from-blue-600"
  },
  {
    name: "YouTube",
    href: "https://youtube.com/crimsonpolarbear",
    icon: Youtube,
    color: "hover:text-red-600",
    hoverBg: "hover:bg-red-600/10",
    gradient: "from-red-600"
  },
];

const footerLinks = [
  {
    title: "Navigation",
    icon: Film,
    links: [
      { name: "Projects", href: "/projects" },
      { name: "About", href: "/about" },
      { name: "Crew", href: "/crew" },
      { name: "Contact", href: "/contact" },
      { name: "Merch", href: "/merch" },
    ],
  },
  {
    title: "Legal",
    icon: Clapperboard,
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const achievements = [
  { number: "25+", label: "Years Experience" },
  { number: "50+", label: "Projects Completed" },
  { number: "3", label: "Current Productions" },
  { number: "12+", label: "Countries Reached" },
];

export default function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  return (
    <motion.footer 
      ref={footerRef}
      style={{ opacity, y }}
      className="relative mt-32"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-crimson/10 via-transparent to-crimson/10" />
      
      {/* Animated Film Strip */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <motion.div
          animate={{
            x: [0, -1000],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-4"
        >
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-8 h-16 bg-zinc-800/30 backdrop-blur-sm border-x border-zinc-700/30" />
          ))}
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="relative border-t border-zinc-800 mt-16">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Enhanced Brand Section */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 lg:col-span-2"
            >
              <div className="flex items-start gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <motion.div
                    className="absolute inset-0 bg-crimson/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <Link href="/" className="relative block h-16 w-16">
                    <Image
                      src="/logo/Untitled_design__5_-removebg-preview.png"
                      alt="Crimsonpolarbear Logo"
                      fill
                      className="object-contain brightness-125"
                    />
                  </Link>
                </motion.div>

                <div className="pt-2">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-xl font-bold text-white mb-2"
                  >
                    Crimsonpolarbear©
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 text-sm text-zinc-400"
                  >
                    <Film className="w-4 h-4 text-crimson" />
                    <span>Independent Film Production</span>
                  </motion.div>
                </div>
              </div>
              
              <div className="relative pl-6 border-l border-zinc-800">
                <motion.div
                  className="absolute -left-px top-0 w-px h-full bg-gradient-to-b from-crimson via-crimson/50 to-crimson"
                  animate={{
                    scaleY: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.p 
                  className="text-sm text-zinc-400 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  Independent film production company crafting compelling narratives through innovative filmmaking. Based in Cambodia, reaching global audiences with stories that matter.
                </motion.p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 transition-all duration-300 text-white ${social.color} group`}
                      onHoverStart={() => setHoveredSocial(social.name)}
                      onHoverEnd={() => setHoveredSocial(null)}
                      whileHover={{ y: -4, scale: 1.05 }}
                    >
                      <motion.div
                        className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${social.gradient} to-transparent`}
                        style={{
                          filter: "blur(8px)",
                        }}
                      />
                      <Icon className="w-5 h-5 relative z-10 transition-colors duration-300" />
                      <AnimatePresence>
                        {hoveredSocial === social.name && (
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-zinc-400 whitespace-nowrap bg-zinc-800/90 px-2 py-1 rounded-md border border-zinc-700/50"
                          >
                            {social.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Navigation Sections */}
            {footerLinks.map((section, sectionIndex) => (
              <motion.div 
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + sectionIndex * 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="p-2 rounded-lg bg-crimson/10 border border-crimson/20"
                  >
                    <section.icon className="w-4 h-4 text-crimson" />
                  </motion.div>
                  <h3 className="text-lg font-medium text-white">{section.title}</h3>
                </div>
                <ul className="space-y-4">
                  {section.links.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      onHoverStart={() => setHoveredLink(link.name)}
                      onHoverEnd={() => setHoveredLink(null)}
                    >
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-300 relative"
                      >
                        <motion.span 
                          className="relative"
                          animate={{
                            x: hoveredLink === link.name ? 4 : 0,
                          }}
                        >
                          {link.name}
                          <span className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-crimson/0 via-crimson/50 to-crimson/0 origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                        </motion.span>
                        <motion.div
                          animate={{
                            x: hoveredLink === link.name ? 4 : 0,
                            opacity: hoveredLink === link.name ? 1 : 0,
                          }}
                        >
                          <ArrowUpRight className="w-3 h-3" />
                        </motion.div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Enhanced Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="p-2 rounded-lg bg-crimson/10 border border-crimson/20"
                >
                  <Camera className="w-4 h-4 text-crimson" />
                </motion.div>
                <h3 className="text-lg font-medium text-white">Contact</h3>
              </div>
              <div className="space-y-4">
                <motion.a
                  href="mailto:contact@crimsonpolarbear.com"
                  className="group flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors duration-300 relative p-3 rounded-lg hover:bg-zinc-800/50"
                  whileHover={{ x: 4 }}
                >
                  <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 group-hover:border-crimson/30 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500 group-hover:text-zinc-400">Email Us</span>
                    <span>contact@crimsonpolarbear.com</span>
                  </div>
                </motion.a>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="group flex items-center gap-3 text-sm text-zinc-400 p-3 rounded-lg hover:bg-zinc-800/50 transition-all">
                    <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 group-hover:border-crimson/30 transition-colors">
                      <Star className="w-4 h-4 text-crimson" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-zinc-500 group-hover:text-zinc-400">Location</span>
                      <span className="group-hover:text-white transition-colors">Siem Reap, Cambodia</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-zinc-800"
          >
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ scale: 1.02 }}
              >
                <Sparkles className="w-4 h-4 text-crimson" />
                <p className="text-sm text-zinc-400">
                  © {new Date().getFullYear()} Crimsonpolarbear©. All rights reserved.
                </p>
              </motion.div>
              <motion.div 
                className="flex items-center gap-4"
                whileHover={{ scale: 1.02 }}
              >
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 text-white bg-crimson hover:bg-crimson/90 rounded-lg overflow-hidden transition-colors"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-700"
                  />
                  <Play className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Start Your Project</span>
                  <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
} 