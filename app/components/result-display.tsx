/**
 * Component to display PSR calculation results with judgment
 */

import { PSRJudgment } from '../utils/financial';

interface ResultDisplayProps {
  psr: number;
  judgment: PSRJudgment;
  marketCap: string;
  revenue: string;
}

export default function ResultDisplay({ psr, judgment, marketCap, revenue }: ResultDisplayProps) {
  // Calculate bar widths based on values
  const marketCapNum = Number(marketCap.replace(/,/g, ''));
  const revenueNum = Number(revenue.replace(/,/g, ''));
  const maxValue = Math.max(marketCapNum, revenueNum);
  const marketCapWidth = (marketCapNum / maxValue) * 100;
  const revenueWidth = (revenueNum / maxValue) * 100;

  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-3">
        PSR: {psr.toFixed(2)}x
      </div>

      <div className="flex gap-4 mb-3">
        {/* Bar Chart */}
        <div className="flex-shrink-0 w-24">
          <div className="space-y-2">
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">時価総額</div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-sm h-3">
                <div
                  className="bg-blue-500 h-3 rounded-sm transition-all duration-300"
                  style={{ width: `${marketCapWidth}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">売上高</div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-sm h-3">
                <div
                  className="bg-green-500 h-3 rounded-sm transition-all duration-300"
                  style={{ width: `${revenueWidth}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Judgment */}
        <div className="flex-1 text-left">
          <div className={`border-l-4 ${judgment.borderColor} pl-3 py-1.5`}>
            <p className={`text-sm font-semibold ${judgment.textColor} ${judgment.darkTextColor}`}>
              {judgment.title}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
              {judgment.description}
            </p>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-0.5">
        <p>時価総額: {marketCap}百万円</p>
        <p>売上高: {revenue}百万円</p>
      </div>
    </div>
  );
}
