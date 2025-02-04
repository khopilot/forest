import Image from 'next/image';

interface Poster {
  id: string;
  title: string;
  image: string;
  description: string;
}

const posters: Poster[] = [
  // Add your posters here
  {
    id: "1",
    title: "ACW Trilogy - Film 1",
    image: "/posters/acw-1.jpg",
    description: "Official poster for the first film in the ACW trilogy"
  },
  // Add more posters
];

export default function PostersPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-zinc-100 mb-12">Film Posters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posters.map((poster) => (
          <div key={poster.id} className="group relative">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
              <Image
                src={poster.image}
                alt={poster.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold text-zinc-100">{poster.title}</h2>
              <p className="text-zinc-400">{poster.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 