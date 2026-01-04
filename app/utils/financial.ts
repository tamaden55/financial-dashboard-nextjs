/**
 * Financial calculation utilities for investment analysis
 */

/**
 * Calculate PSR (Price-to-Sales Ratio)
 * @param marketCap Market capitalization in million JPY
 * @param revenue Revenue in million JPY
 * @returns PSR ratio
 */
export function calculatePSR(marketCap: number, revenue: number): number {
  if (revenue <= 0) {
    throw new Error('Revenue must be greater than 0');
  }
  return marketCap / revenue;
}

/**
 * PSR judgment result type
 */
export interface PSRJudgment {
  level: 'undervalued' | 'fair' | 'high' | 'very-high';
  color: string;
  borderColor: string;
  textColor: string;
  darkTextColor: string;
  title: string;
  description: string;
}

/**
 * Get PSR judgment based on ratio value
 * @param psr PSR ratio value
 * @returns Judgment object with styling and messages
 */
export function getPSRJudgment(psr: number): PSRJudgment {
  if (psr < 1) {
    return {
      level: 'undervalued',
      color: 'green',
      borderColor: 'border-green-500',
      textColor: 'text-green-700',
      darkTextColor: 'dark:text-green-400',
      title: '割安',
      description: '時価総額が売上高を下回っており、市場の期待値は控えめ'
    };
  }

  if (psr < 2) {
    return {
      level: 'fair',
      color: 'yellow',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-700',
      darkTextColor: 'dark:text-yellow-400',
      title: '適正〜やや高め',
      description: '時価総額は売上高と同程度、標準的な評価'
    };
  }

  if (psr < 5) {
    return {
      level: 'high',
      color: 'orange',
      borderColor: 'border-orange-500',
      textColor: 'text-orange-700',
      darkTextColor: 'dark:text-orange-400',
      title: '高成長期待',
      description: '市場は将来の成長を見込んでいる'
    };
  }

  return {
    level: 'very-high',
    color: 'red',
    borderColor: 'border-red-500',
    textColor: 'text-red-700',
    darkTextColor: 'dark:text-red-400',
    title: '非常に高い期待値',
    description: '高成長企業またはバブル的評価の可能性'
  };
}

/**
 * SAFETY METRICS
 */

/**
 * Calculate Current Ratio (流動比率)
 * @param currentAssets Current assets in million JPY
 * @param currentLiabilities Current liabilities in million JPY
 * @returns Current ratio in percentage
 */
export function calculateCurrentRatio(currentAssets: number, currentLiabilities: number): number {
  if (currentLiabilities <= 0) {
    throw new Error('Current liabilities must be greater than 0');
  }
  return (currentAssets / currentLiabilities) * 100;
}

/**
 * Calculate Equity Ratio (自己資本比率)
 * @param equity Equity in million JPY
 * @param totalAssets Total assets in million JPY
 * @returns Equity ratio in percentage
 */
export function calculateEquityRatio(equity: number, totalAssets: number): number {
  if (totalAssets <= 0) {
    throw new Error('Total assets must be greater than 0');
  }
  return (equity / totalAssets) * 100;
}

/**
 * Safety judgment result type
 */
export interface SafetyJudgment {
  level: 'excellent' | 'good' | 'fair' | 'warning';
  borderColor: string;
  textColor: string;
  darkTextColor: string;
  title: string;
  description: string;
}

/**
 * Get Current Ratio judgment
 * @param ratio Current ratio percentage
 * @returns Judgment object
 */
export function getCurrentRatioJudgment(ratio: number): SafetyJudgment {
  if (ratio >= 200) {
    return {
      level: 'excellent',
      borderColor: 'border-green-500',
      textColor: 'text-green-700',
      darkTextColor: 'dark:text-green-400',
      title: '優良',
      description: '短期的な財務安定性が非常に高い'
    };
  }
  if (ratio >= 150) {
    return {
      level: 'good',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-700',
      darkTextColor: 'dark:text-blue-400',
      title: '良好',
      description: '事業運営に十分な流動性がある'
    };
  }
  if (ratio >= 100) {
    return {
      level: 'fair',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-700',
      darkTextColor: 'dark:text-yellow-400',
      title: '普通',
      description: '最低限の流動性バッファーあり'
    };
  }
  return {
    level: 'warning',
    borderColor: 'border-red-500',
    textColor: 'text-red-700',
    darkTextColor: 'dark:text-red-400',
    title: '要注意',
    description: '流動負債が流動資産を上回っており、流動性に懸念'
  };
}

/**
 * Get Equity Ratio judgment
 * @param ratio Equity ratio percentage
 * @returns Judgment object
 */
export function getEquityRatioJudgment(ratio: number): SafetyJudgment {
  if (ratio >= 50) {
    return {
      level: 'excellent',
      borderColor: 'border-green-500',
      textColor: 'text-green-700',
      darkTextColor: 'dark:text-green-400',
      title: '優良',
      description: '財務的自立性が非常に高い'
    };
  }
  if (ratio >= 40) {
    return {
      level: 'good',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-700',
      darkTextColor: 'dark:text-blue-400',
      title: '良好',
      description: '強固な財務基盤を持つ'
    };
  }
  if (ratio >= 20) {
    return {
      level: 'fair',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-700',
      darkTextColor: 'dark:text-yellow-400',
      title: '普通',
      description: '中程度の財務安定性'
    };
  }
  return {
    level: 'warning',
    borderColor: 'border-red-500',
    textColor: 'text-red-700',
    darkTextColor: 'dark:text-red-400',
    title: '要注意',
    description: '借入金への依存度が高い'
  };
}

/**
 * GROWTH METRICS
 */

/**
 * Calculate Capital Expenditure Ratio (設備投資比率)
 * @param capex Capital expenditure in million JPY
 * @param depreciation Depreciation in million JPY
 * @returns CapEx to Depreciation ratio
 */
export function calculateCapExRatio(capex: number, depreciation: number): number {
  if (depreciation <= 0) {
    throw new Error('Depreciation must be greater than 0');
  }
  return capex / depreciation;
}

/**
 * Calculate Revenue Growth Rate (売上高成長率)
 * @param currentRevenue Current year revenue in million JPY
 * @param pastRevenue Revenue 4 years ago in million JPY
 * @returns Growth rate in percentage
 */
export function calculateRevenueGrowth(currentRevenue: number, pastRevenue: number): number {
  if (pastRevenue <= 0) {
    throw new Error('Past revenue must be greater than 0');
  }
  return ((currentRevenue - pastRevenue) / pastRevenue) * 100;
}

/**
 * Growth judgment result type
 */
export interface GrowthJudgment {
  level: 'strong' | 'moderate' | 'stable' | 'declining';
  borderColor: string;
  textColor: string;
  darkTextColor: string;
  title: string;
  description: string;
}

/**
 * Get CapEx Ratio judgment
 * @param ratio CapEx to Depreciation ratio
 * @returns Judgment object
 */
export function getCapExRatioJudgment(ratio: number): GrowthJudgment {
  if (ratio >= 1.5) {
    return {
      level: 'strong',
      borderColor: 'border-green-500',
      textColor: 'text-green-700',
      darkTextColor: 'dark:text-green-400',
      title: '積極投資',
      description: '成長と資産更新に積極的に投資している'
    };
  }
  if (ratio >= 1.0) {
    return {
      level: 'moderate',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-700',
      darkTextColor: 'dark:text-blue-400',
      title: '適正投資',
      description: '資産を現状レベルで維持している'
    };
  }
  if (ratio >= 0.7) {
    return {
      level: 'stable',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-700',
      darkTextColor: 'dark:text-yellow-400',
      title: '保守的',
      description: '新規投資が限定的、資産ベースが縮小傾向の可能性'
    };
  }
  return {
    level: 'declining',
    borderColor: 'border-red-500',
    textColor: 'text-red-700',
    darkTextColor: 'dark:text-red-400',
    title: '投資不足',
    description: '資産ベースを維持するには投資が不十分'
  };
}

/**
 * Get Revenue Growth judgment
 * @param growthRate Growth rate percentage
 * @returns Judgment object
 */
export function getRevenueGrowthJudgment(growthRate: number): GrowthJudgment {
  if (growthRate >= 50) {
    return {
      level: 'strong',
      borderColor: 'border-green-500',
      textColor: 'text-green-700',
      darkTextColor: 'dark:text-green-400',
      title: '高成長',
      description: '4年間で顕著な売上高拡大'
    };
  }
  if (growthRate >= 20) {
    return {
      level: 'moderate',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-700',
      darkTextColor: 'dark:text-blue-400',
      title: '堅実な成長',
      description: '健全な売上高成長軌道'
    };
  }
  if (growthRate >= 0) {
    return {
      level: 'stable',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-700',
      darkTextColor: 'dark:text-yellow-400',
      title: '安定',
      description: '売上高を維持または微増'
    };
  }
  return {
    level: 'declining',
    borderColor: 'border-red-500',
    textColor: 'text-red-700',
    darkTextColor: 'dark:text-red-400',
    title: '減少傾向',
    description: '期間内に売上高が減少'
  };
}

/**
 * Profitability Judgment type
 */
export interface ProfitabilityJudgment {
  level: 'excellent' | 'good' | 'fair' | 'poor';
  borderColor: string;
  textColor: string;
  darkTextColor: string;
  title: string;
  description: string;
}

/**
 * Calculate ROE (Return on Equity)
 * @param netIncome Net income in million JPY
 * @param equity Equity in million JPY
 * @returns ROE percentage
 */
export function calculateROE(netIncome: number, equity: number): number {
  if (equity <= 0) {
    throw new Error('Equity must be greater than 0');
  }
  return (netIncome / equity) * 100;
}

/**
 * Get ROE judgment based on percentage
 */
export function getROEJudgment(roe: number): ProfitabilityJudgment {
  if (roe >= 15) {
    return {
      level: 'excellent',
      borderColor: 'border-green-500',
      textColor: 'text-green-700',
      darkTextColor: 'dark:text-green-400',
      title: '優良',
      description: '株主資本を非常に効率的に活用'
    };
  }
  if (roe >= 10) {
    return {
      level: 'good',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-700',
      darkTextColor: 'dark:text-blue-400',
      title: '良好',
      description: '株主資本を効率的に活用'
    };
  }
  if (roe >= 5) {
    return {
      level: 'fair',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-700',
      darkTextColor: 'dark:text-yellow-400',
      title: '普通',
      description: '改善の余地あり'
    };
  }
  return {
    level: 'poor',
    borderColor: 'border-red-500',
    textColor: 'text-red-700',
    darkTextColor: 'dark:text-red-400',
    title: '要改善',
    description: '資本効率が低い、または赤字'
  };
}

/**
 * Calculate ROA (Return on Assets)
 * @param netIncome Net income in million JPY
 * @param totalAssets Total assets in million JPY
 * @returns ROA percentage
 */
export function calculateROA(netIncome: number, totalAssets: number): number {
  if (totalAssets <= 0) {
    throw new Error('Total assets must be greater than 0');
  }
  return (netIncome / totalAssets) * 100;
}

/**
 * Get ROA judgment based on percentage
 */
export function getROAJudgment(roa: number): ProfitabilityJudgment {
  if (roa >= 10) {
    return {
      level: 'excellent',
      borderColor: 'border-green-500',
      textColor: 'text-green-700',
      darkTextColor: 'dark:text-green-400',
      title: '優良',
      description: '総資産を非常に効率的に活用'
    };
  }
  if (roa >= 5) {
    return {
      level: 'good',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-700',
      darkTextColor: 'dark:text-blue-400',
      title: '良好',
      description: '総資産を効率的に活用'
    };
  }
  if (roa >= 2) {
    return {
      level: 'fair',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-700',
      darkTextColor: 'dark:text-yellow-400',
      title: '普通',
      description: '改善の余地あり'
    };
  }
  return {
    level: 'poor',
    borderColor: 'border-red-500',
    textColor: 'text-red-700',
    darkTextColor: 'dark:text-red-400',
    title: '要改善',
    description: '資産効率が低い、または赤字'
  };
}

/**
 * Calculate Operating Margin
 * @param operatingIncome Operating income in million JPY
 * @param revenue Revenue in million JPY
 * @returns Operating margin percentage
 */
export function calculateOperatingMargin(operatingIncome: number, revenue: number): number {
  if (revenue <= 0) {
    throw new Error('Revenue must be greater than 0');
  }
  return (operatingIncome / revenue) * 100;
}

/**
 * Get Operating Margin judgment based on percentage
 */
export function getOperatingMarginJudgment(margin: number): ProfitabilityJudgment {
  if (margin >= 20) {
    return {
      level: 'excellent',
      borderColor: 'border-green-500',
      textColor: 'text-green-700',
      darkTextColor: 'dark:text-green-400',
      title: '優良',
      description: '非常に高い収益性'
    };
  }
  if (margin >= 10) {
    return {
      level: 'good',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-700',
      darkTextColor: 'dark:text-blue-400',
      title: '良好',
      description: '健全な収益性'
    };
  }
  if (margin >= 5) {
    return {
      level: 'fair',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-700',
      darkTextColor: 'dark:text-yellow-400',
      title: '普通',
      description: '改善の余地あり'
    };
  }
  return {
    level: 'poor',
    borderColor: 'border-red-500',
    textColor: 'text-red-700',
    darkTextColor: 'dark:text-red-400',
    title: '要改善',
    description: '収益性が低い、または赤字'
  };
}

/**
 * Valuation Judgment type
 */
export interface ValuationJudgment {
  level: 'undervalued' | 'fair' | 'overvalued' | 'very-overvalued';
  borderColor: string;
  textColor: string;
  darkTextColor: string;
  title: string;
  description: string;
}

/**
 * Calculate PER (Price-to-Earnings Ratio)
 * @param marketCap Market capitalization in million JPY
 * @param netIncome Net income in million JPY
 * @returns PER ratio
 */
export function calculatePER(marketCap: number, netIncome: number): number {
  if (netIncome <= 0) {
    throw new Error('Net income must be greater than 0');
  }
  return marketCap / netIncome;
}

/**
 * Get PER judgment based on ratio
 */
export function getPERJudgment(per: number): ValuationJudgment {
  if (per < 10) {
    return {
      level: 'undervalued',
      borderColor: 'border-green-500',
      textColor: 'text-green-700',
      darkTextColor: 'dark:text-green-400',
      title: '割安',
      description: '利益に対して株価が低い'
    };
  }
  if (per < 20) {
    return {
      level: 'fair',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-700',
      darkTextColor: 'dark:text-blue-400',
      title: '適正',
      description: '標準的な株価水準'
    };
  }
  if (per < 30) {
    return {
      level: 'overvalued',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-700',
      darkTextColor: 'dark:text-yellow-400',
      title: 'やや割高',
      description: '成長期待が織り込まれている'
    };
  }
  return {
    level: 'very-overvalued',
    borderColor: 'border-red-500',
    textColor: 'text-red-700',
    darkTextColor: 'dark:text-red-400',
    title: '割高',
    description: '高い成長期待、またはバブル的'
  };
}

/**
 * Calculate PBR (Price-to-Book Ratio)
 * @param marketCap Market capitalization in million JPY
 * @param equity Equity in million JPY
 * @returns PBR ratio
 */
export function calculatePBR(marketCap: number, equity: number): number {
  if (equity <= 0) {
    throw new Error('Equity must be greater than 0');
  }
  return marketCap / equity;
}

/**
 * Get PBR judgment based on ratio
 */
export function getPBRJudgment(pbr: number): ValuationJudgment {
  if (pbr < 1) {
    return {
      level: 'undervalued',
      borderColor: 'border-green-500',
      textColor: 'text-green-700',
      darkTextColor: 'dark:text-green-400',
      title: '割安',
      description: '解散価値を下回る株価'
    };
  }
  if (pbr < 2) {
    return {
      level: 'fair',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-700',
      darkTextColor: 'dark:text-blue-400',
      title: '適正',
      description: '標準的な株価水準'
    };
  }
  if (pbr < 3) {
    return {
      level: 'overvalued',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-700',
      darkTextColor: 'dark:text-yellow-400',
      title: 'やや割高',
      description: '成長期待が織り込まれている'
    };
  }
  return {
    level: 'very-overvalued',
    borderColor: 'border-red-500',
    textColor: 'text-red-700',
    darkTextColor: 'dark:text-red-400',
    title: '割高',
    description: '高い成長期待、またはバブル的'
  };
}

/**
 * Calculate Dividend Yield
 * @param annualDividend Annual dividend per share in JPY
 * @param stockPrice Current stock price in JPY
 * @returns Dividend yield percentage
 */
export function calculateDividendYield(annualDividend: number, stockPrice: number): number {
  if (stockPrice <= 0) {
    throw new Error('Stock price must be greater than 0');
  }
  return (annualDividend / stockPrice) * 100;
}

/**
 * Get Dividend Yield judgment based on percentage
 */
export function getDividendYieldJudgment(yieldPercent: number): ValuationJudgment {
  if (yieldPercent >= 4) {
    return {
      level: 'undervalued',
      borderColor: 'border-green-500',
      textColor: 'text-green-700',
      darkTextColor: 'dark:text-green-400',
      title: '高配当',
      description: 'インカムゲイン重視の投資家向け'
    };
  }
  if (yieldPercent >= 2) {
    return {
      level: 'fair',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-700',
      darkTextColor: 'dark:text-blue-400',
      title: '標準的',
      description: '平均的な配当水準'
    };
  }
  if (yieldPercent >= 1) {
    return {
      level: 'overvalued',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-700',
      darkTextColor: 'dark:text-yellow-400',
      title: '低配当',
      description: '成長への再投資重視'
    };
  }
  return {
    level: 'very-overvalued',
    borderColor: 'border-red-500',
    textColor: 'text-red-700',
    darkTextColor: 'dark:text-red-400',
    title: '無配当的',
    description: '配当をほぼ出していない'
  };
}
