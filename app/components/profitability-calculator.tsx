"use client";

import { useState, useEffect } from "react";
import InputField from "./input-field";
import { useFinancialData } from "../contexts/financial-data-context";
import {
  calculateROE,
  calculateROA,
  calculateOperatingMargin,
  getROEJudgment,
  getROAJudgment,
  getOperatingMarginJudgment,
  ProfitabilityJudgment
} from "../utils/financial";

/**
 * Profitability Metrics Calculator Component
 * Analyzes ROE, ROA, and Operating Margin
 */
export default function ProfitabilityCalculator() {
  const { data: financialData } = useFinancialData();

  // ROE state
  const [netIncome, setNetIncome] = useState('');
  const [equity, setEquity] = useState('');
  const [roe, setRoe] = useState<number | null>(null);

  // ROA state
  const [totalAssets, setTotalAssets] = useState('');
  const [roa, setRoa] = useState<number | null>(null);

  // Operating Margin state
  const [operatingIncome, setOperatingIncome] = useState('');
  const [revenue, setRevenue] = useState('');
  const [operatingMargin, setOperatingMargin] = useState<number | null>(null);

  // Auto-fill from fetched data
  useEffect(() => {
    if (financialData) {
      if (financialData.netIncome) setNetIncome(financialData.netIncome);
      if (financialData.equity) setEquity(financialData.equity);
      if (financialData.totalAssets) setTotalAssets(financialData.totalAssets);
      if (financialData.operatingIncome) setOperatingIncome(financialData.operatingIncome);
      if (financialData.revenue) setRevenue(financialData.revenue);
    }
  }, [financialData]);

  // Auto-calculate ROE
  useEffect(() => {
    const incomeNum = Number(netIncome);
    const equityNum = Number(equity);

    if (incomeNum > 0 && equityNum > 0) {
      const result = calculateROE(incomeNum, equityNum);
      setRoe(result);
    } else {
      setRoe(null);
    }
  }, [netIncome, equity]);

  // Auto-calculate ROA
  useEffect(() => {
    const incomeNum = Number(netIncome);
    const assetsNum = Number(totalAssets);

    if (incomeNum > 0 && assetsNum > 0) {
      const result = calculateROA(incomeNum, assetsNum);
      setRoa(result);
    } else {
      setRoa(null);
    }
  }, [netIncome, totalAssets]);

  // Auto-calculate Operating Margin
  useEffect(() => {
    const opIncomeNum = Number(operatingIncome);
    const revenueNum = Number(revenue);

    if (opIncomeNum > 0 && revenueNum > 0) {
      const result = calculateOperatingMargin(opIncomeNum, revenueNum);
      setOperatingMargin(result);
    } else {
      setOperatingMargin(null);
    }
  }, [operatingIncome, revenue]);

  const renderJudgment = (judgment: ProfitabilityJudgment) => (
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
        <span className="text-blue-600 dark:text-blue-400 mr-2">2.</span>
        収益性分析
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* ROE Calculator */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            ROE（自己資本利益率）
          </h3>

          <div className="space-y-3">
            <InputField
              label="純利益（百万円）"
              value={netIncome}
              onChange={setNetIncome}
            />

            <InputField
              label="自己資本（百万円）"
              value={equity}
              onChange={setEquity}
            />
          </div>

          {roe !== null && (
            <div className="mt-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {roe.toFixed(1)}%
              </div>
              {renderJudgment(getROEJudgment(roe))}
            </div>
          )}
        </div>

        {/* ROA Calculator */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            ROA（総資産利益率）
          </h3>

          <div className="space-y-3">
            <InputField
              label="純利益（百万円）"
              value={netIncome}
              onChange={setNetIncome}
            />

            <InputField
              label="総資産（百万円）"
              value={totalAssets}
              onChange={setTotalAssets}
            />
          </div>

          {roa !== null && (
            <div className="mt-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {roa.toFixed(1)}%
              </div>
              {renderJudgment(getROAJudgment(roa))}
            </div>
          )}
        </div>

        {/* Operating Margin Calculator */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            営業利益率
          </h3>

          <div className="space-y-3">
            <InputField
              label="営業利益（百万円）"
              value={operatingIncome}
              onChange={setOperatingIncome}
            />

            <InputField
              label="売上高（百万円）"
              value={revenue}
              onChange={setRevenue}
            />
          </div>

          {operatingMargin !== null && (
            <div className="mt-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {operatingMargin.toFixed(1)}%
              </div>
              {renderJudgment(getOperatingMarginJudgment(operatingMargin))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
