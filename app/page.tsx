import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Crew", href: "/crew" },
  { name: "Contact", href: "/contact" },
  { name: "Merch", href: "/merch" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-lighten contrast-125 saturate-150">
        <div className="relative w-[900px] h-[900px]">
          <Image
            src="/logo/Untitled_design__5_-removebg-preview.png"
            alt="Background Logo"
            fill
            className="object-contain brightness-125"
            priority
          />
        </div>
      </div>

      <nav className="my-16 animate-fade-in z-10">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        crimsonpolarbear©
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in z-10">
        <h2 className="text-sm text-zinc-500">
          Cambodian Film Production
        </h2>
      </div>
    </div>
  );
}
