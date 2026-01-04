"use client";

import { useState, useEffect } from "react";
import InputField from "./input-field";
import { useFinancialData } from "../contexts/financial-data-context";
import {
  calculatePER,
  calculatePBR,
  calculateDividendYield,
  getPERJudgment,
  getPBRJudgment,
  getDividendYieldJudgment,
  ValuationJudgment
} from "../utils/financial";

/**
 * Valuation Metrics Calculator Component
 * Analyzes PER, PBR, and Dividend Yield
 */
export default function ValuationCalculator() {
  const { data: financialData } = useFinancialData();

  // PER state
  const [marketCapPER, setMarketCapPER] = useState('');
  const [netIncome, setNetIncome] = useState('');
  const [per, setPer] = useState<number | null>(null);

  // PBR state
  const [marketCapPBR, setMarketCapPBR] = useState('');
  const [equity, setEquity] = useState('');
  const [pbr, setPbr] = useState<number | null>(null);

  // Dividend Yield state
  const [annualDividend, setAnnualDividend] = useState('');
  const [stockPrice, setStockPrice] = useState('');
  const [dividendYield, setDividendYield] = useState<number | null>(null);

  // Auto-fill from fetched data
  useEffect(() => {
    if (financialData) {
      if (financialData.marketCap) {
        setMarketCapPER(financialData.marketCap);
        setMarketCapPBR(financialData.marketCap);
      }
      if (financialData.netIncome) setNetIncome(financialData.netIncome);
      if (financialData.equity) setEquity(financialData.equity);
      if (financialData.stockPrice) setStockPrice(financialData.stockPrice);
      if (financialData.annualDividend) setAnnualDividend(financialData.annualDividend);
    }
  }, [financialData]);

  // Auto-calculate PER
  useEffect(() => {
    const marketCapNum = Number(marketCapPER);
    const incomeNum = Number(netIncome);

    if (marketCapNum > 0 && incomeNum > 0) {
      const result = calculatePER(marketCapNum, incomeNum);
      setPer(result);
    } else {
      setPer(null);
    }
  }, [marketCapPER, netIncome]);

  // Auto-calculate PBR
  useEffect(() => {
    const marketCapNum = Number(marketCapPBR);
    const equityNum = Number(equity);

    if (marketCapNum > 0 && equityNum > 0) {
      const result = calculatePBR(marketCapNum, equityNum);
      setPbr(result);
    } else {
      setPbr(null);
    }
  }, [marketCapPBR, equity]);

  // Auto-calculate Dividend Yield
  useEffect(() => {
    const dividendNum = Number(annualDividend);
    const priceNum = Number(stockPrice);

    if (dividendNum >= 0 && priceNum > 0) {
      const result = calculateDividendYield(dividendNum, priceNum);
      setDividendYield(result);
    } else {
      setDividendYield(null);
    }
  }, [annualDividend, stockPrice]);

  const renderJudgment = (judgment: ValuationJudgment) => (
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
        <span className="text-blue-600 dark:text-blue-400 mr-2">4.</span>
        割安性分析
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* PER Calculator */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            PER（株価収益率）
          </h3>

          <div className="space-y-3">
            <InputField
              label="時価総額（百万円）"
              value={marketCapPER}
              onChange={setMarketCapPER}
            />

            <InputField
              label="純利益（百万円）"
              value={netIncome}
              onChange={setNetIncome}
            />
          </div>

          {per !== null && (
            <div className="mt-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {per.toFixed(1)}倍
              </div>
              {renderJudgment(getPERJudgment(per))}
            </div>
          )}
        </div>

        {/* PBR Calculator */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            PBR（株価純資産倍率）
          </h3>

          <div className="space-y-3">
            <InputField
              label="時価総額（百万円）"
              value={marketCapPBR}
              onChange={setMarketCapPBR}
            />

            <InputField
              label="純資産（百万円）"
              value={equity}
              onChange={setEquity}
            />
          </div>

          {pbr !== null && (
            <div className="mt-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {pbr.toFixed(2)}倍
              </div>
              {renderJudgment(getPBRJudgment(pbr))}
            </div>
          )}
        </div>

        {/* Dividend Yield Calculator */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            配当利回り
          </h3>

          <div className="space-y-3">
            <InputField
              label="年間配当（円）"
              value={annualDividend}
              onChange={setAnnualDividend}
            />

            <InputField
              label="株価（円）"
              value={stockPrice}
              onChange={setStockPrice}
            />
          </div>

          {dividendYield !== null && (
            <div className="mt-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {dividendYield.toFixed(2)}%
              </div>
              {renderJudgment(getDividendYieldJudgment(dividendYield))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
