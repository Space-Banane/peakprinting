import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "react-router";
import React from "react";

import type { Route } from "./+types/root";
import "./app.css";

// Navbar Component
function Navbar() {
  const [showAccountTooltip, setShowAccountTooltip] = React.useState(false);
  const [showCartTooltip, setShowCartTooltip] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl">🏔️</span>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent group-hover:from-amber-100 group-hover:to-orange-100 transition-all">
              Peak Printing
            </span>
          </a>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Shopping Cart */}
            <div className="relative">
              <button
                onClick={() => setShowCartTooltip(!showCartTooltip)}
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 902.86 825.641">
                  <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z     M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"/>
                  <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717    c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744    c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742    C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744    c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z     M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742    S619.162,694.432,619.162,716.897z"/>
                </svg>
              </button>
              {showCartTooltip && (
                <div className="absolute right-0 mt-2 w-64 bg-amber-50 text-amber-900 rounded-lg shadow-xl p-4 border border-amber-200">
                  <p className="font-semibold">Your cart is empty</p>
                  <p className="text-sm mt-1">Please add some items to your cart.</p>
                </div>
              )}
            </div>

            {/* Account */}
            <div className="relative">
              <button
                onClick={() => setShowAccountTooltip(!showAccountTooltip)}
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              {showAccountTooltip && (
                <div className="absolute right-0 mt-2 w-64 bg-amber-50 text-amber-900 rounded-lg shadow-xl p-4 border border-amber-200">
                  <p className="font-semibold">You are not logged in</p>
                  <p className="text-sm mt-1">Please log in to access your account.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* SEO & Social Meta Tags */}
        <meta property="og:title" content="Peak Printing" />
        <meta property="og:description" content="Best printers on the hole world! Discover our range of high-quality, fun printers." />
        <meta property="og:image" content="/screenshot_twtr.png" />
        <meta property="og:url" content="https://peakprinting.top/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Peak Printing" />
        <meta name="twitter:description" content="Best printers on the hole world! Discover our range of high-quality, fun printers." />
        <meta name="twitter:image" content="/screenshot_twtr.png" />
        <script defer src="https://not-a-tracker.reversed.dev/script.js" data-website-id="0ba746f5-358d-49de-ac34-eb8e52733910"></script>
      </head>
      <body
        className="bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white min-h-screen"
      >
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
        <footer className="bg-gradient-to-t from-black/40 to-transparent backdrop-blur-sm border-t border-white/10 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">🏔️</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                    Peak Printing
                  </span>
                </div>
                <p className="text-gray-400 text-sm text-center md:text-left">
                  The only printers certified by mountain climbers worldwide.
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="text-gray-400">
                  <span className="font-semibold text-amber-300">Just kidding, this isn't real!</span> &middot;{" "}
                  <a
                    href="https://space.reversed.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 underline hover:text-amber-300 transition-colors"
                  >
                    space.reversed.dev
                  </a>
                </div>
                <div className="text-gray-400">
                  Made with <span className="text-pink-400">♥</span> by{" "}
                  <span className="font-semibold text-purple-300">Space</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-gray-500">
              Peak Printing™. All rights reserved. No printers were harmed in the making of this website.
            </div>
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      // Custom 404 page
      return (
        <main className="flex flex-col items-center justify-center min-h-[60vh] pt-16 p-4 container mx-auto">
          <h1 className="text-6xl font-extrabold text-blue-400 mb-4 drop-shadow-lg">404</h1>
          <p className="text-2xl text-gray-200 mb-2 font-bold">Page Not Found</p>
          <p className="text-lg text-gray-400 mb-6">
            The page you are looking for does not exist or has been moved.
          </p>
          <a
            href="/"
            className="px-6 py-2 bg-blue-500/80 text-white rounded-lg hover:bg-blue-600/90 transition-colors duration-300 font-bold shadow-md backdrop-blur"
          >
            Go Home
          </a>
        </main>
      );
    }
    message = "Error";
    details = error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
