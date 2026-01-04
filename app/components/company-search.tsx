"use client";

import { useState } from "react";
import { useFinancialData } from "../contexts/financial-data-context";

export interface FinancialData {
  // 成長性
  revenue?: string;
  marketCap?: string;
  capex?: string;
  depreciation?: string;
  revenueCurrentYear?: string;
  revenueFourYearsAgo?: string;

  // 収益性
  netIncome?: string;
  equity?: string;
  totalAssets?: string;
  operatingIncome?: string;

  // 安全性
  currentAssets?: string;
  currentLiabilities?: string;

  // 割安性
  stockPrice?: string;
  annualDividend?: string;
}

export default function CompanySearch() {
  const { setData } = useFinancialData();
  const [securitiesCode, setSecuritiesCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [fiscalPeriodEnd, setFiscalPeriodEnd] = useState<string | null>(null);

  const handleFetchData = async () => {
    if (!securitiesCode || securitiesCode.length !== 4) {
      setError('4桁の証券コードを入力してください');
      return;
    }

    setLoading(true);
    setError(null);
    setCompanyName(null);
    setDataSource(null);
    setFetchedAt(null);
    setFiscalPeriodEnd(null);

    try {
      const response = await fetch(`/api/edinet/${securitiesCode}`);

      if (!response.ok) {
        throw new Error('データ取得に失敗しました');
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setCompanyName(data.companyName);
      setDataSource(data.dataSource);
      setFetchedAt(data.fetchedAt);
      setFiscalPeriodEnd(data.fiscalPeriodEnd);
      setData(data.financialData);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border-2 border-blue-200 dark:border-blue-900 p-5 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
        <span className="text-2xl mr-2">🔍</span>
        企業データ自動取得（Yahoo Finance API）
      </h2>

      <div className="flex gap-3 items-start">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            証券コード（4桁）
          </label>
          <input
            type="text"
            value={securitiesCode}
            onChange={(e) => setSecuritiesCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && securitiesCode.length === 4 && !loading) {
                handleFetchData();
              }
            }}
            placeholder="例：7203（トヨタ）"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            disabled={loading}
          />
        </div>

        <button
          onClick={handleFetchData}
          disabled={loading || securitiesCode.length !== 4}
          className="mt-7 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {loading ? '取得中...' : 'データ取得'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {companyName && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-400">
            ✓ {companyName} のデータを取得しました
          </p>
          {dataSource && fetchedAt && (
            <p className="text-xs text-green-600 dark:text-green-500 mt-1">
              データソース: {dataSource}
              {fiscalPeriodEnd && (
                <> | 決算期: {new Date(fiscalPeriodEnd).toLocaleString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                })}期</>
              )}
              {' '}| 取得: {new Date(fetchedAt).toLocaleString('ja-JP', {
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>※ Yahoo Finance APIから財務データを取得します</p>
        <p>※ データ取得には数秒かかる場合があります</p>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
          参考サイト（外部リンク）
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="https://shikiho.toyokeizai.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-md transition-colors"
          >
            会社四季報オンライン
          </a>
          <a
            href="https://kabutan.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-md transition-colors"
          >
            株探
          </a>
          <a
            href="https://finance.yahoo.co.jp/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-md transition-colors"
          >
            Yahoo!ファイナンス
          </a>
        </div>
      </div>
    </div>
  );
}
