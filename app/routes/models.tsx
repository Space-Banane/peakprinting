import React, { useState, useEffect } from "react";

// Define umami as a global variable for tracking events (imported via script tag)
declare global {
  interface Window {
    umami: {
      track: (event: string) => void;
    };
  }
}

interface Collection {
  id: string;
  title: string;
  description: string;
  models?: Model[];
  icon: string;
  banner_image?: string;
  base_file_url: string
  download?: {
    each?: string; 
    collection?: string
  };
}

interface ModelMetadata {
  features?: string[];
  pro_cons?: { text: string; good: boolean }[];
  changes?: {
    name: string;
    icon: string;
    good: boolean;
    compared_to: string;
  }[];
}

interface Model {
  id: string;
  title: string;
  type: "coaster";
  description: string;
  icon: string;
  images?: string[];
  file_url: string;
  download?: {
    text?: string;
  };
  metadata?: ModelMetadata;
}

const collections: Collection[] = [
  {
    title: "insert text here",
    id: "insert-text-here",
    description:
      "Ever felt the need to express yourself with weird looking but fire 3D Prints?\nLook no further, because the latest drip from the <insert text here> collection got YOU covered!",
    icon: "💧",
    base_file_url: "https://cdn.reversed.dev/peakprinting/models/coasters/",
    download: {
      each: "Express yourself",
      collection: "Express yourself with the entire collection",
    },
    models: [
      {
        id: "mini-coaster",
        title: "Mini Coaster",
        type: "coaster",
        description: "A small coaster for your favorite drinks.",
        icon: "🤏",
        file_url: "Mini.stl",
        images: ["mini-0.jpg", "mini-1.jpg", "mini-2.jpg"],
        metadata: {
          features: [
            "Good for Cans"
          ],
          pro_cons: [
            { text: "Small", good: true },
            { text: "Small", good: false },
          ]
        }
      },
      {
        id: "original-coaster",
        title: "Original Coaster",
        type: "coaster",
        icon: "🙂",
        description: "The classic coaster design, perfect for any drink!",
        file_url: "Original with Hexa Pattern.stl",
        images: ["original-1.jpg", "original-2.jpg"],
        metadata: {
          features: [
            "Good for Mugs",
            "Maybe holds Bottles"
          ],
          pro_cons: [
            { text: "Classic", good: true },
            { text: "Not very unique", good: false },
          ],
          changes: [
            {
              name: "10% Bigger",
              icon: "📈",
              good: true,
              compared_to: "mini-coaster",
            },
          ],
        },
      },
      {
        id: "mega-coaster",
        title: "Mega Coaster",
        type: "coaster",
        description: "The ultimate coaster for the biggest drinks!",
        icon: "😲",
        file_url: "Mega.stl",
        metadata: {
          features: [
            "Extra large",
            "Supports pitchers?",
          ],
          pro_cons: [
            { text: "Great for big mugs", good: true },
            { text: "Bulky", good: false },
          ],
          changes: [
            {
              name: "10% Bigger",
              icon: "📈",
              good: true,
              compared_to: "original-coaster",
            },
          ],
        },
      },
    ],
  },
];

function ModelImageCarousel({
  images,
  baseUrl,
  alt,
}: {
  images: string[];
  baseUrl: string;
  alt: string;
}) {
  const [index, setIndex] = useState(0);

  const umami = typeof window !== "undefined" && window.umami
    ? window.umami
    : { track: (_event: string) => {} };

  useEffect(() => {
    if (images.length <= 1) return; 
    const timer = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % images.length;
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (!images.length)
    return (
      <div className="w-40 h-40 mb-4 flex items-center justify-center rounded-xl border-2 border-white/20 bg-white/10 text-gray-400 text-sm">
        No image available
      </div>
    );

  return (
    <div className="relative w-40 h-40 mb-4 flex flex-col items-center">
      <img
        src={`${baseUrl}Pics/${images[index]}`}
        alt={alt}
        className="w-40 h-40 object-cover rounded-xl border-2 border-white/20 bg-white transition-all duration-300"
        key={images[index]}
      />
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, i) => (
            <button
              key={i}
              className={`w-2.5 h-2.5 rounded-full border border-white/40 transition-all duration-200 ${
                i === index ? "bg-white/80" : "bg-white/30"
              }`}
              aria-label={`Show image ${i + 1}`}
              onClick={() => {
                setIndex(i);
                umami.track("switch_image");
              }}
              style={{ outline: "none" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function meta() {
  return [
    { title: "3D Models – Peak Printing" },
    { name: "description", content: "Fun 3D models for your Peak Printer." },
  ];
}

function renderDescriptionWithItalics(description: string) {
  const parts: (any)[] = [];
  let lastIndex = 0;
  const regex = /<([^>]+)>/g;
  let match: RegExpExecArray | null;
  let idx = 0;
  while ((match = regex.exec(description)) !== null) {
    if (match.index > lastIndex) {
      parts.push(description.slice(lastIndex, match.index));
    }
    parts.push(<span key={idx++} className="italic">{match[1]}</span>);
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < description.length) {
    parts.push(description.slice(lastIndex));
  }
  return parts;
}

function FeaturesList({ features }: { features?: string[] }) {
  if (!features?.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 justify-center">
      {features.map((f, i) => (
        <span
          key={i}
          className="px-2.5 py-1 bg-blue-500/20 text-blue-200 rounded-full text-xs font-medium border border-blue-400/30"
        >
          {f}
        </span>
      ))}
    </div>
  );
}

function ProConsList({ pro_cons }: { pro_cons?: { text: string; good: boolean }[] }) {
  if (!pro_cons?.length) return null;
  return (
    <div className="grid grid-cols-2 gap-2 w-full max-w-xs mx-auto">
      {pro_cons.map((item, i) => (
        <div
          key={i}
          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium ${
            item.good
              ? "bg-green-500/20 text-green-200 border border-green-400/30"
              : "bg-red-500/20 text-red-200 border border-red-400/30"
          }`}
        >
          <span className="text-xs">
            {item.good ? "✓" : "✗"}
          </span>
          <span className="truncate">{item.text}</span>
        </div>
      ))}
    </div>
  );
}

function ChangesList({
  changes,
  models,
}: {
  changes?: {
    name: string;
    icon: string;
    good: boolean;
    compared_to: string;
  }[];
  models: Model[];
}) {
  if (!changes?.length) return null;
  return (
    <div className="space-y-2">
      {changes.map((chg, i) => {
        const comparedModel = models.find((m) => m.id === chg.compared_to);
        return (
          <div
            key={i}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
              chg.good
                ? "bg-purple-500/20 text-purple-200 border border-purple-400/30"
                : "bg-orange-500/20 text-orange-200 border border-orange-400/30"
            }`}
          >
            <span className="text-sm">{chg.icon}</span>
            <div className="text-center">
              <div className="font-semibold">{chg.name}</div>
              {comparedModel && (
                <div className="text-xs opacity-75">
                  vs {comparedModel.title}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MetadataSection({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  colorClass?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/5 rounded-xl p-3 border border-white/10">
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <span className="text-xs font-bold text-white/90 uppercase tracking-wider">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function ModelCard({
  model,
  collection,
  allModels,
}: {
  model: Model;
  collection: Collection;
  allModels: Model[];
}) {
  const umami = typeof window !== "undefined" && window.umami
    ? window.umami
    : { track: (_event: string) => {} };

  return (
    <div
      className="relative bg-white/5 backdrop-blur-lg rounded-3xl shadow-lg p-6 flex flex-col items-center border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/10 group"
    >
      {/* Icon badge overlay */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/50 to-purple-600/50 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/10 text-3xl">
          {model.icon}
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-8">
        <ModelImageCarousel
          images={model.images || []}
          baseUrl={collection.base_file_url}
          alt={model.title}
        />
        <h3 className="text-2xl font-bold mb-1 text-white text-center drop-shadow-sm tracking-tight">
          {model.title}
        </h3>
        <p className="text-gray-300 text-center mb-4 text-sm min-h-[40px] font-normal">
          {model.description}
        </p>
      </div>
      
      {/* Metadata - Improved compact layout */}
      <div className="w-full space-y-3 mb-6">
        {model.metadata?.features && (
          <MetadataSection icon="✨" title="Features">
            <FeaturesList features={model.metadata.features} />
          </MetadataSection>
        )}
        {model.metadata?.pro_cons && (
          <MetadataSection icon="⚖️" title="Pros & Cons">
            <ProConsList pro_cons={model.metadata.pro_cons} />
          </MetadataSection>
        )}
        {model.metadata?.changes && (
          <MetadataSection icon="🔄" title="Changes">
            <ChangesList changes={model.metadata.changes} models={allModels} />
          </MetadataSection>
        )}
      </div>
      
      <div className="w-full flex justify-center mt-auto pt-2">
        <a
          href={`${collection.base_file_url}${model.file_url}`}
          download
          className="px-6 py-2.5 bg-white/10 border border-white/20 backdrop-blur-sm text-white rounded-xl font-semibold shadow-md hover:bg-white/20 hover:border-white/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2 text-base"
          onClick={() => umami.track(`download_${model.id}`)}
        >
          <svg className="w-5 h-5 opacity-80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
          </svg>
          {model.download?.text ||
            collection.download?.each ||
            "Download STL"}
        </a>
      </div>
    </div>
  );
}

export default function ModelsPage() {
  const umami = typeof window !== "undefined" && window.umami
    ? window.umami
    : { track: (_event: string) => {} };

  function handleDownloadCollection(collection: Collection) {
    if (!collection.models) return;
    umami.track(`download_${collection.id}`);
    collection.models.forEach((model, idx) => {
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = `${collection.base_file_url}${model.file_url}`;
        link.download = model.file_url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, idx * 300); // we could PROBABLY do a batch download, but i am NOT reading documentation on how to do that
    });
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
        No Glue what to Print? <span className="text-white">🧩</span>
      </h1>
      <p className="text-lg text-gray-300 text-center mb-10">
        We got some AMAZING collections for YOUR Peak Printer!
      </p>

      {collections.map((collection) => (
        <div key={collection.id} className="mb-12">
          <div className="text-center mb-12">
            <div className="text-6xl mb-2">{collection.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {collection.title}
            </h2>
            <p className="text-gray-300 whitespace-pre-line">
              {renderDescriptionWithItalics(collection.description)}
            </p>
            {collection.models && collection.models.length > 0 && (
              <button
                onClick={() => handleDownloadCollection(collection)}
                className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold shadow hover:from-purple-600 hover:to-blue-600 transition"
              >
                {collection.download?.collection ||
                  "Download Entire Collection"}
              </button>
            )}
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {collection.models?.map((model) => (
              <ModelCard
                key={model.id}
                model={model}
                collection={collection}
                allModels={collection.models || []}
              />
            )) || []}
            {(!collection.models || collection.models.length === 0) && (
              <div className="col-span-3">
                <div className="border-4 border-dashed border-gray-400 rounded-xl p-8 text-center text-gray-400 font-bold text-xl">
                  No models available in this collection yet. Check back later!
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {collections.length === 0 && (
        <div className="border-4 border-dashed border-gray-400 rounded-xl p-8 text-center text-gray-400 font-bold text-xl">
          No collections available yet. Check back later!
        </div>
      )}
    </div>
  );
}
