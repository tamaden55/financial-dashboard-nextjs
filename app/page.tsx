"use client";
import { useState } from "react";

export default function Home() {
  // Financial calculation state
  const [sales, setSales] = useState('');           // Revenue
  const [marketCap, setMarketCap] = useState('');   // Market Cap
  const [psr, setPsr] = useState(null);             // PSR (Result)

  // Calculate PSR
  const calculatePSR = () => {
    const salesNum = Number(sales);
    const marketCapNum = Number(marketCap);

    if (salesNum > 0 && marketCapNum > 0) {
      const result = marketCapNum / salesNum;
      setPsr(result);
    } else {
      alert('Please enter valid numbers');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center">

        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Investment Dashboard
        </h1>

        <p className="mb-8 text-gray-600 dark:text-gray-400">
          <a
            href="https://shikiho.toyokeizai.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Shikiho Online →
          </a>
        </p>

        {/* Financial Calculator */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            PSR Analysis
          </h2>

          <div className="max-w-md mx-auto">
            {/* Input Fields */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Revenue (Million JPY)
                </label>
                <input
                  type="number"
                  value={sales}
                  onChange={(e) => setSales(e.target.value)}
                  placeholder="e.g., 300000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Market Cap (Million JPY)
                </label>
                <input
                  type="number"
                  value={marketCap}
                  onChange={(e) => setMarketCap(e.target.value)}
                  placeholder="e.g., 450000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculatePSR}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
            >
              Calculate
            </button>

            {/* Results */}
            {psr !== null && (
              <div className="mt-6 p-6 bg-blue-50 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Analysis Result
                </h3>
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                  PSR: {psr.toFixed(2)}x
                </div>

                {/* Judgment Messages */}
                <div className="text-left space-y-3">
                  {psr < 1 && (
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                      <p className="font-semibold text-green-700 dark:text-green-400">Undervalued</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Market cap is lower than revenue, indicating conservative market expectations</p>
                    </div>
                  )}
                  {psr >= 1 && psr < 2 && (
                    <div className="border-l-4 border-yellow-500 pl-4 py-2">
                      <p className="font-semibold text-yellow-700 dark:text-yellow-400">Fair to Slightly High</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Market cap is around revenue level, standard valuation</p>
                    </div>
                  )}
                  {psr >= 2 && psr < 5 && (
                    <div className="border-l-4 border-orange-500 pl-4 py-2">
                      <p className="font-semibold text-orange-700 dark:text-orange-400">High Expectations</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Market is anticipating future growth</p>
                    </div>
                  )}
                  {psr >= 5 && (
                    <div className="border-l-4 border-red-500 pl-4 py-2">
                      <p className="font-semibold text-red-700 dark:text-red-400">Very High Expectations</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Potential high-growth company or bubble-like valuation</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <p>Market Cap: {marketCap} Million JPY</p>
                  <p>Revenue: {sales} Million JPY</p>
                  </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
