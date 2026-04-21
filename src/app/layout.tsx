import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link"; // Next.js's native fast-routing link

// Load a clean, modern font
const inter = Inter({ subsets: ["latin"] });

// This handles the SEO and browser tab title
export const metadata: Metadata = {
  title: "Food Tracker",
  description: "Personal macro, pantry, and recipe tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        
        {/* --- THE PERSISTENT NAVIGATION BAR --- */}
        <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              
              {/* Logo / App Name */}
              <div className="flex items-center">
                <Link href="/" className="text-xl font-extrabold text-blue-600 tracking-tight">
                  MacroTracker
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  Diary
                </Link>
                <Link href="/pantry" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  Pantry
                </Link>
                <Link href="/recipes" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  Recipes
                </Link>
                <Link href="/groceries" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  Groceries
                </Link>
                <Link href="/metrics" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
                  Metrics
                </Link>
              </div>

            </div>
          </div>
        </nav>

        {/* --- THE DYNAMIC PAGE CONTENT --- */}
        {/* Whatever page you navigate to is injected right here where {children} is */}
        <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

      </body>
    </html>
  );
}