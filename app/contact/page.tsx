"use client";
import { Github, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { Card } from "../components/card";
import Image from "next/image";

const socials = [
	{
		icon: <Twitter size={20} />,
		href: "https://twitter.com/chronark_",
		label: "Twitter",
		handle: "@chronark_",
	},
	{
		icon: <Mail size={20} />,
		href: "mailto:dev@chronark.com",
		label: "Email",
		handle: "dev@chronark.com",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/chronark",
		label: "Github",
		handle: "chronark",
	},
];

export default function ContactPage() {
	return (
		<div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
			<div className="max-w-xl mx-auto">
				<div className="flex justify-center mb-8">
					<div className="relative w-48 h-16">
						<Image
							src="/logo/Untitled_design__5_-removebg-preview.png"
							alt="Crimson Films Logo"
							fill
							className="object-contain"
							priority
						/>
					</div>
				</div>
				<h1 className="text-4xl font-bold text-zinc-100 mb-8 text-center">Contact Us</h1>
				<form className="space-y-6">
					<div>
						<label htmlFor="name" className="block text-sm font-medium text-zinc-300">
							Name
						</label>
						<input
							type="text"
							id="name"
							className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 shadow-sm focus:border-crimson focus:ring-crimson"
						/>
					</div>
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-zinc-300">
							Email
						</label>
						<input
							type="email"
							id="email"
							className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 shadow-sm focus:border-crimson focus:ring-crimson"
						/>
					</div>
					<div>
						<label htmlFor="message" className="block text-sm font-medium text-zinc-300">
							Message
						</label>
						<textarea
							id="message"
							rows={4}
							className="mt-1 block w-full rounded-md bg-zinc-800 border-zinc-700 shadow-sm focus:border-crimson focus:ring-crimson"
						/>
					</div>
					<button
						type="submit"
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-crimson hover:bg-crimson/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crimson"
					>
						Send Message
					</button>
				</form>
			</div>
		</div>
	);
}
