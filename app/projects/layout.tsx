export default function ProjectsLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900/50 to-black">
			{/* Background elements */}
			<div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay pointer-events-none" />
			<div className="absolute inset-0 bg-gradient-to-tr from-zinc-900/20 via-transparent to-zinc-900/20 pointer-events-none" />
			
			{/* Content */}
			<div className="relative z-10">
				{children}
			</div>
		</div>
	);
}
