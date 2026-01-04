"use client";

import { useState, useEffect } from "react";
import InputField from "./input-field";
import ResultDisplay from "./result-display";
import { useFinancialData } from "../contexts/financial-data-context";
import {
  calculatePSR,
  getPSRJudgment,
  calculateCapExRatio,
  calculateRevenueGrowth,
  getCapExRatioJudgment,
  getRevenueGrowthJudgment,
  GrowthJudgment
} from "../utils/financial";

/**
 * Growth Metrics Calculator Component
 * Analyzes PSR, capital expenditure ratio, and revenue growth
 */
export default function GrowthCalculator() {
  const { data: financialData } = useFinancialData();

  // PSR state
  const [revenue, setRevenue] = useState('');
  const [marketCap, setMarketCap] = useState('');
  const [psr, setPsr] = useState<number | null>(null);

  // CapEx Ratio state
  const [capex, setCapex] = useState('');
  const [depreciation, setDepreciation] = useState('');
  const [capexRatio, setCapexRatio] = useState<number | null>(null);

  // Revenue Growth state
  const [currentRevenue, setCurrentRevenue] = useState('');
  const [pastRevenue, setPastRevenue] = useState('');
  const [revenueGrowth, setRevenueGrowth] = useState<number | null>(null);

  // Auto-fill from fetched data
  useEffect(() => {
    if (financialData) {
      if (financialData.revenue) setRevenue(financialData.revenue);
      if (financialData.marketCap) setMarketCap(financialData.marketCap);
      if (financialData.capex) setCapex(financialData.capex);
      if (financialData.depreciation) setDepreciation(financialData.depreciation);
      if (financialData.revenueCurrentYear) setCurrentRevenue(financialData.revenueCurrentYear);
      if (financialData.revenueFourYearsAgo) setPastRevenue(financialData.revenueFourYearsAgo);
    }
  }, [financialData]);

  // Auto-calculate PSR
  useEffect(() => {
    const revenueNum = Number(revenue);
    const marketCapNum = Number(marketCap);

    if (revenueNum > 0 && marketCapNum > 0) {
      const result = calculatePSR(marketCapNum, revenueNum);
      setPsr(result);
    } else {
      setPsr(null);
    }
  }, [revenue, marketCap]);

  // Auto-calculate CapEx Ratio
  useEffect(() => {
    const capexNum = Number(capex);
    const depreciationNum = Number(depreciation);

    if (capexNum > 0 && depreciationNum > 0) {
      const result = calculateCapExRatio(capexNum, depreciationNum);
      setCapexRatio(result);
    } else {
      setCapexRatio(null);
    }
  }, [capex, depreciation]);

  // Auto-calculate Revenue Growth
  useEffect(() => {
    const currentNum = Number(currentRevenue);
    const pastNum = Number(pastRevenue);

    if (currentNum > 0 && pastNum > 0) {
      const result = calculateRevenueGrowth(currentNum, pastNum);
      setRevenueGrowth(result);
    } else {
      setRevenueGrowth(null);
    }
  }, [currentRevenue, pastRevenue]);

  const renderJudgment = (judgment: GrowthJudgment) => (
    <div className={`border-l-4 ${judgment.borderColor} pl-4 py-2`}>
      <p className={`font-semibold ${judgment.textColor} ${judgment.darkTextColor}`}>
        {judgment.title}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {judgment.description}
      </p>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3">
        <span className="text-blue-600 dark:text-blue-400 mr-2">1.</span>
        成長性分析
      </h2>

      <div className="space-y-5">
        {/* PSR Calculator */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            PSR（株価売上高倍率）
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputField
              label="売上高（百万円）"
              value={revenue}
              onChange={setRevenue}
            />

            <InputField
              label="時価総額（百万円）"
              value={marketCap}
              onChange={setMarketCap}
            />
          </div>

          {psr !== null && (
            <ResultDisplay
              psr={psr}
              judgment={getPSRJudgment(psr)}
              marketCap={marketCap}
              revenue={revenue}
            />
          )}
        </div>

        {/* CapEx Ratio and Revenue Growth */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* CapEx Ratio Calculator */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
              設備投資比率
            </h3>

            <div className="space-y-3">
              <InputField
                label="設備投資額（百万円）"
                value={capex}
                onChange={setCapex}
              />

              <InputField
                label="減価償却費（百万円）"
                value={depreciation}
                onChange={setDepreciation}
              />
            </div>

            {capexRatio !== null && (
              <div className="mt-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {capexRatio.toFixed(2)}x
                </div>
                {renderJudgment(getCapExRatioJudgment(capexRatio))}
              </div>
            )}
          </div>

          {/* Revenue Growth Calculator */}
          <div>
            <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
              売上高成長率（4年間）
            </h3>

            <div className="space-y-3">
              <InputField
                label="今期売上高（百万円）"
                value={currentRevenue}
                onChange={setCurrentRevenue}
              />

              <InputField
                label="4期前売上高（百万円）"
                value={pastRevenue}
                onChange={setPastRevenue}
              />
            </div>

            {revenueGrowth !== null && (
              <div className="mt-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {revenueGrowth > 0 ? '+' : ''}{revenueGrowth.toFixed(1)}%
                </div>
                {renderJudgment(getRevenueGrowthJudgment(revenueGrowth))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
