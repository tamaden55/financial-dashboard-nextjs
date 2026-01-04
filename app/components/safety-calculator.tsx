"use client";

import { useState, useEffect } from "react";
import InputField from "./input-field";
import { useFinancialData } from "../contexts/financial-data-context";
import {
  calculateCurrentRatio,
  calculateEquityRatio,
  getCurrentRatioJudgment,
  getEquityRatioJudgment,
  SafetyJudgment
} from "../utils/financial";

/**
 * Safety Metrics Calculator Component
 * Analyzes current ratio and equity ratio
 */
export default function SafetyCalculator() {
  const { data: financialData } = useFinancialData();

  // Current Ratio state
  const [currentAssets, setCurrentAssets] = useState('');
  const [currentLiabilities, setCurrentLiabilities] = useState('');
  const [currentRatio, setCurrentRatio] = useState<number | null>(null);

  // Equity Ratio state
  const [equity, setEquity] = useState('');
  const [totalAssets, setTotalAssets] = useState('');
  const [equityRatio, setEquityRatio] = useState<number | null>(null);

  // Auto-fill from fetched data
  useEffect(() => {
    if (financialData) {
      if (financialData.currentAssets) setCurrentAssets(financialData.currentAssets);
      if (financialData.currentLiabilities) setCurrentLiabilities(financialData.currentLiabilities);
      if (financialData.equity) setEquity(financialData.equity);
      if (financialData.totalAssets) setTotalAssets(financialData.totalAssets);
    }
  }, [financialData]);

  // Auto-calculate Current Ratio
  useEffect(() => {
    const assetsNum = Number(currentAssets);
    const liabilitiesNum = Number(currentLiabilities);

    if (assetsNum > 0 && liabilitiesNum > 0) {
      const result = calculateCurrentRatio(assetsNum, liabilitiesNum);
      setCurrentRatio(result);
    } else {
      setCurrentRatio(null);
    }
  }, [currentAssets, currentLiabilities]);

  // Auto-calculate Equity Ratio
  useEffect(() => {
    const equityNum = Number(equity);
    const assetsNum = Number(totalAssets);

    if (equityNum > 0 && assetsNum > 0) {
      const result = calculateEquityRatio(equityNum, assetsNum);
      setEquityRatio(result);
    } else {
      setEquityRatio(null);
    }
  }, [equity, totalAssets]);

  const renderJudgment = (judgment: SafetyJudgment) => (
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
        <span className="text-blue-600 dark:text-blue-400 mr-2">3.</span>
        安全性分析
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Current Ratio Calculator */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            流動比率
          </h3>

          <div className="space-y-3">
            <InputField
              label="流動資産（百万円）"
              value={currentAssets}
              onChange={setCurrentAssets}
            />

            <InputField
              label="流動負債（百万円）"
              value={currentLiabilities}
              onChange={setCurrentLiabilities}
            />
          </div>

          {currentRatio !== null && (
            <div className="mt-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {currentRatio.toFixed(1)}%
              </div>
              {renderJudgment(getCurrentRatioJudgment(currentRatio))}
            </div>
          )}
        </div>

        {/* Equity Ratio Calculator */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            自己資本比率
          </h3>

          <div className="space-y-3">
            <InputField
              label="自己資本（百万円）"
              value={equity}
              onChange={setEquity}
            />

            <InputField
              label="総資産（百万円）"
              value={totalAssets}
              onChange={setTotalAssets}
            />
          </div>

          {equityRatio !== null && (
            <div className="mt-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {equityRatio.toFixed(1)}%
              </div>
              {renderJudgment(getEquityRatioJudgment(equityRatio))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
