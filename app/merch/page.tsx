import Image from 'next/image';

export default function MerchPage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">Merchandise</h1>
        <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
          <Image
            src="/merch/preview.jpg" // Add your merch preview image
            alt="Crimson Films Merchandise Preview"
            fill
            className="object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-crimson mb-4">Coming Soon</h2>
        <p className="text-zinc-400">
          Our exclusive merchandise collection is currently in production. 
          Sign up below to be notified when our store launches.
        </p>
        <div className="mt-8">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-l-md bg-zinc-800 border-zinc-700 focus:border-crimson focus:ring-crimson"
          />
          <button className="px-4 py-2 bg-crimson text-white rounded-r-md hover:bg-crimson/90">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
} 