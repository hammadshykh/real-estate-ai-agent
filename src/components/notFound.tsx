// app/not-found.tsx
"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
 // Optional: Log 404 errors (client-side)
 useEffect(() => {
  console.error(
   "404 Error: User attempted to access non-existent route:",
   window.location.pathname
  );
 }, []);

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
   <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md mx-4">
    <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
     Page Not Found
    </h2>
    <p className="text-gray-600 mb-6">
     {"The page you're looking for doesn't exist or has been moved."}
    </p>
    <Link
     href="/"
     className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-md"
    >
     Return to Home
    </Link>
   </div>
  </div>
 );
}
