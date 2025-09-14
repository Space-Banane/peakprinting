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
  hunted: boolean;
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
 // 3d printer reasons
const brandingReasons = [
  "🏔️ Engineered at the peak of technology! (literally)",
  "🖨️ Prints so sharp, you’ll need gloves! (ouch)",
  "🤖 AI-powered fillament jams (for nostalgia).",
  "🚀 Prints at the speed of light (it trys its best).",
  "🎉 Comes with a free virtual high-five! (no free shipping)",
  "💡 Uses 73% genuine plastic and 27% hopes and dreams!",
  "🦌 Limited Edition Hunted Models Available! Grab yours now!",
  "📞 24/7 customer support by bulgarian mountain goats!",
  "🌍 Eco-friendly* (*when it jams, you use less fillament)",
  "⚡ Reliability rating: Works 60% of the time, every time!",
  "🎨 Color accuracy: Sometimes prints in colors that don't exist yet!",
  "🛠️ Handcrafted by mountain climbers who understand the importance of reaching new heights.",
  "🌟 Each printer comes with a complimentary sticker of a mountain peak!",
  "📦 Free shipping on orders over 1000€ (just kidding, we charge for everything).",
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
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
        <p className="text-amber-800 text-center mb-4">
          Looks like you've been rickrolled! For inquiries, please don't email us at{" "}
          <a href="mailto:support@peakprinting.top">support@peakprinting.top</a>
        </p>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-bold"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// Printer Component
export function Printer({
  name,
  model,
  hunted,
  price,
  image,
  rate,
  symbol,
  onAddToCart,
}: Printer & { rate: number; hunted: boolean; symbol: string; onAddToCart: () => void }) {
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
        className="w-60 h-64 object-cover rounded-xl mb-5 shadow-lg border-2 border-white/30"
        style={{
          background: "linear-gradient(120deg,rgba(255,255,255,0.25) 0%,rgba(0,0,0,0.05) 100%)",
        }}
      />
      <h2 className="text-2xl font-extrabold mb-2 text-white flex items-center gap-2 drop-shadow-lg">
        {name}
      </h2>
      { (hunted) &&
        <p className="text-red-400 font-bold mb-2 text-lg drop-shadow-lg animate-pulse">
          🦌 Limited Edition - Haunted Model!
        </p>
      }
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
          Purchase 🛒
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
    { name: "Base Peak", model: "BP-01", price: 299.99, image: "/gdsga9du89v51.jpg", hunted: false },
    { name: "Simple Peak", model: "SP-01", price: 499.99, image: "/cursed.png", hunted: true },
    { name: "PeakPrinter Maximus", model: "PP-Max", price: 799.99, image: "/long_boy.png", hunted: false },
  ];

  const [currency, setCurrency] = React.useState<"USD" | "EUR" | "GBP">("EUR");
  const [showModal, setShowModal] = React.useState(false);

  // Pick a random branding reason only on the client to avoid hydration mismatch
  const [branding, setBranding] = React.useState<string>("");

  React.useEffect(() => {
    setBranding(
      brandingReasons[Math.floor(Math.random() * brandingReasons.length)]
    );
  }, []);

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
          Discover our range of high-quality printers designed to meet all your printing needs. Whether you're a professional, a hobbyist, or a maniac, we (probably) have the perfect printer for you.
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
            Don't Contact Us 📞
          </button>
        </div>
      </div>
      {/* About Our Printers Section */}
      <div className="max-w-5xl mx-auto px-4 mb-24">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Why Choose Peak Printers?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-start gap-4 bg-white/80 dark:bg-gray-900/60 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900">
                <span className="text-2xl">🛠️</span>
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-amber-200 mb-1">Handcrafted Excellence</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Each printer is assembled by a dedicated team of mountain climbers, ensuring every detail reaches new heights. We use 73% genuine plastic and 27% hopes and dreams for unmatched quality.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white/80 dark:bg-gray-900/60 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900">
                <span className="text-2xl">⚡</span>
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-blue-200 mb-1">Reliability Rating</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our printers are engineered for consistent performance, working 60% of the time, every time. When they pause, it’s just a well-deserved coffee break—because even machines need balance.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white/80 dark:bg-gray-900/60 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900">
                <span className="text-2xl">🎨</span>
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-purple-200 mb-1">Color Accuracy</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Experience vibrant prints with color accuracy so advanced, you might discover new shades. Sometimes, our printers even create colors that don’t exist yet—innovation at its finest.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white/80 dark:bg-gray-900/60 rounded-xl shadow-md border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                <span className="text-2xl">🌍</span>
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-green-200 mb-1">Eco-Friendly*</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our commitment to sustainability means less filament waste—thanks to occasional jams. Plus, 12% of our materials are recycled from printers that have reached the end of their journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Models Section */}
      <div className="max-w-4xl mx-auto px-4 mb-32">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
          No Idea what to Print? <span className="text-white">🧩</span>
        </h2>
        <p className="text-lg text-gray-300 text-center mb-6">
          Check out our fun collections of 3D models, ready for your Peak Printer!
        </p>
        <div className="flex justify-center">
          <a
            href="/models"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Explore 3D Models 🚀
          </a>
        </div>
      </div>

      {/* Currency Selection */}
      <div id="printers-section" className="flex flex-col items-center mb-8">
        <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
          Get your Peak Printer Today! <span className="text-white">🛒</span>
        </h2>
        <div className="flex items-center mb-4">
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
        {currency === "USD" && (
          <div className="mb-6 text-center text-orange-400 font-bold text-lg drop-shadow">
            💸 Enjoying the Economy?
          </div>
        )}
        {currency === "GBP" && (
          <div className="mb-6 text-center text-blue-400 font-bold text-lg drop-shadow">
            😂 Enjoying the Online Safety Act yet?
          </div>
        )}
        {currency === "EUR" && (
          <div className="mb-6 text-center text-blue-400 font-bold text-lg drop-shadow">
            🙏 GOD BLESS THE EU! 🇪🇺 🇪🇺 🇪🇺 🇪🇺
          </div>
        )}
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
        <span className="font-bold text-amber-300">Peak Printing</span> – The only printer technology certified by the <span className="font-bold text-blue-400">"Totally Serious Peak Mountain Organization"</span> (TSPMO). <span className="ml-1">🏆</span>
      </div>

      <RickrollModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}