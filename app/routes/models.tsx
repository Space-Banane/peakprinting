import React from "react";

interface Model {
  title: string;
  description: string;
  icon: string;
  preview_image: string;
  file_url: string;
  color: string;
}

const models: Model[] = [];

export function meta() {
  return [
    { title: "3D Models – Peak Printing" },
    { name: "description", content: "Fun 3D models for your Peak Printer." },
  ];
}

export default function ModelsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
        No Idea what to Print? <span className="text-white">🧩</span>
      </h1>
      <p className="text-lg text-gray-300 text-center mb-10">
        Download and print these fun models, hand-picked for your Peak Printer!
      </p>
      <div className="grid gap-8 md:grid-cols-3">
        {models.map((model) => (
          <div
            key={model.title}
            className="bg-white/10 rounded-2xl shadow-xl p-6 flex flex-col items-center border"
            style={{ borderColor: model.color }}
          >
            <div
              className="text-5xl mb-3"
              style={{ color: model.color }}
              aria-label={model.title}
            >
              {model.icon}
            </div>
            <img
              src={model.preview_image}
              alt={model.title}
              className="w-40 h-40 object-contain rounded-xl mb-4 border-2"
              style={{ borderColor: model.color, background: "#fff" }}
            />
            <h2 className="text-2xl font-bold mb-2 text-white text-center">{model.title}</h2>
            <p className="text-gray-200 text-center mb-4">{model.description}</p>
            <a
              href={model.file_url}
              download
              className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
            >
              Download STL
            </a>
          </div>
        ))}
        {models.length === 0 && (
          <div className="col-span-3">
            <div className="border-4 border-dashed border-gray-400 rounded-xl p-8 text-center text-gray-400 font-bold text-xl">
              No models available yet. Check back later!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
