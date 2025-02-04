import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Card } from "../components/card";

export default function ProjectsPage() {
  const projects = [
    {
      title: "ACW Trilogy - Film 1",
      slug: "acw-1",
      posterImage: "/posters/acw-1.jpg",
      description: "First film in the ACW trilogy"
    },
    // Add other films here
  ];

  return (
    <div className="relative pb-16">
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Our Film Projects
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.slug}>
              <Link href={`/projects/${project.slug}`}>
                <article className="relative w-full h-full p-4 md:p-8">
                  <div className="relative w-full aspect-[2/3] mb-4">
                    <Image
                      src={project.posterImage}
                      alt={project.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-zinc-100">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-zinc-400">
                    {project.description}
                  </p>
                </article>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Link 
            href="/projects/posters"
            className="inline-block bg-zinc-800 text-white px-6 py-3 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            View All Posters
          </Link>
        </div>
      </div>
    </div>
  );
}
