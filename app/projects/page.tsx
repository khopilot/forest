'use client';

import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Card } from "../components/card";
import { ArrowRight, Play, Info, ChevronDown, Volume2, VolumeX } from "lucide-react";

// Add interfaces for project types
interface BaseProject {
  title: string;
  slug: string;
  status: string;
  synopsis?: string;
  tagline?: string;
  type?: string;
  year?: string;
  subtitle?: string;
  logo?: string;
  poster?: string;
  specs?: string;
  trailer?: string;
  credits: {
    director: string;
    cast?: { [key: string]: string | undefined };
    [key: string]: any;
  };
}

interface ACWProject extends BaseProject {
  posters: string[];
}

interface CompletedProject extends BaseProject {
  poster: string;
}

interface DevelopmentProject extends BaseProject {
  poster: string;
}

interface PlannedProject extends BaseProject {
  logline?: string;
}

type Project = ACWProject | CompletedProject | DevelopmentProject | PlannedProject;

// Add after imports
declare global {
  interface Window {
    Vimeo: {
      Player: new (element: HTMLIFrameElement) => {
        setVolume: (volume: number) => void;
      };
    };
  }
}

const ImageGallery = ({ 
  images, 
  currentIndex,
  onImageChange,
  trailer,
  logo 
}: { 
  images: string[];
  currentIndex: number;
  onImageChange: (index: number) => void;
  trailer?: string;
  logo?: string;
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Logo Overlay */}
          {logo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 left-6 w-32 h-32"
            >
              <Image
                src={logo}
                alt="Film Logo"
                fill
                className="object-contain"
                sizes="128px"
              />
            </motion.div>
          )}

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
                className="inline-flex items-center gap-2 text-white bg-crimson/90 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-crimson transition-colors group"
                onClick={(e) => e.stopPropagation()}
              >
                <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Watch Trailer</span>
              </a>
            </motion.div>
          )}
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

const VideoBackground = () => {
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleSound = () => {
    if (iframeRef.current && window.Vimeo) {
      const player = new window.Vimeo.Player(iframeRef.current);
      if (isMuted) {
        player.setVolume(1);
      } else {
        player.setVolume(0);
      }
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    // Load Vimeo Player API
    const script = document.createElement('script');
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Video overlay gradients for cinematic effect */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        
        {/* Cinematic letterbox effect */}
        <div className="absolute top-0 left-0 right-0 h-[10vh] bg-black" />
        <div className="absolute bottom-0 left-0 right-0 h-[10vh] bg-black" />
      </div>

      {/* Animated grain overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] z-10" />

      {/* Video iframe */}
      <div className="relative w-full h-full">
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/237324792?background=1&autoplay=1&loop=1&byline=0&title=0&muted=${isMuted ? 1 : 0}`}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] scale-[1.1]"
          allow="autoplay; fullscreen"
          style={{ pointerEvents: 'none' }}
        />
      </div>

      {/* Sound control with enhanced feedback */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={toggleSound}
        className="absolute bottom-8 right-8 z-20 p-3 rounded-full bg-black/20 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/40 transition-all duration-300 group"
      >
        <motion.div
          animate={{ 
            scale: isMuted ? 1 : [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 1, 
            repeat: isMuted ? 0 : Infinity,
            repeatDelay: 1
          }}
          className="relative"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isMuted ? 0 : 1 }}
            className="absolute -right-1 -top-1 w-2 h-2 bg-crimson rounded-full"
          />
        </motion.div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 text-sm text-white/80 bg-black/40 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-sm">
          {isMuted ? 'Unmute video' : 'Mute video'}
        </span>
      </motion.button>
    </div>
  );
};

const projects = {
  acwTrilogy: [
    {
      title: "Clever Creatures®",
      slug: "clever-creatures",
      status: "Completed",
      logo: "/crimepolarbear/film posters online25  jpegs/3d logos for extra picture on the poster_crew_synopsis page before/C_C 3d metal 24.png",
      posters: [
        "/crimepolarbear/film posters online25  jpegs/trilogy town 3d-24 .png",
        "/crimepolarbear/film posters online25  jpegs/S_X walk neon 24.png",
        "/crimepolarbear/film posters online25  jpegs/S_X neon moto24.png"
      ],
      synopsis: `Set against the exotic beauty and enchanting ancient culture of Cambodia, two young girls embark upon a journey of yearning in search of the family they never had. Carrying with them an optimistic joy and infectious love for life, they set out unaware of the dangers and hardships of life on the streets.

Pim, a strong independent girl on the cusp of adolescence, and her younger 'sister' Chamron, share a special bond, having grown up together without parents. When financial trouble looms at the orphanage, they decide to run away and find a better life. Travelling through sweeping green rice fields and stunning panoramic vistas of rural Cambodia, they slowly drift toward the city.

Here amongst the noisy busy streets, speckled with homeless children and beggars bereft of limbs, are the human remnants of the fallen Khmer Rouge regime. The urban kaleidoscope is awash with jostling traffic, bustling markets, and an endless sea of faces. It leaves the girls searching for salvation, struggling for charity to survive.`,
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
      },
      year: "2024"
    },
    {
      title: "Hail Tiger King®",
      slug: "hail-tiger-king",
      status: "Completed - Release 2025",
      logo: "/crimepolarbear/film posters online25  jpegs/3d logos for extra picture on the poster_crew_synopsis page before/HTK 3d metal 24.png",
      posters: [
        "/crimepolarbear/film posters online25  jpegs/HTK small temple sit 24.png",
        "/crimepolarbear/film posters online25  jpegs/HTK snake 1.png"
      ],
      synopsis: `"Does our past affect our future? Are we so jaded that our past loves keep us from ever loving freely ever again? A tormented cruel cycle of life."

Kith, an attractive Cambodian man early 30's, is living the life of working to survive, not living to live. As a child Kith went on a magical adventure that changed his life forever.

He daydreams of the past, the future, and somewhere in between. Never living in the present. We cut back and forth between all of his journeys, and experiences.

When he was young and full of life, he met two young girls Pim and Chamron, going on a road trip/journey of a lifetime. Never to let go of this first love.`,
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
      trailer: "https://vimeo.com/237324792",
      year: "2025"
    },
    {
      title: "Slowmotion Superstars®",
      slug: "slowmotion-superstars",
      status: "Post-Production",
      logo: "/crimepolarbear/film posters online25  jpegs/3d logos for extra picture on the poster_crew_synopsis page before/S_X 3d metal 24.png",
      posters: [
        "/crimepolarbear/film posters online25  jpegs/S_X stand sideways 24.png",
        "/crimepolarbear/film posters online25  jpegs/S_X walk neon 24.png",
        "/crimepolarbear/film posters online25  jpegs/S_X neon moto24.png"
      ],
      synopsis: `A black comedic, low-fi /sci-fi -scary- adventure tale with a babyschool heist and some drama thrown in for good measure. Poetry meets commercial on the playground of our sub conscious.

"Everything exists, here, there, anywhere. We are not the only ones living in this world, never were, and never will be."

South East Asia. Navi: a daughter to a Hindu goddess, Bunny: a toy that has become human, Pim: a prostitute going back in time, and one bad cowboy demon are about to do a babyschool heist. Thrown in a few more bad, maybe people, from another time space. What could go wrong? Everything and more!`,
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
      },
      year: "2025"
    }
  ],
  completedFilms: [
    {
      title: "I'm the Elephant, You Are the Mouse",
      slug: "elephant-mouse",
      status: "Redux/Remaster Coming",
      poster: "/crimepolarbear/film posters online25  jpegs/hj poster for imdb pro.png",
      synopsis: `In a world of lies, there is always one truth, One self.....

Port an artist, is caught in the fast life of Los Angeles. Oliver, Port's best friend narrates as Port gets sucked into an "on again-off again" relationship with Alice, and a drug addiction. Port's story is universal in it's search for truth and meaning, as his travels around the world bring him to fully realize the love he needs the most is his own.`,
      specs: `Duration: 116min 
Shooting Format: super 16mm
Aspect Ratio: 1:85`,
      credits: {
        director: "Forest Wise",
        cinematographer: "Lawrene Schweich",
        score: "Slowdive",
        assistantProducer: "Mike Dytri",
        editor: "Paul Heiman",
        reduxEditor: "Freddy Fingers Jr.",
        cast: {
          "Port": "Ferris Christopher George",
          "Oliver": "Mike Dytri",
          "Aliah": "Christina Una"
        }
      },
      year: "2020"
    },
    {
      title: "Life is Nice®",
      slug: "life-is-nice",
      status: "Redux/Remaster Coming",
      poster: "/crimepolarbear/film posters online25  jpegs/life is nice pict.png",
      synopsis: `Set in in suburban Los Angeles, In the vain of "Stranger than paradise & Slacker", "Life is Nice..." is a post, post-modern tale of love, friendship, perhaps bordem and a girl. 

While following their often humorous adventures, the film explores the relationship between two old friends, Josh (Forest), and Silo (Mike Dytri), as they try to find the meaning in their quite often meaningless existence. The film's pivotal character is Clara (Kia Collin), Josh's domineering and often manipulative girlfriend.  As Clara plays the emotions of the two friends against each other, they discover just what their friendship is made of.

Featuring Steve Buscemi in best comic cameo ever!!!!`,
      specs: `Duration: 96min 
Shooting Format: super 16MM 
Aspect Ratio: 1.85`,
      credits: {
        director: "Forest Wise",
        coProducers: ["Mike Dytri", "Matcheck Malish"],
        cinematographer: "Eric Swanson",
        score: "Jesse Loya",
        editor: "Matcheck Malish",
        reduxEditor: "Freddy Fingers Jr.",
        cast: {
          "Liquor Store Guy": "Steve Buscemi",
          "Silo": "Mike Dytri",
          "Josh": "Forest Wise",
          "Clara": "Kia Collin"
        }
      },
      year: "1996"
    },
    {
      title: "Hussy®: Life is Nice 2000®",
      slug: "hussy",
      status: "Completed",
      poster: "/crimepolarbear/film posters online25  jpegs/hussy film.png",
      synopsis: `Think All in the Family meets Swingers meets the Archies on acid and crack with a little One Flew Over The Cuckoo's Nest thrown in for good measure.

A black comedic adventure into the surreal crazy mixed up world of Josh and Silo and their freaky friends, jerked up love lives, and hustling ways.

AN ABSTRACT PAINTING IN THE WORLD OF CONTROLLED FILMMAKING!!

Josh and Silo, hipsters, pop-culture babies, best friends since they can remember, sit around their motor home at a trailer park overlooking the beautiful Pacific Ocean, talking about almost nothing. Questioning their lives and always wondering:

Who's a pedophile? Why did you shag my mother? Where do you go when your guinea pig is gone? What do you do when your wet dream girl turns out to be a transsexual?`,
      specs: `Duration: 15 min 
Shooting Format: super 16mm 
Aspect Ratio: 2:39:1`,
      credits: {
        director: "Forest Wise",
        executiveProducers: ["Tanya Stephens", "Melinda Esquibal"],
        cinematographer: "Jaime Reynoso",
        editor: "Paul Heimen",
        cast: {
          "Silo": "Joss Godard",
          "Josh": "Forest Wise",
          "Booker": "Corin Nemic",
          "Gina": "Rebecca Lord",
          "Kate": "Genevive Maylan"
        }
      },
      trailer: "https://vimeo.com/208859574",
      year: "2000"
    }
  ],
  inDevelopment: [
    {
      title: "Woman: The World of Mine",
      slug: "woman",
      status: "Development",
      poster: "/crimepolarbear/film posters online25  jpegs/woman-hoo.png",
      synopsis: `Shot in Khom Pong Plouk fishing village is Siem Reap, using real locals and a few professionals. The video is love letter to woman all over the world, and what they do to make it a better place for all. Be free, dance like there is no tomorrow, and when tomorrow comes, dance again.`,
      credits: {
        director: "Forest Wise",
        music: "HOO"
      },
      trailer: "https://vimeo.com/401265611"
    },
    {
      title: "The Murder Hornets®",
      slug: "murder-hornets",
      status: "Development",
      poster: "/crimepolarbear/film posters online25  jpegs/murder hornets 3d 24.png",
      tagline: `"what could go wrong?"`,
      credits: {
        director: "Forest Wise",
        cinematographer: "Forest Wise"
      }
    },
    {
      title: "Pet Shops: Pet Shop®",
      slug: "pet-shops",
      status: "Development",
      poster: "/crimepolarbear/film posters online25  jpegs/the dharma cubs24.png",
      synopsis: `A puppet and his dream to escape his destiny of being a cure for AIDS, In world of lies.
"the muppets on acid."`,
      credits: {
        director: "Forest Wise",
        cinematographer: "Forest Wise"
      }
    }
  ],
  plannedProjects: [
    {
      title: "Faded Young Gods®",
      slug: "faded-young-gods",
      status: "In Development",
      logo: "/crimepolarbear/film posters online25  jpegs/hj poster for imdb pro.png",
      synopsis: `Françoise lamure'. Everyone wants her. Everyone needs her. Two jaded LA hustlers are hired by a super wealthy family to track down their daughter somewhere in Asia but where & why? 
 
They'll search anywhere, everywhere, because she's the answer, she's it, the prize..
 
We will meet different characters along the way; Buddhist monks, Thai hookers, Indian orphans, X pats, street hustlers, albino chief liars, etc. etc.`,
      credits: {
        director: "Forest Wise",
        writer: "Forest Wise",
        producer: "Forest Wise"
      },
      type: "Part of the HJ anthology+ story"
    },
    {
      title: "Cashmere Sabertooth®",
      slug: "cashmere-sabertooth",
      status: "In Development",
      type: "Part of the ACW trilogy",
      synopsis: `"death may be the greatest of all human blessings"…...socrates

Take everything you know or think you now and throw it to the wind and begin. "Cashmere Sabertooth", takes us on mind bending psychotic poetic bullet train ride to place where poetry meets commercial and they have a baby hydra.

A Black comedy, action, sci-fi, with a sharper edge than a samuri sword, and a great love story thrown in for good measure.`,
      credits: {
        director: "Forest Wise",
        writer: "Forest Wise",
        producer: "Forest Wise"
      }
    },
    {
      title: "Shot Out®",
      slug: "shot-out",
      status: "In Development",
      type: "Graphic Novel + TV Series",
      synopsis: `Los Angeles: 2069? In the year...well forget the year. Sometime in the future. An epidemic, City Scape Disease has wiped out most of the plants, animals, vegetables, and minerals.

Some people survived, some died, and others, they just mutated. The city is now a post-apocalyptic visual hell.
The epidemic was Government initiated, they wanted the perfect world, what they got was a mixed up reality.`,
      credits: {
        director: "Forest Wise",
        writer: "Forest Wise",
        producer: "Forest Wise"
      }
    },
    {
      title: "Always There Baby®",
      slug: "always-there-baby",
      status: "In Development",
      synopsis: `"Everyone is born with the right to love and be loved."

Always there baby, a hip love story, taking you to San Francisco, India and Paris. Worlds apart, but in the same universe.

A contemporary tale about a group of friends unraveling love, life and the meaning of their existence.`,
      credits: {
        director: "Forest Wise",
        writer: "Forest Wise",
        producer: "Forest Wise"
      },
      note: "Was in active development 20 years ago with Jean Marc Barr, Stellan Skarsgård, Norman Reedus signing LOI"
    },
    {
      title: "Starfish & Caviar®",
      slug: "starfish-caviar",
      status: "In Development",
      type: "Part of the ACW universe",
      logline: "A mermaid, a boy, and a dream to love in world of hate.",
      credits: {
        director: "Forest Wise",
        writer: "Forest Wise",
        producer: "Forest Wise"
      }
    },
    {
      title: "The Dharma Cubs®",
      slug: "dharma-cubs",
      status: "Active Development",
      type: "TV Series connected to Slowmotion Superstars®",
      synopsis: `A dramatic -baby heist- action- horror- adventure -black comedic tale with a little sci-fi and a love story thrown in for good measure. Poetry meets commercial on the playground of our sub conscious.

Christmas: South East Asia. Visna & Rin: Two young street jungle hustlers, Navi & Dao: two young sexy+ cute woman, one demon cowboy, a few too many creature weirdos, and a master heist, with a mermaid and witch or two, thrown in for crazy fun. What could go wrong?`,
      credits: {
        director: "Forest Wise",
        writer: "Forest Wise",
        producer: "Forest Wise"
      }
    }
  ]
};

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Enhanced Hero Section */}
      <motion.div 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity, scale }}
      >
        <VideoBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/50 to-zinc-950/80 z-20" />
        
        <div className="relative container mx-auto px-4 py-24 z-30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-crimson/10 text-white text-sm backdrop-blur-sm border border-crimson/20">
                Crimsonpolarbear© Productions
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-8xl font-bold text-white mb-8 tracking-tight"
            >
              Our Projects
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-zinc-400 mb-12 leading-relaxed"
            >
              From feature films to experimental works, explore our diverse portfolio of cinematic storytelling
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                href="#trilogy"
                className="inline-flex items-center gap-2 text-white bg-crimson px-8 py-4 rounded-xl hover:bg-crimson/90 transition-all group"
              >
                <span>View Latest Trilogy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="#completed"
                className="inline-flex items-center gap-2 text-white bg-zinc-800/50 backdrop-blur-sm px-8 py-4 rounded-xl hover:bg-zinc-800 transition-all group"
              >
                <span>All Projects</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Project Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-24"
          >
            <div className="text-center">
              <h3 className="text-4xl font-bold text-white mb-2">25+</h3>
              <p className="text-zinc-400">Years Experience</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-white mb-2">10+</h3>
              <p className="text-zinc-400">Feature Films</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-white mb-2">3</h3>
              <p className="text-zinc-400">Current Productions</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-white mb-2">5+</h3>
              <p className="text-zinc-400">In Development</p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 relative">
        {/* ACW Trilogy Section */}
        <section id="trilogy" className="mb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 to-transparent pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto text-center mb-16 relative z-10"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-crimson/10 text-white text-sm backdrop-blur-sm border border-crimson/20">
                Featured Work
              </span>
            </motion.div>
            
            <h2 className="text-7xl font-bold text-white mb-6 tracking-tight">
              A Cambodian Winter®
            </h2>
            <p className="text-xl text-zinc-400 mb-12 leading-relaxed max-w-3xl mx-auto">
              A trilogy not unlike Francois Truffaut's "The Antoine Doinel cycle" or
              Satyajit Ray's "The Apu Trilogy". Following the journey of Pim through
              three distinct yet connected films.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link
                href="/projects/acw"
                className="inline-flex items-center gap-2 text-white bg-crimson/90 backdrop-blur-sm px-8 py-4 rounded-xl hover:bg-crimson transition-all group"
              >
                <span>Explore the Trilogy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="https://vimeo.com/237324792"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white bg-zinc-800/50 backdrop-blur-sm px-8 py-4 rounded-xl hover:bg-zinc-800 transition-all group"
              >
                <Play className="w-4 h-4" />
                <span>Watch Trailer</span>
              </a>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
            {projects.acwTrilogy.map((film, index) => (
              <motion.div
                key={film.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group cursor-pointer relative"
                onClick={() => setSelectedProject(film)}
              >
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden">
                  <Image
                    src={film.posters[0]}
                    alt={film.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-50" />
                  
                  {/* Logo Overlay */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-6 left-6 w-32 h-32 transition-transform duration-300 group-hover:scale-110"
                  >
                    <Image
                      src={film.logo}
                      alt={`${film.title} Logo`}
                      fill
                      className="object-contain"
                      sizes="128px"
                    />
                  </motion.div>

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-6 transform transition-transform duration-300 group-hover:translate-y-0">
                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-crimson/20 text-white/90 text-sm backdrop-blur-sm border border-crimson/30 mb-3">
                          {film.status}
                        </span>
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2">{film.title}</h3>
                      <p className="text-zinc-300 text-sm">{film.year}</p>
                      
                      <div className="overflow-hidden pt-2">
                        <p className="text-zinc-300 text-sm transform transition-all duration-300 translate-y-8 group-hover:translate-y-0">
                          {film.synopsis?.split('.')[0]}.
                        </p>
                      </div>
                      
                      <div className="pt-4 transform transition-all duration-300 translate-y-8 group-hover:translate-y-0">
                        <span className="inline-flex items-center text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-all text-white">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Completed Films */}
        <section id="completed" className="mb-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 relative z-10"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-crimson/10 text-white text-sm backdrop-blur-sm border border-crimson/20">
                  Our Legacy
                </span>
              </motion.div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Completed Films</h2>
                  <p className="text-zinc-400 text-lg max-w-2xl">
                    A collection of our completed works, each representing a unique chapter in our storytelling journey
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <button className="text-white bg-zinc-800/50 backdrop-blur-sm p-3 rounded-xl hover:bg-zinc-800 transition-all group">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.completedFilms.map((film, index) => (
                <motion.div
                  key={film.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer relative"
                  onClick={() => setSelectedProject(film)}
                >
                  <div className="relative aspect-[2/3] rounded-2xl overflow-hidden">
                    <Image
                      src={film.poster}
                      alt={film.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-50" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 transform transition-transform duration-300">
                      <div className="space-y-3">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-crimson/20 text-white/90 text-sm backdrop-blur-sm border border-crimson/30 mb-3">
                            {film.status}
                          </span>
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold text-white mb-2">{film.title}</h3>
                        <p className="text-zinc-300 text-sm">{film.year}</p>
                        
                        <div className="overflow-hidden pt-2">
                          <p className="text-zinc-300 text-sm transform transition-all duration-300 translate-y-8 group-hover:translate-y-0">
                            {film.synopsis?.split('.')[0]}.
                          </p>
                        </div>
                        
                        <div className="pt-4 transform transition-all duration-300 translate-y-8 group-hover:translate-y-0 flex gap-2">
                          <span className="inline-flex items-center text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-all text-white">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </span>
                          
                          {film.trailer && (
                            <a
                              href={film.trailer}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center text-sm bg-crimson/20 hover:bg-crimson/30 px-4 py-2 rounded-full backdrop-blur-sm transition-all text-white"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Trailer
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* In Development */}
        <section className="mb-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 relative z-10"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-crimson/10 text-white text-sm backdrop-blur-sm border border-crimson/20">
                  Coming Soon
                </span>
              </motion.div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">In Development</h2>
                  <p className="text-zinc-400 text-lg max-w-2xl">
                    Explore our upcoming projects currently in various stages of development, from concept to pre-production
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.inDevelopment.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer relative"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-zinc-900">
                    {/* Project Image */}
                    <Image
                      src={project.poster}
                      alt={project.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Overlay Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 transform transition-all duration-300">
                      <div className="space-y-3">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-crimson/20 text-white/90 text-sm backdrop-blur-sm border border-crimson/30 mb-3">
                            {project.status}
                          </span>
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        
                        <div className="overflow-hidden pt-2">
                          <p className="text-zinc-300 text-sm transform transition-all duration-300 translate-y-8 group-hover:translate-y-0">
                            {project.synopsis?.split('.')[0] || project.tagline}
                          </p>
                        </div>
                        
                        <div className="pt-4 transform transition-all duration-300 translate-y-8 group-hover:translate-y-0 flex gap-2">
                          <span className="inline-flex items-center text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-all text-white">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </span>
                          
                          {project.trailer && (
                            <a
                              href={project.trailer}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center text-sm bg-crimson/20 hover:bg-crimson/30 px-4 py-2 rounded-full backdrop-blur-sm transition-all text-white"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Trailer
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-crimson/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Cinematic Lines */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1/4 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1/4 bg-gradient-to-t from-transparent via-white/20 to-transparent" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/4 h-[1px] bg-gradient-to-l from-transparent via-white/20 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Future Projects */}
        <section className="mb-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 relative z-10"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-crimson/10 text-white text-sm backdrop-blur-sm border border-crimson/20">
                  Future Vision
                </span>
              </motion.div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Planned Projects</h2>
                  <p className="text-zinc-400 text-lg max-w-2xl">
                    Discover our upcoming visions and stories in development, each representing a unique narrative waiting to be told
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.plannedProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group cursor-pointer relative"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative bg-gradient-to-br from-zinc-900/90 to-black/90 rounded-2xl overflow-hidden border border-white/10 hover:border-crimson/30 transition-all duration-300">
                    {/* Project Header */}
                    <div className="p-8">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-6"
                      >
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-crimson/20 text-white/90 text-sm backdrop-blur-sm border border-crimson/30">
                          {project.status}
                        </span>
                      </motion.div>

                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-crimson transition-colors">
                        {project.title}
                      </h3>

                      {project.type && (
                        <p className="text-zinc-400 text-sm mb-4">
                          {project.type}
                        </p>
                      )}

                      <div className="space-y-4">
                        {project.logline && (
                          <p className="text-zinc-300 text-sm italic">
                            "{project.logline}"
                          </p>
                        )}
                        
                        {project.synopsis && (
                          <p className="text-zinc-400 text-sm line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                            {project.synopsis}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Project Footer */}
                    <div className="p-6 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {project.credits?.writer && (
                            <span className="text-sm text-zinc-400">
                              Writer: {project.credits.writer}
                            </span>
                          )}
                        </div>
                        <span className="inline-flex items-center text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-all text-white">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>

                    {/* Hover Effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-crimson/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Cinematic Lines */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1/4 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-1/4 bg-gradient-to-t from-transparent via-white/20 to-transparent" />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/4 h-[1px] bg-gradient-to-l from-transparent via-white/20 to-transparent" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-900/90 rounded-2xl overflow-hidden max-w-4xl w-full my-8 relative"
              onClick={e => e.stopPropagation()}
            >
              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-50 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 backdrop-blur-sm transition-all duration-300 hover:rotate-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-[350px] md:h-[85vh]">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10" />
                  {'posters' in selectedProject ? (
                    <ImageGallery 
                      images={selectedProject.posters} 
                      currentIndex={currentPosterIndex}
                      onImageChange={setCurrentPosterIndex}
                      trailer={selectedProject.trailer}
                      logo={selectedProject.logo}
                    />
                  ) : (
                    <div className="relative h-full">
                      {selectedProject?.poster || selectedProject?.logo ? (
                        <Image
                          src={selectedProject.poster || selectedProject.logo || '/placeholder.jpg'}
                          alt={selectedProject.title}
                          width={800}
                          height={600}
                          className="w-full h-auto rounded-lg"
                        />
                      ) : null}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="relative bg-gradient-to-br from-zinc-900/50 to-black/50 backdrop-blur-sm max-h-[350px] md:max-h-[85vh] overflow-y-auto">
                  <div className="p-8 md:p-12 space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h2 className="text-4xl font-bold text-white tracking-tight">
                        {selectedProject.title}
                      </h2>
                      {selectedProject.subtitle && (
                        <p className="text-xl text-zinc-400 italic">
                          {selectedProject.subtitle}
                        </p>
                      )}
                      {selectedProject.year && (
                        <p className="text-crimson text-xl">{selectedProject.year}</p>
                      )}
                      {selectedProject.status && (
                        <span className="inline-block px-3 py-1 bg-crimson/80 text-white text-sm rounded-full">
                          {selectedProject.status}
                        </span>
                      )}
                      {selectedProject.type && (
                        <p className="text-zinc-400 text-sm mt-2">
                          {selectedProject.type}
                        </p>
                      )}
                    </motion.div>

                    {(selectedProject.synopsis || selectedProject.tagline) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                      >
                        <h3 className="text-lg text-zinc-400">
                          {selectedProject.tagline ? 'Tagline' : 'Synopsis'}
                        </h3>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                            {selectedProject.synopsis || selectedProject.tagline}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {selectedProject.specs && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                      >
                        <h3 className="text-lg text-zinc-400">Specifications</h3>
                        <p className="text-zinc-300 whitespace-pre-line">
                          {selectedProject.specs}
                        </p>
                      </motion.div>
                    )}

                    {selectedProject.credits && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-4"
                      >
                        <h3 className="text-lg text-zinc-400">Credits</h3>
                        <div className="space-y-4">
                          {Object.entries(selectedProject.credits).map(([role, value]) => {
                            if (role === 'cast') return null;
                            return (
                              <div key={role}>
                                <p className="text-zinc-300 capitalize">
                                  {role.replace(/([A-Z])/g, ' $1').trim()}
                                </p>
                                <p className="text-white font-medium">
                                  {Array.isArray(value) ? value.join(" & ") : value}
                                </p>
                              </div>
                            );
                          })}
                          
                          {selectedProject.credits.cast && (
                            <div>
                              <p className="text-zinc-300 mb-2">Cast</p>
                              <div className="grid grid-cols-2 gap-4">
                                {Object.entries(selectedProject.credits.cast).map(([role, actor]) => (
                                  <div key={role} className="text-sm">
                                    <p className="text-white font-medium">{actor}</p>
                                    <p className="text-zinc-400">{role}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {selectedProject.trailer && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <a 
                          href={selectedProject.trailer}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-white bg-crimson px-6 py-3 rounded-lg hover:bg-crimson/90 transition-colors"
                        >
                          <Play className="w-4 h-4" />
                          <span>Watch Trailer</span>
                        </a>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
