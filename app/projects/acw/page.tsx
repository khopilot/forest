'use client';

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { ArrowLeft, Play, ChevronDown } from "lucide-react";

const films = [
  {
    title: "Clever Creatures®",
    year: "2024",
    posters: [
      "/crimepolarbear/film posters online25  jpegs/trilogy town 3d-24 .png",
      "/crimepolarbear/film posters online25  jpegs/new extra posters 25/faded web 25.png",
      "/crimepolarbear/film posters online25  jpegs/new extra posters 25/shot poster website 25.png",
      "/crimepolarbear/film posters online25  jpegs/new extra posters 25/pet shop poster (1).png",
      "/crimepolarbear/film posters online25  jpegs/new extra posters 25/i wanna be..25.png",
      "/crimepolarbear/film posters online25  jpegs/jungle kill poster24.png"
    ],
    synopsis: `Set against the exotic beauty and enchanting ancient culture of Cambodia, two young girls embark upon a journey of yearning in search of the family they never had. Carrying with them an optimistic joy and infectious love for life, they set out unaware of the dangers and hardships of life on the streets.

Pim, a strong independent girl on the cusp of adolescence, and her younger 'sister' Chamron, share a special bond, having grown up together without parents. When financial trouble looms at the orphanage, they decide to run away and find a better life. Travelling through sweeping green rice fields and stunning panoramic vistas of rural Cambodia, they slowly drift toward the city.

Here amongst the noisy busy streets, speckled with homeless children and beggars bereft of limbs, are the human remnants of the fallen Khmer Rouge regime. The urban kaleidoscope is awash with jostling traffic, bustling markets, and an endless sea of faces. It leaves the girls searching for salvation, struggling for charity to survive.`,
    status: "Completed",
    specs: `Running time: 1 hour 49 minutes
Country of origin: USA
Country of filming: Cambodia
Language: Khmer
Shooting format: Red Epic
Aspect ratio: 2.39:1
Film: Color`,
    credits: {
      director: "Forest Wise",
      coProducer: "Bopha Phuong Lav",
      cinematographer: "Jaime Reynoso",
      score: "Mark Van Hoen",
      editors: ["Metus Thuesue", "Forest Wise"],
      cast: {
        "Pim": "Pim Chan",
        "Chamroeun": "Chamroeun Taing",
        "Kith": "Kith Cheang",
        "Woman": "Oun Soksara"
      }
    }
  },
  {
    title: "Hail Tiger King®",
    year: "2025",
    posters: [
      "/crimepolarbear/film posters online25  jpegs/HTK small temple sit 24.png",
      "/crimepolarbear/film posters online25  jpegs/HTK snake 1.png",
      "/crimepolarbear/film posters online25  jpegs/new extra posters 25/shot poster website 25.png",
      "/crimepolarbear/film posters online25  jpegs/living on the fringe.png"
    ],
    synopsis: `"Does our past affect our future? Are we so jaded that our past loves keep us from ever loving freely ever again? A tormented cruel cycle of life."

Kith, an attractive Cambodian man early 30's, is living the life of working to survive, not living to live. As a child Kith went on a magical adventure that changed his life forever.

He daydreams of the past, the future, and somewhere in between. Never living in the present. We cut back and forth between all of his journeys, and experiences.

When he was young and full of life, he met two young girls Pim and Chamron, going on a road trip/journey of a lifetime. Never to let go of this first love.`,
    status: "Completed - Release 2025",
    specs: `Duration: 115 Min
Shooting Format: Red Epic/ Sony fx9/ iPhone 15pro max
Aspect Ratio: 2:39:1`,
    credits: {
      director: "Forest Wise",
      coProducer: "Bopha Phuong Lav",
      cinematographer: "Jaime Reynoso",
      editors: ["Metus Thuesue", "Jimmy Jam"],
      cast: {
        "Kith": "Kith Cheang",
        "Old Kith": "Nang Nos",
        "Pim": "Pim Chan",
        "Pov": "Pov Kong",
        "Sara": "Soksara Oun",
        "Soviet": "Soviet Sey"
      }
    },
    trailer: "https://vimeo.com/237324792"
  },
  {
    title: "Slowmotion Superstars®",
    year: "2025",
    posters: [
      "/crimepolarbear/film posters online25  jpegs/S_X stand sideways 24.png",
      "/crimepolarbear/film posters online25  jpegs/S_X walk neon 24.png",
      "/crimepolarbear/film posters online25  jpegs/S_X neon moto24.png",
      "/crimepolarbear/film posters online25  jpegs/the dharma cubs24.png"
    ],
    synopsis: `A black comedic, low-fi /sci-fi -scary- adventure tale with a babyschool heist and some drama thrown in for good measure. Poetry meets commercial on the playground of our sub conscious.

"Everything exists, here, there, anywhere. We are not the only ones living in this world, never were, and never will be."

South East Asia. Navi: a daughter to a Hindu goddess, Bunny: a toy that has become human, Pim: a prostitute going back in time, and one bad cowboy demon are about to do a babyschool heist. Thrown in a few more bad, maybe people, from another time space. What could go wrong? Everything and more!`,
    status: "Post-Production",
    specs: `Duration: TBA
Shooting Format: Sony fx9/ iPhone 15pro max
Aspect Ratios: 2:39:1/4:33/1:85`,
    credits: {
      director: "Forest Wise",
      cinematographer: "Tito Reynoso",
      lineProducer: "Bopha Phuong Lav",
      editors: ["Freddy Fingers", "Forest"],
      cast: {
        "Navi": "Harley",
        "Pim": "Pim Chan",
        "Bunny": "Lily",
        "Old Pim": "Soksara Oun"
      }
    }
  }
];

const ImageGallery = ({ 
  images, 
  currentIndex,
  onImageChange,
  trailer
}: { 
  images: string[];
  currentIndex: number;
  onImageChange: (index: number) => void;
  trailer?: string;
}) => {
  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="relative h-full w-full"
        >
          <Image
            src={images[currentIndex]}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={currentIndex === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60" />

          {/* Trailer Button */}
          {trailer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <a 
                href={trailer}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 text-white bg-crimson/90 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-crimson transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <Play className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Watch Trailer</span>
              </a>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {images.length > 1 && (
        <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => onImageChange(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function ACWPage() {
  const [selectedFilm, setSelectedFilm] = useState(films[0]);
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  return (
    <div className="min-h-screen bg-zinc-950 relative">
      {/* Hero Section */}
      <motion.div 
        ref={containerRef}
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24"
        style={{ opacity, scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-950/95 to-zinc-950" />

        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Main Card */}
            <motion.div 
              className="lg:col-span-2 relative h-[70vh] rounded-2xl overflow-hidden group"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/crimepolarbear/film posters online25  jpegs/trilogy town 3d-24 .png"
                alt="ACW Trilogy"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight"
                >
                  A Cambodian Winter®
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-wrap gap-3"
                >
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white">Drama</span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white">Coming of Age</span>
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white">Adventure</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Side Cards */}
            <div className="lg:col-span-1 grid grid-cols-1 gap-6">
              {/* Description Card */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-white mb-4">The Trilogy</h2>
                <p className="text-zinc-300 leading-relaxed">
                  A trilogy following the journey of Pim, drawing inspiration from Francois Truffaut's
                  "The Antoine Doinel cycle" and Satyajit Ray's "The Apu Trilogy".
                </p>
              </motion.div>

              {/* Quick Stats Card */}
              <motion.div 
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm text-zinc-400 uppercase tracking-wider mb-2">Films</h3>
                    <p className="text-white font-medium">3 Feature Films</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-zinc-400 uppercase tracking-wider mb-2">Timeline</h3>
                    <p className="text-white font-medium">2024 - 2025</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-zinc-400 uppercase tracking-wider mb-2">Location</h3>
                    <p className="text-white font-medium">Cambodia</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>

        {/* The Evolution of Pim Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="bg-zinc-900/50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-white mb-8">The Evolution of Pim</h3>
            <p className="text-zinc-300 text-lg leading-relaxed mb-12 max-w-4xl">
              At the heart of the trilogy is Pim, portrayed by the magnetic Cambodian actress of the same name. 
              Her character's journey spans all three films, evolving from an optimistic young girl in "Clever Creatures®" 
              to complex transformations in "Hail Tiger King®" and "Slowmotion Superstars®".
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {films.map((film, index) => (
                <motion.button
                  key={film.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`text-left p-8 rounded-2xl transition-all duration-300 ${
                    selectedFilm.title === film.title
                      ? 'bg-zinc-800/90 ring-1 ring-white/20'
                      : 'bg-zinc-900/50 hover:bg-zinc-800/50'
                  }`}
                  onClick={() => {
                    setSelectedFilm(film);
                    setCurrentPosterIndex(0);
                  }}
                >
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-2xl font-bold text-white">{film.title}</h4>
                      <p className="text-zinc-400">{film.status}</p>
                    </div>
                    <p className="text-zinc-300 text-base leading-relaxed">
                      {index === 0 && "A story of innocence and hope, following young Pim's search for family."}
                      {index === 1 && "Exploring Pim's past and its impact on her present, a tale of love and regret."}
                      {index === 2 && "A bold shift in tone, taking Pim's character into uncharted territory."}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Selected Film Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilm.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Poster Gallery */}
            <div className="h-[600px]">
              <ImageGallery
                images={selectedFilm.posters}
                currentIndex={currentPosterIndex}
                onImageChange={setCurrentPosterIndex}
                trailer={selectedFilm.trailer}
              />
            </div>

            {/* Film Details */}
            <div className="space-y-8 bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-3xl font-bold text-white mb-2">{selectedFilm.title}</h2>
                <p className="text-xl text-crimson font-medium">{selectedFilm.year}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <h3 className="text-sm text-zinc-400 uppercase tracking-wider font-medium">Synopsis</h3>
                <p className="text-zinc-200 leading-relaxed whitespace-pre-line">{selectedFilm.synopsis}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <h3 className="text-sm text-zinc-400 uppercase tracking-wider font-medium">Specifications</h3>
                <p className="text-zinc-200 leading-relaxed whitespace-pre-line text-sm">{selectedFilm.specs}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-sm text-zinc-400 uppercase tracking-wider font-medium">Credits</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(selectedFilm.credits).map(([role, value]) => {
                      if (role === 'cast') return null;
                      return (
                        <div key={role} className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors duration-300">
                          <p className="text-zinc-400 text-xs uppercase tracking-wider mb-1">
                            {role.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <p className="text-white font-medium">
                            {Array.isArray(value) ? value.join(" & ") : value}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  
                  {selectedFilm.credits.cast && (
                    <div>
                      <p className="text-zinc-400 text-xs uppercase tracking-wider mb-3 font-medium">Cast</p>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(selectedFilm.credits.cast).map(([role, actor]) => (
                          <div key={role} className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors duration-300">
                            <p className="text-white font-medium mb-1">{actor}</p>
                            <p className="text-zinc-400 text-xs">{role}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 