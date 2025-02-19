'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CrewMember {
  name: string;
  role: string;
  image: string;
  additionalImages?: string[];
  bio: string;
  location?: string;
}

const crewMembers: CrewMember[] = [
  {
    name: "Forest",
    role: "Director / Writer / Producer / Editor / Designer",
    image: "/crimepolarbear/cp-crew picts /forest publicity pic 2.jpg",
    additionalImages: [
      "/crimepolarbear/cp-crew picts /forest kid photo.png",
      "/crimepolarbear/cp-crew picts /forest photo booth.jpg"
    ],
    bio: "Forest finished his first feature film, \"Life Is Nice\" featuring Steve Buscemi, at the tender age of 20. Now based in Siem Reap, Cambodia, he has been working with orphans and poor kids while creating \"A Cambodian Trilogy\" -- \"Clever Creatures®\", \"Hail Tiger King®\" and \"Slowmotion Superstars®\". His work both draws on real lives and teaches craft/trade for their future.",
    location: "Siem Reap, Cambodia"
  },
  {
    name: "Jaime Reynoso",
    role: "Director of Photography / Director",
    image: "/crimepolarbear/cp-crew picts /jaime.png",
    additionalImages: [
      "/crimepolarbear/cp-crew picts /tito reynoso DP.png"
    ],
    bio: "Born in Mexico City he started practicing still photography at age 16. His film set debut was as the camera trainee on the film Like Water for Chocolate. He finished his MFA in cinematography at the American Film Institute. Reynoso has shot more than 15 feature films, including work for Apple+, Netflix, and HBO. His collaborations include \"The New Look\", \"Bloodline\", and \"Ballers\". He shot both features \"Clever Creatures®\" and \"Hail Tiger King®\" in Cambodia with Forest.",
    location: "Mexico City, Paris, Florida Keys"
  },
  {
    name: "Bopha Phuong Lav",
    role: "Producer / Fixer / Translator / Wardrobe",
    image: "/crimepolarbear/cp-crew picts /bopha body.jpg",
    additionalImages: [
      "/crimepolarbear/cp-crew picts /bopha crew.JPG"
    ],
    bio: "Born in refugee camp in Cambodia, Bopha has more stories than most storytellers have in their whole career. From the ashes the phoenix will rise. Bopha has worked as a fixer around Cambodia for the last years, on 3 feature films in the \"a Cambodian winter' trilogy, international films shot all over Cambodia, as well as some short films. She is the co-producer on both of the films.",
    location: "Cambodia"
  },
  {
    name: "Mark Van Hoen",
    role: "Composer and Sound Designer",
    image: "/crimepolarbear/cp-crew picts /mark van hoen sound.png",
    bio: "LA based UK born Mark Van Hoen has a sonic history that is not only impressive, but to those in the know - legendary. His own brand of melancholic electronic music has been revered by fans around the globe since his first record release in the early 90's. Mark's foray into the new electronic etched realms of drone and dance pop saw releases from Touch, Editions Mego, R&S, Slumberland, to Pomperipossa Records and still counting.",
    location: "Los Angeles, USA"
  },
  {
    name: "Neil Halsted",
    role: "Musician / Film Composer",
    image: "/crimepolarbear/cp-crew picts /neil.png",
    bio: "Neil is the leader of the bands Slowdive, and Mojave 3, as well as a worldwide respected solo artist. He has made over 10 albums with many record companies: (4AD, Brushfire records, Creation). His band Slowdive, has had nothing short of a 2nd coming, as the band has been selling out shows all over the world, 20yrs later, after their break up. Neil wrote original songs and scored \"I'm the Elephant, U Are the Mouse\" and contributed music to \"Clever Creatures®\".",
  },
  {
    name: "James Duval",
    role: "Actor / Producer",
    image: "/crimepolarbear/cp-crew picts /jimmy duval .png",
    bio: "Born in Detroit, Michigan in 1972. James Duval has built a career on playing alienated, melancholic lost boys. Part of his ability to capture such alienation comes from the actor's own real-life experiences. Perhaps best known for his work as a black-clad muse for Gregg Araki, in films like \"Totally F***ed Up\", \"The Doom Generation\", & \"Nowhere\". He has also appeared in \"SLC Punk\", \"Go\", \"Independence Day\", and the iconic \"Donnie Darko\".",
    location: "Los Angeles, USA"
  }
];

const ImageGallery = ({ 
  images, 
  currentIndex,
  onImageChange 
}: { 
  images: string[];
  currentIndex: number;
  onImageChange: (index: number) => void;
}) => {
  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:hidden" />
        </motion.div>
      </AnimatePresence>
      
      {images.length > 1 && (
        <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => onImageChange(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const QuickView = ({ member, onClose }: { member: CrewMember; onClose: () => void }) => {
  const allImages = [member.image, ...(member.additionalImages || [])];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [member.name]);

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
        {/* Close button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={onClose}
          className="absolute top-6 right-6 z-50 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 backdrop-blur-sm transition-all duration-300 hover:rotate-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </motion.button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Section */}
          <div className="relative h-[350px] md:h-[85vh] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10" />
            <ImageGallery 
              images={allImages} 
              currentIndex={currentImageIndex}
              onImageChange={setCurrentImageIndex}
            />
            
            {/* Mobile header overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent pb-6 pt-20 px-8 md:hidden z-20">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-4"
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-crimson/20 text-white/90 text-sm backdrop-blur-sm border border-crimson/30">
                  {member.role.split(' / ')[0]}
                </span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-white mb-2"
              >
                {member.name}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/80 font-medium text-sm tracking-wide"
              >
                {member.role.split(' / ').slice(1).join(' • ')}
              </motion.p>
            </div>
          </div>

          {/* Content Section */}
          <div className="relative bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-sm max-h-[350px] md:max-h-[85vh] overflow-y-auto custom-scrollbar">
            <div className="p-8 md:p-12 space-y-8">
              {/* Desktop header */}
              <div className="hidden md:block">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-4"
                  >
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-crimson/20 text-white/90 text-sm backdrop-blur-sm border border-crimson/30">
                      {member.role.split(' / ')[0]}
                    </span>
                  </motion.div>
                  <h2 className="text-5xl font-bold text-white tracking-tight">
                    {member.name}
                  </h2>
                  <p className="text-white/80 font-medium text-lg tracking-wide">
                    {member.role.split(' / ').slice(1).join(' • ')}
                  </p>
                </motion.div>
              </div>

              {/* Location */}
              {member.location && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-800/50 text-zinc-100 text-sm backdrop-blur-sm">
                    <span className="w-4 h-4 mr-2">📍</span>
                    {member.location}
                  </span>
                </motion.div>
              )}

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <div className="prose prose-lg prose-invert max-w-none">
                  {member.bio.split('. ').map((sentence, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (index * 0.1) }}
                      className="text-zinc-300 leading-relaxed mb-4"
                    >
                      {sentence.trim()}.
                    </motion.p>
                  ))}
                </div>
              </motion.div>

              {/* Gallery navigation */}
              {allImages.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-4 hidden md:block"
                >
                  <p className="text-zinc-400 text-sm mb-3">Gallery</p>
                  <div className="flex gap-3">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-16 h-1 rounded-full transition-all ${
                          index === currentImageIndex ? 'bg-crimson' : 'bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CrewCard = ({ member, index, onClick }: { member: CrewMember; index: number; onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.21, 0.68, 0.47, 0.98]
      }}
      className="relative group cursor-pointer h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-900/40 backdrop-blur-sm h-full
        after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/80 after:to-transparent after:opacity-0 group-hover:after:opacity-100 after:transition-opacity duration-500">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-all duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index === 0}
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          
          {/* Enhanced border and glow effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-crimson/20 via-crimson/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" />
        </div>

        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-8 text-white"
          style={{
            transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
            transition: 'transform 0.5s ease-out'
          }}
        >
          {/* Role tag */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-crimson/20 text-white/90 text-sm backdrop-blur-sm border border-crimson/30">
              {member.role.split(' / ')[0]}
            </span>
          </motion.div>

          <motion.h2 
            className="text-4xl font-bold mb-3 tracking-tight text-white"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            {member.name}
          </motion.h2>
          
          <div className="space-y-4">
            {/* Additional roles */}
            <p className="text-white/80 font-medium text-sm tracking-wide">
              {member.role.split(' / ').slice(1).join(' • ')}
            </p>
            
            {member.location && (
              <p className="text-zinc-100 text-sm flex items-center opacity-90">
                <span className="inline-block w-4 h-4 mr-2">📍</span>
                {member.location}
              </p>
            )}
          </div>

          <div className="mt-6 transform transition-all duration-500 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-all text-white">
              <span>View Profile</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function CrewPage() {
  const [selectedMember, setSelectedMember] = useState<CrewMember | null>(null);

  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-zinc-800/20 to-transparent opacity-50" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10" />

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 relative">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.21, 1.02, 0.47, 0.98] }}
          className="w-full max-w-[150px] mx-auto mb-12 relative aspect-square"
        >
          <Image
            src="/logo/Untitled_design__5_-removebg-preview.png"
            alt="Crime Polar Bear Logo"
            fill
            className="object-contain"
            sizes="150px"
            priority
          />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <motion.span 
              className="inline-flex items-center px-4 py-2 rounded-full bg-crimson/10 text-white text-sm backdrop-blur-sm border border-crimson/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Meet the Team
            </motion.span>
          </div>
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            The Crew
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            A collective of passionate storytellers, visionaries, and craftspeople dedicated to bringing compelling narratives to life
          </p>
        </motion.div>

        {/* Featured Project Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <div className="bg-gradient-to-br from-zinc-900/60 to-black/50 backdrop-blur-lg rounded-2xl overflow-hidden">
            <div className="relative aspect-[21/9]">
              <Image
                src="/crimepolarbear/film posters online25  jpegs/trilogy town 3d-24 .png"
                alt="ACW Trilogy"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute inset-0 flex items-end p-8">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-crimson/20 text-white/90 text-sm backdrop-blur-sm border border-crimson/30 mb-4">
                    Current Production
                  </span>
                  <h2 className="text-3xl font-bold text-white mb-4">A Cambodian Winter® Trilogy</h2>
                  <p className="text-zinc-300 leading-relaxed mb-6">
                    Our team is currently focused on completing this ambitious trilogy, 
                    bringing together talent from across the globe to tell this compelling story.
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/about"
                      className="group inline-flex items-center gap-2 px-6 py-3 bg-crimson/90 hover:bg-crimson text-white rounded-xl backdrop-blur-sm transition-all duration-300"
                    >
                      <span>About Us</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Behind the Scenes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
          <h2 className="text-2xl font-bold text-white mb-8">Behind the Scenes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "/crimepolarbear/cp-crew picts /bopha crew.JPG",
              "/crimepolarbear/cp-crew picts /forest photo booth.jpg",
              "/crimepolarbear/cp-crew picts /tito reynoso DP.png",
              "/crimepolarbear/cp-crew picts /forest kid photo.png"
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <Image
                  src={image}
                  alt="Behind the scenes"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awards & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 bg-gradient-to-br from-zinc-900/60 to-black/50 backdrop-blur-lg rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-8">Recognition & Collaborations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <span className="text-4xl">🎬</span>
              <h3 className="text-xl font-bold text-white">Global Productions</h3>
              <p className="text-zinc-400">Projects spanning USA, Cambodia, and beyond</p>
            </div>
            <div className="space-y-4">
              <span className="text-4xl">🤝</span>
              <h3 className="text-xl font-bold text-white">Industry Partners</h3>
              <p className="text-zinc-400">Collaborations with Netflix, HBO, and Apple+</p>
            </div>
            <div className="space-y-4">
              <span className="text-4xl">⭐</span>
              <h3 className="text-xl font-bold text-white">Notable Works</h3>
              <p className="text-zinc-400">Featured in international film festivals</p>
            </div>
          </div>
        </motion.div>

        {/* Crew Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {crewMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-zinc-900 shadow-lg shadow-black/20 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-black/30">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-75" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-300">
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-crimson/20 text-white/90 text-sm backdrop-blur-sm border border-crimson/30 mb-3"
                  >
                    {member.role.split(' / ')[0]}
                  </motion.span>
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 + 0.4 }}
                    className="text-2xl font-bold text-white mb-2"
                  >
                    {member.name}
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 + 0.5 }}
                    className="text-zinc-300 text-sm line-clamp-2"
                  >
                    {member.role.split(' / ').slice(1).join(' • ')}
                  </motion.p>
                  
                  {member.location && (
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 + 0.6 }}
                      className="text-zinc-300 text-sm mt-2 flex items-center opacity-80"
                    >
                      <span className="inline-block w-4 h-4 mr-1">📍</span>
                      {member.location}
                    </motion.p>
                  )}

                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15 + 0.7 }}
                    className="mt-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                  >
                    <span className="inline-flex items-center text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-all text-white">
                      View Profile
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <QuickView 
            member={selectedMember} 
            onClose={() => setSelectedMember(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
} 

// Add this CSS somewhere in your global styles
const globalStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`; 