/*
This is a very jokey website for a fictional printer company called "Peak Printing".
It's meant to be a fun and lighthearted project, showcasing on other pages a few of my 3d models.
*/

import React from "react";
import type { Route } from "./+types/home";

// Define umami as a global variable for tracking events (Imported via script tag in root.tsx)
declare global {
  interface Window {
    umami: {
      track: (event: string) => void;
    };
  }
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "peakprinting.top" },
    { name: "description", content: "Best printers on the hole world!" }, // Don't worry about the typo, it's intentional for branding😜
  ];
}

// Interfaces
export interface Printer {
  name: string;
  model: string;
  price: number;
  image: string;
}

// Currency conversion rates (fictional, USD is pumped up for the jokes)
const currencyRates = {
  EUR: 1,
  USD: 2.5, // Way higher than reality, for fun
  GBP: 0.7,
};

const currencySymbols = {
  EUR: "€",
  USD: "$",
  GBP: "£",
};

const brandingReasons = [
  "🏔️ Engineered at the peak of technology!",
  "🖨️ Prints so sharp, you’ll need gloves!",
  "😂 Guaranteed to make your neighbors jealous!",
  "🌈 Colors so vibrant, even rainbows are jealous!",
  "🤖 AI-powered paper jams (for nostalgia).",
];

// Rickroll Modal Component
function RickrollModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl border border-amber-200">
        <h2 className="text-2xl font-bold text-amber-900 mb-4 text-center">
          🎉 Congratulations! 🎉
        </h2>
        <div className="mb-4">
          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
            title="Special Offer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
        <p className="text-amber-800 text-center mb-4">
          You've been selected for our special promotion! 🎵
        </p>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-bold"
        >
          Close (Worth It! 😂)
        </button>
      </div>
    </div>
  );
}

// Printer Component
export function Printer({
  name,
  model,
  price,
  image,
  rate,
  symbol,
  onAddToCart,
}: Printer & { rate: number; symbol: string; onAddToCart: () => void }) {
  return (
    <div
      className="relative border p-6 rounded-2xl shadow-2xl transition-shadow duration-300 bg-white/10 backdrop-blur-md min-w-[340px] max-w-sm mx-4 flex-shrink-0 flex flex-col items-center"
      style={{
        boxShadow:
          "0 4px 32px 0 rgba(0,0,0,0.25), 0 1.5px 0 0 rgba(255,255,255,0.15) inset",
        border: "1.5px solid rgba(255,255,255,0.18)",
      }}
    >
      <div className="absolute top-2 right-4 text-2xl select-none pointer-events-none opacity-70">✨</div>
      <img
        src={image}
        alt={`${name} ${model}`}
        className="w-60 h-52 object-cover rounded-xl mb-5 shadow-lg border-2 border-white/30"
        style={{
          background: "linear-gradient(120deg,rgba(255,255,255,0.25) 0%,rgba(0,0,0,0.05) 100%)",
        }}
      />
      <h2 className="text-2xl font-extrabold mb-2 text-white flex items-center gap-2 drop-shadow-lg">
        {name}
      </h2>
      <p className="text-white mb-1 text-lg">
        <span className="font-semibold">Model:</span> {model}
      </p>
      <p className="text-white mb-3 text-lg">
        <span className="font-semibold">Price:</span>{" "}
        <span className="drop-shadow-md">{symbol}{(price * rate).toFixed(2)}</span>
      </p>
      <div className="w-full flex justify-center mt-auto">
        <button 
          onClick={onAddToCart}
          className="px-6 py-2 bg-blue-500/80 text-white rounded-lg hover:bg-blue-600/90 transition-colors duration-300 font-bold shadow-md backdrop-blur w-full max-w-[220px]"
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  // Ensure umami is always defined (fallback to no-op if not present)
  const umami = typeof window !== "undefined" && window.umami
    ? window.umami
    : { track: (_event: string) => {} };

  const printers: Printer[] = [
    { name: "Base Peak", model: "BP-01", price: 299.99, image: "/base.png" },
    { name: "Simple Peak", model: "SP-01", price: 499.99, image: "/simple.png" },
    { name: "PeakPrinter Maximus", model: "PP-Max", price: 799.99, image: "/maximus.png" },
  ];

  const [currency, setCurrency] = React.useState<"USD" | "EUR" | "GBP">("EUR");
  const [showModal, setShowModal] = React.useState(false);

  // Pick a random branding reason for each render
  const branding = React.useMemo(
    () => brandingReasons[Math.floor(Math.random() * brandingReasons.length)],
    []
  );

  const scrollToPrinters = () => {
    umami.track("scrolled_to_printers_clicked");
    document.getElementById('printers-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRickroll = () => {
    umami.track("contact_us_cliked");
    setShowModal(true);
  };

  // Add handler for cart button
  const handleAddToCart = () => {
    umami.track("clicked_cart");
    handleRickroll();
  };

  // Add handler for currency switch
  const handleCurrencySwitch = (cur: "USD" | "EUR" | "GBP") => {
    umami.track("switched_currency");
    setCurrency(cur);
  };

  // Track rickroll modal open
  React.useEffect(() => {
    if (showModal) {
      umami.track("rick_rolled");
    }
  }, [showModal]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-6xl md:text-7xl font-extrabold text-center mb-4 bg-gradient-to-r from-amber-200 via-amber-100 to-orange-200 bg-clip-text text-transparent drop-shadow-xl">
          Welcome to Peak Printing
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
          The Best Printers on the Hole World! <span className="text-white">🗻🖨️</span>
        </h2>
        <p className="text-xl text-gray-300 mb-6 text-center max-w-3xl drop-shadow leading-relaxed">
          Discover our range of high-quality printers designed to meet all your printing needs. Whether you're a professional or a hobbyist, we have the perfect printer for you.
        </p>
        <div className="mb-8 text-purple-300 font-semibold text-center text-lg drop-shadow">
          {branding}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={scrollToPrinters}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
          >
            View Printers 🖨️
          </button>
          <button
            onClick={handleRickroll}
            className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-bold text-lg shadow-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
          >
            Contact Us 📞
          </button>
        </div>
      </div>
      {/* About Our Printers Section */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
          About Our Revolutionary Printers <span className="text-white">🏔️</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-300">
          <div className="bg-amber-900/20 p-6 rounded-xl border border-amber-700/30">
            <h3 className="text-xl font-bold text-amber-200 mb-3">🛠️ Handcrafted Excellence</h3>
            <p>Each printer is lovingly assembled by our team of mountain climbers who understand the importance of reaching new heights. We use 73% genuine plastic and 27% hopes and dreams!</p>
          </div>
          <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-700/30">
            <h3 className="text-xl font-bold text-blue-200 mb-3">⚡ Reliability Rating</h3>
            <p>Our printers work 60% of the time, every time! When they don't work, it's probably because they're taking a coffee break. We believe in work-life balance for our machines too.</p>
          </div>
          <div className="bg-purple-900/20 p-6 rounded-xl border border-purple-700/30">
            <h3 className="text-xl font-bold text-purple-200 mb-3">🎨 Color Accuracy</h3>
            <p>Sometimes our printers print in colors that don't exist yet! This is a feature, not a bug. You might discover new parts of the spectrum with every print job.</p>
          </div>
          <div className="bg-green-900/20 p-6 rounded-xl border border-green-700/30">
            <h3 className="text-xl font-bold text-green-200 mb-3">🌍 Eco-Friendly*</h3>
            <p>*We're eco-friendly because our printers jam so often, you'll use less paper! Also, 12% of our materials are recycled from other printers that gave up on life.</p>
          </div>
        </div>
      </div>

      {/* Currency Selection */}
      <div id="printers-section" className="flex flex-col items-center mb-8">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
          Our Peak Printer Collection <span className="text-white">🏆</span>
        </h2>
        <div className="flex items-center mb-8">
          <span className="mr-4 text-gray-300 font-semibold text-lg">Currency:</span>
          <div className="flex gap-3">
            {(["EUR", "USD", "GBP"] as const).map((cur) => (
              <button
                key={cur}
                type="button"
                onClick={() => handleCurrencySwitch(cur)}
                className={`px-6 py-2 rounded-xl font-bold text-lg shadow-md transition-all duration-200
                  border-2
                  ${
                    currency === cur
                      ? "bg-gradient-to-tr from-blue-500 via-blue-400 to-blue-600 text-white border-blue-400 scale-105 shadow-blue-400/40"
                      : "bg-white/10 text-blue-200 border-white/20 hover:bg-blue-500/30 hover:text-white"
                  }
                  backdrop-blur
                `}
                style={{
                  boxShadow:
                    currency === cur
                      ? "0 4px 24px 0 rgba(59,130,246,0.25)"
                      : undefined,
                }}
                aria-pressed={currency === cur}
              >
                {cur === "EUR" && "€ Euro"}
                {cur === "USD" && "$ USD"}
                {cur === "GBP" && "£ GBP"}
                {currency === cur && (
                  <span className="ml-2 align-middle">⭐</span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Printers grid */}
        <div className="flex flex-row flex-nowrap justify-center gap-8 w-full max-w-6xl mb-4 overflow-x-auto md:overflow-visible">
          {printers.map((printer) => (
            <Printer
              key={printer.model}
              {...printer}
              rate={currencyRates[currency]}
              symbol={currencySymbols[currency]}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>

      {/* Responsive tweak for mobile */}
      <style>{`
        @media (max-width: 1200px) {
          .w-\\[1240px\\] { width: 100vw !important; }
          .px-8 { padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
        }
        @media (max-width: 900px) {
          .flex-row { flex-direction: column !important; flex-wrap: nowrap !important; }
        }
      `}</style>

      <div className="mt-8 text-base text-gray-400 text-center max-w-md mx-auto drop-shadow mb-8">
        <span className="font-bold text-amber-300">Peak Printing™</span> – The only printer technology certified by the International Mountain Printing Association (IMPA). <span className="ml-1">🏆</span>
      </div>

      <RickrollModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}