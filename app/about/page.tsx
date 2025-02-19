'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, X as CloseIcon, CheckCircle, ExternalLink } from 'lucide-react';
import { useState } from 'react';

// After imports, add the services data
const services = [
  {
    icon: "🎬",
    title: "Film Production",
    description: "Full-service film production including pre-production planning, shooting, and post-production.",
    image: "/crimepolarbear/film posters online25  jpegs/new extra posters 25/shot poster website 25.png",
    additionalImages: [
      "/crimepolarbear/cp-crew picts /forest publicity pic 2.jpg",
      "/crimepolarbear/cp-crew picts /bopha crew.JPG"
    ],
    features: ["Feature Films", "Documentaries", "TV Series"],
    longDescription: "Our film production service covers every aspect of bringing your vision to life. From initial concept development through pre-production, principal photography, and final delivery, we handle all the complexities of film production with expertise and dedication.",
    benefits: [
      "Expert crew and equipment",
      "Comprehensive project management",
      "International production experience",
      "Quality-focused workflow"
    ],
    process: [
      "Pre-production planning",
      "Location scouting and casting",
      "Principal photography",
      "Post-production coordination"
    ]
  },
  {
    icon: "🎨",
    title: "Post Production",
    description: "Professional editing, color grading, and sound design to perfect your vision.",
    image: "/crimepolarbear/film posters online25  jpegs/new extra posters 25/faded web 25.png",
    additionalImages: [
      "/crimepolarbear/film posters online25  jpegs/new extra posters 25/i wanna be..25.png",
      "/crimepolarbear/film posters online25  jpegs/new extra posters 25/pet shop poster (1).png"
    ],
    features: ["Editing", "Color Grading", "Sound Design"],
    longDescription: "Our post-production team combines technical expertise with creative artistry to elevate your footage into a polished final product. We utilize industry-standard tools and workflows to ensure the highest quality output.",
    benefits: [
      "State-of-the-art facilities",
      "Experienced editors and colorists",
      "Advanced color science",
      "Comprehensive audio solutions"
    ],
    process: [
      "Footage organization and logging",
      "Offline and online editing",
      "Color grading and finishing",
      "Sound mixing and mastering"
    ]
  },
  {
    icon: "✍️",
    title: "Creative Development",
    description: "Story development and creative consulting to bring your ideas to life.",
    image: "/crimepolarbear/film posters online25  jpegs/HTK small temple sit 24.png",
    additionalImages: [
      "/crimepolarbear/film posters online25  jpegs/HTK snake 1.png",
      "/crimepolarbear/film posters online25  jpegs/living on the fringe.png"
    ],
    features: ["Scriptwriting", "Story Development", "Creative Direction"],
    longDescription: "Our creative development service helps shape your ideas into compelling narratives. We work closely with you to develop strong storylines, engaging characters, and powerful scripts that resonate with audiences.",
    benefits: [
      "Experienced storytellers",
      "Character-driven approach",
      "Genre expertise",
      "Market-aware development"
    ],
    process: [
      "Concept development",
      "Story structure planning",
      "Character development",
      "Script revision and polishing"
    ]
  },
  {
    icon: "🎥",
    title: "Production Services",
    description: "Comprehensive production management and location services in Cambodia.",
    image: "/crimepolarbear/film posters online25  jpegs/S_X stand sideways 24.png",
    additionalImages: [
      "/crimepolarbear/film posters online25  jpegs/S_X walk neon 24.png",
      "/crimepolarbear/film posters online25  jpegs/S_X neon moto24.png"
    ],
    features: ["Location Scouting", "Casting", "Production Management"],
    longDescription: "With deep local knowledge and extensive experience in Cambodia, we provide end-to-end production services that ensure smooth operations and authentic local content creation.",
    benefits: [
      "Local expertise and connections",
      "Cultural sensitivity",
      "Logistics management",
      "Cost-effective solutions"
    ],
    process: [
      "Location scouting and securing",
      "Local crew assembly",
      "Equipment procurement",
      "Permit handling"
    ]
  },
  {
    icon: "🌟",
    title: "Visual Effects",
    description: "Cutting-edge visual effects and motion graphics to enhance your story.",
    image: "/crimepolarbear/film posters online25  jpegs/trilogy town 3d-24 .png",
    additionalImages: [
      "/crimepolarbear/film posters online25  jpegs/3d logos for extra picture on the poster_crew_synopsis page before/C_C 3d metal 24.png",
      "/crimepolarbear/film posters online25  jpegs/3d logos for extra picture on the poster_crew_synopsis page before/htk 3d metal 24.png"
    ],
    features: ["CGI", "Motion Graphics", "Compositing"],
    longDescription: "Our VFX team combines technical prowess with artistic vision to create stunning visual effects that enhance your storytelling while maintaining believability and impact.",
    benefits: [
      "Advanced CGI capabilities",
      "Seamless integration",
      "Creative problem-solving",
      "Efficient pipeline"
    ],
    process: [
      "VFX planning and previs",
      "Asset creation",
      "Compositing and integration",
      "Quality control and delivery"
    ]
  },
  {
    icon: "🎵",
    title: "Sound & Music",
    description: "Professional sound design and original music composition for your projects.",
    image: "/crimepolarbear/film posters online25  jpegs/the dharma cubs24.png",
    additionalImages: [
      "/crimepolarbear/film posters online25  jpegs/jungle kill poster24.png",
      "/crimepolarbear/film posters online25  jpegs/woman-hoo.png"
    ],
    features: ["Sound Design", "Music Composition", "Audio Post"],
    longDescription: "Our audio team creates immersive soundscapes and original music that elevate your project's emotional impact and production value.",
    benefits: [
      "Original composition",
      "Professional recording",
      "Extensive sound library",
      "Surround sound mixing"
    ],
    process: [
      "Sound concept development",
      "Music composition",
      "Sound design and editing",
      "Final mix and mastering"
    ]
  }
];

const ServiceQuickView = ({ service, onClose }: { 
  service: typeof services[0]; 
  onClose: () => void 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
        className="bg-gradient-to-br from-zinc-900 to-black rounded-3xl overflow-hidden w-full max-w-6xl my-4 relative shadow-2xl shadow-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 backdrop-blur-sm transition-all duration-300 hover:rotate-90"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-[300px] md:h-[600px] overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            
            {/* Additional Images Preview */}
            {service.additionalImages && (
              <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-4">
                {service.additionalImages.map((img, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white/20 hover:border-white/40 transition-all cursor-pointer relative"
                  >
                    <Image
                      src={img}
                      alt={`${service.title} preview ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-sm p-8 md:p-12 max-h-[600px] overflow-y-auto">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-crimson/20 text-white/90 text-sm backdrop-blur-sm border border-crimson/30 mb-4">
                  {service.icon} {service.title}
                </span>
                <h2 className="text-3xl font-bold text-white mb-4">Service Overview</h2>
                <p className="text-zinc-300 leading-relaxed">{service.longDescription}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Key Benefits</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 bg-white/5 p-4 rounded-xl group hover:bg-white/10 transition-all"
                    >
                      <CheckCircle className="w-5 h-5 text-crimson shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-zinc-300">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Our Process</h3>
                <div className="space-y-4">
                  {service.process.map((step, index) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-crimson/20 flex items-center justify-center text-white border border-crimson/30 group-hover:bg-crimson/30 transition-colors">
                        {index + 1}
                      </div>
                      <span className="text-zinc-300 group-hover:text-white transition-colors">{step}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-xl font-bold text-white mb-4">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, index) => (
                    <motion.span
                      key={feature}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="px-3 py-1.5 bg-white/5 rounded-full text-zinc-300 text-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-white bg-crimson px-6 py-3 rounded-xl hover:bg-crimson/90 transition-all group"
                >
                  <span>Discuss Your Project</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function AboutPage() {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-zinc-800/20 to-transparent opacity-50" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-crimson/5 to-transparent mix-blend-overlay" />

      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 relative">
        {/* Enhanced Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.21, 1.02, 0.47, 0.98] }}
          className="w-full max-w-[200px] mx-auto mb-16 relative aspect-square group"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="absolute inset-0 bg-crimson/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className="absolute inset-0 bg-gradient-conic from-crimson/30 via-transparent to-crimson/30 animate-spin-slow rounded-full opacity-70" />
          <Image
            src="/logo/Untitled_design__5_-removebg-preview.png"
            alt="Crime Polar Bear Logo"
            fill
            className="object-contain"
            sizes="200px"
            priority
          />
        </motion.div>

        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <div className="inline-block mb-4">
            <motion.span 
              className="inline-flex items-center px-4 py-2 rounded-full bg-crimson/10 text-white text-sm backdrop-blur-sm border border-crimson/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Established 1996
            </motion.span>
          </div>
          <h1 className="text-7xl font-bold text-white mb-6 tracking-tight">About Crimsonpolarbear©</h1>
          <p className="text-zinc-400 text-xl leading-relaxed">
            Crafting stories that resonate, creating experiences that inspire
          </p>
        </motion.div>

        {/* Enhanced Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Vision Card */}
            <motion.div 
              className="group bg-gradient-to-br from-crimson/10 to-black/50 backdrop-blur-sm p-8 rounded-2xl border border-crimson/20 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-crimson/0 via-crimson/5 to-crimson/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                Our Vision
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                First and foremost our focus is feature films, documentaries and television shows made with a purpose & soul. 
                We believe in the power of storytelling to transform perspectives and touch hearts.
              </p>
            </motion.div>

            {/* Core Focus Card */}
            <motion.div 
              className="group bg-zinc-900/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                Core Focus
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                Crimsonpolarbear© provides you with the knowledge, experience and drive to engage in all aspects of media production. 
                From concept to finish, we pull from our resources to mold a final product that stands apart from the competition.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Philosophy Card */}
            <motion.div 
              className="group bg-zinc-900/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                Our Philosophy
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                There is nothing in this world that hasn't been done already. What makes a difference is the spark 
                of individuality in the haystack of commonality. To get the best, you have to work with the best.
              </p>
            </motion.div>

            {/* Commitment Card */}
            <motion.div 
              className="group bg-gradient-to-br from-zinc-900/60 to-black/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                Our Commitment
                <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                We are the connecting point between where you are and where you want to be. Nothing happens without 
                blood, sweat and tears, and we here at Crimsonpolarbear© bleed ourselves dry, to make you look good.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Current Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto mb-24"
        >
          <div className="bg-gradient-to-br from-zinc-900/60 to-zinc-800/30 backdrop-blur-lg rounded-2xl overflow-hidden group">
            <div className="relative aspect-video">
              <Image
                src="/crimepolarbear/film posters online25  jpegs/trilogy town 3d-24 .png"
                alt="ACW Trilogy"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-transparent" />
              <div className="absolute inset-0 flex items-end p-8">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-4"
                  >
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-crimson/20 text-white text-sm backdrop-blur-sm border border-crimson/30">
                      Featured Project
                    </span>
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white mb-4">Current Focus: A Cambodian Winter®</h2>
                  <p className="text-zinc-300 leading-relaxed mb-6">
                    Our current flagship project is the ambitious ACW trilogy, following the journey of Pim through three 
                    distinct yet interconnected films. Drawing inspiration from Francois Truffaut's "The Antoine Doinel cycle" 
                    and Satyajit Ray's "The Apu Trilogy".
                  </p>
                  <Link
                    href="/projects/acw"
                    className="inline-flex items-center gap-2 text-white bg-crimson/90 px-6 py-3 rounded-lg hover:bg-crimson transition-all group relative overflow-hidden"
                  >
                    <span className="relative z-10">Explore the Trilogy</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto mb-24"
        >
          <div className="text-center mb-12">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-crimson/10 text-white text-sm backdrop-blur-sm border border-crimson/20 mb-4"
            >
              Our Expertise
            </motion.span>
            <h2 className="text-4xl font-bold text-white mb-4">Services We Offer</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              From concept to completion, we provide comprehensive production services with a focus on quality and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-zinc-900/50 via-zinc-800/30 to-black/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-crimson/30 transition-all duration-300 cursor-pointer"
                whileHover={{ y: -5 }}
                onClick={() => setSelectedService(service)}
              >
                <div className="relative aspect-[4/3] mb-4">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    {service.title}
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  
                  <p className="text-zinc-400 text-sm group-hover:text-zinc-300 transition-colors">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-white bg-crimson px-8 py-4 rounded-xl hover:bg-crimson/90 transition-all group relative overflow-hidden"
          >
            <span className="relative z-10 text-lg font-medium">Work with Us</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </Link>
        </motion.div>
      </div>

      {/* Add QuickView Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceQuickView
            service={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 