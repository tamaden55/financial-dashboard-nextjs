"use client";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center">

        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          カウンター
        </h1>

        <div className="text-8xl font-bold mb-12 text-blue-600 dark:text-blue-400">
          {count}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setCount(count + 1)}
            className="w-20 h-20 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-3xl font-bold"
          >
            +
          </button>

          <button
            onClick={() => setCount(0)}
            className="w-20 h-20 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-3xl font-bold"
          >
            0
          </button>
        </div>

      </div>
    </div>
  );
}
