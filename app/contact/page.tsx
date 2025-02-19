"use client";
import { Github, Mail, Twitter, Send, Sparkles, MessageCircle, Phone, Facebook, Instagram, ArrowUpRight } from 'lucide-react';
import Link from "next/link";
import { Card } from "../components/card";
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const services = [
	{
		title: "Film Production",
		description: "Feature films, documentaries, and television shows with purpose & soul",
		icon: "🎬",
		categories: ["Feature Films", "Documentaries", "TV Series"]
	},
	{
		title: "Post Production",
		description: "Professional editing, color grading, and sound design services",
		icon: "🎨",
		categories: ["Editing", "Color Grading", "Sound Design"]
	},
	{
		title: "Creative Development",
		description: "Story development, scriptwriting, and creative consulting",
		icon: "✍️",
		categories: ["Scriptwriting", "Story Development", "Creative Direction"]
	},
	{
		title: "Production Services",
		description: "Location scouting, casting, and production management in Cambodia",
		icon: "🎥",
		categories: ["Location Services", "Casting", "Production Management"]
	}
];

const socialLinks = [
	{
		icon: <MessageCircle size={24} />,
		href: "https://t.me/yourhandle",
		label: "Telegram",
		color: "hover:text-blue-500"
	},
	{
		icon: <Phone size={24} />,
		href: "https://wa.me/yournumber",
		label: "WhatsApp",
		color: "hover:text-green-500"
	},
	{
		icon: <Facebook size={24} />,
		href: "https://facebook.com/yourpage",
		label: "Facebook",
		color: "hover:text-blue-600"
	},
	{
		icon: <Twitter size={24} />,
		href: "https://twitter.com/yourhandle",
		label: "Twitter",
		color: "hover:text-blue-400"
	},
	{
		icon: <Instagram size={24} />,
		href: "https://instagram.com/yourhandle",
		label: "Instagram",
		color: "hover:text-pink-500"
	}
];

export default function ContactPage() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [focusedField, setFocusedField] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: ''
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitted(true);
		// Here you would typically send the form data to your backend
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData(prev => ({
			...prev,
			[e.target.id]: e.target.value
		}));
	};

	return (
		<div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
			{/* Animated Background */}
			<div className="absolute inset-0 bg-gradient-radial from-zinc-800/20 to-transparent opacity-50" />
			<div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />
			
			{/* Floating particles */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(20)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-white/20 rounded-full"
						animate={{
							x: [
								Math.random() * window.innerWidth,
								Math.random() * window.innerWidth
							],
							y: [
								Math.random() * window.innerHeight,
								Math.random() * window.innerHeight
							],
						}}
						transition={{
							duration: Math.random() * 10 + 10,
							repeat: Infinity,
							ease: "linear"
						}}
					/>
				))}
			</div>

			<div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8 relative">
				{/* Logo with hover effect */}
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
					<Image
						src="/logo/Untitled_design__5_-removebg-preview.png"
						alt="Crime Polar Bear Logo"
						fill
						className="object-contain"
						sizes="200px"
						priority
					/>
				</motion.div>

				{/* Header and Services */}
				<div className="max-w-6xl mx-auto mb-16">
					<motion.h1 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-5xl sm:text-7xl font-bold text-white mb-8 text-center tracking-tight relative group"
					>
						Get in Touch
						<motion.span
							className="absolute -right-8 top-0"
							animate={{
								rotate: [0, 10, 0],
								scale: [1, 1.1, 1],
							}}
							transition={{
								duration: 2,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						>
							<Sparkles className="w-6 h-6 text-crimson" />
						</motion.span>
					</motion.h1>

					{/* Services Grid */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="mb-16"
					>
						<h2 className="text-2xl sm:text-3xl font-bold text-white mb-12 text-center">Our Services</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
							{services.map((service, index) => (
								<motion.div
									key={service.title}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									className="group relative bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-crimson/30 transition-colors duration-300"
								>
									<div className="absolute inset-0 bg-gradient-to-br from-crimson/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
									
									<span className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform duration-300">
										{service.icon}
									</span>
									
									<h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
										{service.title}
										<ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
									</h3>
									
									<p className="text-zinc-400 text-sm mb-4 group-hover:text-zinc-300 transition-colors">
										{service.description}
									</p>
									
									<div className="flex flex-wrap gap-2">
										{service.categories.map((category) => (
											<span
												key={category}
												className="text-xs px-2 py-1 bg-white/5 rounded-full text-zinc-400 group-hover:bg-crimson/10 group-hover:text-white transition-all duration-300"
											>
												{category}
											</span>
										))}
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Contact Form and Social Links Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Contact Form */}
						<div className="lg:col-span-2">
							<AnimatePresence mode="wait">
								{isSubmitted ? (
									<motion.div
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.95 }}
										className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-12 text-center relative overflow-hidden"
									>
										{/* Enhanced success animation */}
										<motion.div
											className="absolute inset-0 bg-gradient-to-br from-crimson/10 via-transparent to-transparent"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ duration: 1 }}
										/>
										
										{/* Animated success particles */}
										{[...Array(30)].map((_, i) => (
											<motion.div
												key={i}
												className="absolute w-1 h-1 rounded-full"
												initial={{
													opacity: 1,
													scale: 0,
													x: "50%",
													y: "50%",
													backgroundColor: i % 2 === 0 ? "#dc2626" : "#ffffff"
												}}
												animate={{
													opacity: 0,
													scale: 1,
													x: `${Math.random() * 200 - 100}%`,
													y: `${Math.random() * 200 - 100}%`,
												}}
												transition={{
													duration: 0.8 + Math.random() * 0.5,
													delay: i * 0.02,
													ease: "easeOut",
												}}
											/>
										))}
										
										<motion.div
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											transition={{ type: "spring", duration: 0.5, bounce: 0.5 }}
											className="relative"
										>
											<div className="w-20 h-20 bg-gradient-to-br from-crimson to-crimson/80 rounded-full mx-auto mb-6 flex items-center justify-center">
												<motion.svg 
													className="w-10 h-10 text-white"
													fill="none" 
													viewBox="0 0 24 24"
													initial={{ pathLength: 0, opacity: 0 }}
													animate={{ pathLength: 1, opacity: 1 }}
													transition={{ duration: 0.5, delay: 0.2 }}
												>
													<motion.path
														d="M5 13l4 4L19 7"
														stroke="currentColor"
														strokeWidth="3"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</motion.svg>
											</div>
											
											<motion.div
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: 0.3 }}
											>
												<h3 className="text-2xl font-bold text-white mb-3">Message Sent Successfully!</h3>
												<p className="text-zinc-300">Thank you for reaching out. We'll get back to you soon.</p>
											</motion.div>
										</motion.div>
									</motion.div>
								) : (
									<motion.form
										onSubmit={handleSubmit}
										className="space-y-8 bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-8 relative overflow-hidden"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
									>
										{/* Enhanced form field glow effect */}
										{focusedField && (
											<motion.div
												className="absolute w-[500px] h-[500px] bg-gradient-radial from-crimson/20 via-crimson/5 to-transparent blur-3xl rounded-full"
												initial={{ opacity: 0, scale: 0.8 }}
												animate={{
													opacity: 1,
													scale: 1,
													x: focusedField === 'name' ? '-25%' : focusedField === 'email' ? '25%' : '0%',
													y: focusedField === 'message' ? '25%' : '-25%',
												}}
												exit={{ opacity: 0, scale: 0.8 }}
												transition={{ duration: 0.5 }}
											/>
										)}

										<motion.div
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.1 }}
											className="relative group"
										>
											<label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
												Your Name
											</label>
											<div className="relative">
												<input
													type="text"
													id="name"
													required
													value={formData.name}
													onChange={handleInputChange}
													onFocus={() => setFocusedField('name')}
													onBlur={() => setFocusedField(null)}
													className="w-full px-6 py-4 rounded-xl bg-zinc-900/50 border border-zinc-700 focus:border-crimson focus:ring-crimson text-white placeholder-zinc-500 backdrop-blur-sm transition-all"
													placeholder="John Doe"
												/>
												<motion.div
													className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
													animate={{ 
														opacity: formData.name ? 1 : 0,
														scale: formData.name ? 1 : 0.8
													}}
												>
													<Sparkles className="w-5 h-5" />
												</motion.div>
											</div>
										</motion.div>

										<motion.div
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.2 }}
											className="relative group"
										>
											<label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
												Email Address
											</label>
											<div className="relative">
												<input
													type="email"
													id="email"
													required
													value={formData.email}
													onChange={handleInputChange}
													onFocus={() => setFocusedField('email')}
													onBlur={() => setFocusedField(null)}
													className="w-full px-6 py-4 rounded-xl bg-zinc-900/50 border border-zinc-700 focus:border-crimson focus:ring-crimson text-white placeholder-zinc-500 backdrop-blur-sm transition-all"
													placeholder="john@example.com"
												/>
												<motion.div
													className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
													animate={{ 
														opacity: formData.email ? 1 : 0,
														scale: formData.email ? 1 : 0.8
													}}
												>
													<Mail className="w-5 h-5" />
												</motion.div>
											</div>
										</motion.div>

										<motion.div
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.3 }}
											className="relative group"
										>
											<label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
												Your Message
											</label>
											<div className="relative">
												<textarea
													id="message"
													rows={5}
													required
													value={formData.message}
													onChange={handleInputChange}
													onFocus={() => setFocusedField('message')}
													onBlur={() => setFocusedField(null)}
													className="w-full px-6 py-4 rounded-xl bg-zinc-900/50 border border-zinc-700 focus:border-crimson focus:ring-crimson text-white placeholder-zinc-500 backdrop-blur-sm transition-all resize-none"
													placeholder="Tell us about your project..."
												/>
												<motion.div
													className="absolute right-4 top-6 text-zinc-500"
													animate={{ 
														opacity: formData.message ? 1 : 0,
														scale: formData.message ? 1 : 0.8
													}}
												>
													<Send className="w-5 h-5" />
												</motion.div>
											</div>
										</motion.div>

										<motion.button
											type="submit"
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											className="w-full py-4 px-6 bg-gradient-to-r from-crimson to-crimson/90 text-white rounded-xl transition-all font-medium text-lg relative overflow-hidden group"
										>
											<span className="relative z-10 flex items-center justify-center gap-2">
												Send Message
												<motion.span
													animate={{
														x: [0, 5, 0],
													}}
													transition={{
														duration: 1.5,
														repeat: Infinity,
														ease: "easeInOut",
													}}
												>
													<Send className="w-5 h-5" />
												</motion.span>
											</span>
											<motion.div
												className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
												initial={{ x: "-100%" }}
												whileHover={{ x: "100%" }}
												transition={{
													duration: 0.75,
													ease: "easeInOut",
												}}
											/>
										</motion.button>
									</motion.form>
								)}
							</AnimatePresence>
						</div>

						{/* Social Links */}
						<div className="lg:col-span-1">
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								className="bg-gradient-to-br from-zinc-800/50 via-zinc-900/50 to-black/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
							>
								<motion.h3 
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									className="text-xl font-bold text-white mb-8 flex items-center gap-2"
								>
									Connect With Us
									<motion.span
										animate={{
											rotate: [0, 10, 0],
											scale: [1, 1.1, 1],
										}}
										transition={{
											duration: 2,
											repeat: Infinity,
											ease: "easeInOut",
										}}
									>
										<Sparkles className="w-5 h-5 text-crimson" />
									</motion.span>
								</motion.h3>
								<div className="space-y-3">
									{socialLinks.map((link, index) => (
										<motion.a
											key={link.label}
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: index * 0.1 }}
											className="group flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-white/0 hover:from-white/10 hover:to-white/5 transition-all relative overflow-hidden"
											whileHover={{ scale: 1.02, y: -2 }}
											whileTap={{ scale: 0.98 }}
										>
											{/* Hover gradient effect */}
											<motion.div
												className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"
												initial={{ x: "-100%" }}
												whileHover={{ x: "100%" }}
												transition={{ duration: 0.75, ease: "easeInOut" }}
											/>
											
											{/* Icon container */}
											<motion.div 
												className={`relative p-3 rounded-xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border border-white/5 group-hover:border-white/20 transition-colors ${link.color}`}
												whileHover={{ scale: 1.1 }}
												transition={{ type: "spring", stiffness: 300 }}
											>
												{link.icon}
												<div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
											</motion.div>

											{/* Label */}
											<span className="text-zinc-300 font-medium group-hover:text-white transition-colors relative z-10">
												{link.label}
											</span>

											{/* Arrow icon */}
											<motion.div
												className="ml-auto relative z-10"
												initial={{ x: -5, opacity: 0 }}
												whileHover={{ x: 0, opacity: 1 }}
											>
												<ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
											</motion.div>
										</motion.a>
									))}
								</div>

								{/* Enhanced Office Hours Section */}
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.5 }}
									className="mt-8 p-6 rounded-xl bg-gradient-to-br from-crimson/10 via-crimson/5 to-transparent border border-crimson/20 relative overflow-hidden group"
								>
									{/* Animated gradient background */}
									<div className="absolute inset-0 bg-gradient-to-r from-crimson/0 via-crimson/10 to-crimson/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
									
									<motion.h4 
										className="text-lg font-bold text-white mb-3 flex items-center gap-2"
										whileHover={{ x: 5 }}
										transition={{ type: "spring", stiffness: 300 }}
									>
										Office Hours
										<span className="text-2xl">🕒</span>
									</motion.h4>
									
									<div className="space-y-2">
										<p className="text-zinc-300 text-sm flex items-center gap-2">
											<span className="w-4 h-px bg-crimson/50" />
											Monday - Friday: 9:00 AM - 6:00 PM (ICT)
										</p>
										<p className="text-zinc-300 text-sm flex items-center gap-2">
											<span className="w-4 h-px bg-crimson/50" />
											Weekend meetings available by appointment
										</p>
									</div>
								</motion.div>
							</motion.div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
