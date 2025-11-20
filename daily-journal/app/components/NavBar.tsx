"use client"

import Link from "next/link";

export default function NavBar() {
    return (
        <nav className ="bg-[#ff0000] text-white w-full py-4 px-8 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold"> Daily Journal </h1>
        <div className= "flex gap-6"> 
            <Link href="/" className = "hover:underline hover:text-gray-200 transition-colors">
                Home
            </Link>
        </div>
        </nav>
    );
}