import Image from 'next/image';

interface CrewMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const crewMembers: CrewMember[] = [
  // Add your crew members here
  {
    name: "John Doe",
    role: "Director",
    image: "/crew/director.jpg",
    bio: "Award-winning director with over 10 years of experience..."
  },
  // Add more crew members
];

export default function CrewPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-zinc-100 mb-12 text-center">Our Crew</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {crewMembers.map((member) => (
          <div key={member.name} className="bg-zinc-900/50 rounded-lg p-6">
            <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-bold text-zinc-100">{member.name}</h2>
            <p className="text-crimson mb-2">{member.role}</p>
            <p className="text-zinc-400">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 