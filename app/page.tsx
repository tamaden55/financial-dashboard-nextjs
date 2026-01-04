"use client";

import GrowthCalculator from './components/growth-calculator';
import ProfitabilityCalculator from './components/profitability-calculator';
import SafetyCalculator from './components/safety-calculator';
import ValuationCalculator from './components/valuation-calculator';
import CompanySearch from './components/company-search';
import { FinancialDataProvider } from './contexts/financial-data-context';

export default function Home() {
  return (
    <FinancialDataProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              投資分析ダッシュボード
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              投資判断フロー：成長性 → 収益性 → 安全性 → 割安性
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          <div className="space-y-6">
            <CompanySearch />

            <GrowthCalculator />
            <ProfitabilityCalculator />
            <SafetyCalculator />
            <ValuationCalculator />
          </div>
        </main>
      </div>
    </FinancialDataProvider>
  );
}
