import { NextRequest, NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';

/**
 * Yahoo Finance API Route Handler
 * Fetches financial data from Yahoo Finance for Japanese stocks
 */

// Type definitions for Yahoo Finance response
// These are minimal interfaces for the data we actually use
interface YFPrice {
  longName?: string;
  shortName?: string;
  regularMarketPrice?: number;
  currentPrice?: number;
  marketCap?: number;
  regularMarketTime?: string;
}

interface YFFinancialData {
  totalRevenue?: number;
  ebitda?: number;
  operatingMargins?: number;
  freeCashflow?: number;
  totalCash?: number;
  currentRatio?: number;
  debtToEquity?: number;
}

interface YFSummaryDetail {
  marketCap?: number;
  regularMarketPrice?: number;
  dividendRate?: number;
  trailingAnnualDividendRate?: number;
}

interface YFDefaultKeyStats {
  netIncomeToCommon?: number;
  bookValue?: number;
  sharesOutstanding?: number;
  lastFiscalYearEnd?: string;
  mostRecentQuarter?: string;
}

interface YFIncomeStatement {
  endDate?: string;
  totalRevenue?: number;
  netIncome?: number;
  operatingIncome?: number;
}

interface YFIncomeStatementHistory {
  incomeStatementHistory?: YFIncomeStatement[];
}

interface YFCashflowStatement {
  netIncome?: number;
}

interface YFCashflowStatementHistory {
  cashflowStatements?: YFCashflowStatement[];
}

interface YFQuoteSummary {
  price?: YFPrice;
  financialData?: YFFinancialData;
  summaryDetail?: YFSummaryDetail;
  defaultKeyStatistics?: YFDefaultKeyStats;
  incomeStatementHistory?: YFIncomeStatementHistory;
  cashflowStatementHistory?: YFCashflowStatementHistory;
}

// Initialize YahooFinance instance
const yahooFinance = new YahooFinance();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code: securitiesCode } = await params;

  try {
    console.log('API called with code:', securitiesCode);

    // Add .T suffix for Tokyo Stock Exchange
    const symbol = `${securitiesCode}.T`;

    // Fetch company data - use single quoteSummary call
    const quoteSummaryRaw = await yahooFinance.quoteSummary(symbol, {
      modules: [
        'price',
        'summaryDetail',
        'financialData',
        'defaultKeyStatistics',
        'incomeStatementHistory',
        'balanceSheetHistory',
        'cashflowStatementHistory'
      ]
    });

    // Type-safe assertion for Yahoo Finance response
    const quoteData = quoteSummaryRaw as unknown as YFQuoteSummary;
    const priceInfo = quoteData?.price || {};

    console.log('Found company:', priceInfo.longName || priceInfo.shortName);
    console.log('Raw quoteSummary data:', JSON.stringify(quoteData, null, 2));

    // Extract financial data
    const financialData = extractFinancialData(quoteData);
    console.log('Extracted financial data:', financialData);

    // Get fiscal period information
    const lastFiscalYearEnd = quoteData?.defaultKeyStatistics?.lastFiscalYearEnd || null;
    const mostRecentQuarter = quoteData?.defaultKeyStatistics?.mostRecentQuarter || null;
    const latestIncomeStatement = quoteData?.incomeStatementHistory?.incomeStatementHistory?.[0];
    const fiscalPeriodEnd = latestIncomeStatement?.endDate || lastFiscalYearEnd || mostRecentQuarter;

    return NextResponse.json({
      companyName: priceInfo.longName || priceInfo.shortName || `証券コード ${securitiesCode}`,
      symbol: symbol,
      financialData,
      dataSource: 'Yahoo Finance',
      fetchedAt: new Date().toISOString(),
      lastMarketUpdate: priceInfo.regularMarketTime || null,
      fiscalPeriodEnd: fiscalPeriodEnd,
    });
  } catch (error) {
    console.error('Yahoo Finance API Error:', error);

    // Check if it's a symbol not found error
    if (error instanceof Error && error.message.includes('Not Found')) {
      return NextResponse.json(
        { error: `証券コード ${securitiesCode} が見つかりませんでした。東証上場企業のコードを入力してください。` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'データ取得中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

/**
 * Extract and format financial data from Yahoo Finance response
 */
function extractFinancialData(quoteSummary: YFQuoteSummary) {
  const financialData = quoteSummary?.financialData || {};
  const summaryDetail = quoteSummary?.summaryDetail || {};
  const defaultKeyStats = quoteSummary?.defaultKeyStatistics || {};
  const price = quoteSummary?.price || {};

  // Get latest financial statements (limited data since Nov 2024)
  const incomeStatement = quoteSummary?.incomeStatementHistory?.incomeStatementHistory?.[0];
  const incomeStatements = quoteSummary?.incomeStatementHistory?.incomeStatementHistory || [];
  const cashflow = quoteSummary?.cashflowStatementHistory?.cashflowStatements?.[0];

  // Helper function to safely convert to string
  const toStr = (value: number | undefined | null) => value != null && value !== 0 ? String(value) : '0';

  // Helper function to convert to millions (百万円)
  const toMillions = (value: number | undefined | null) => {
    if (value == null || value === 0) return '0';
    return String(Math.round(value / 1000000));
  };

  // Get current stock price
  const currentPrice = price?.regularMarketPrice || price?.currentPrice || summaryDetail?.regularMarketPrice || 0;

  // Calculate equity from bookValue * sharesOutstanding
  const bookValue = defaultKeyStats?.bookValue || 0;
  const sharesOutstanding = defaultKeyStats?.sharesOutstanding || 0;
  const equity = bookValue * sharesOutstanding;

  // Get historical revenue data
  console.log('Income statements count:', incomeStatements.length);
  incomeStatements.forEach((stmt, idx) => {
    console.log(`Statement ${idx}:`, stmt.endDate, 'Revenue:', stmt.totalRevenue);
  });

  // Filter out quarterly data (identify by comparing with current year)
  // Quarterly data is typically much smaller than annual data
  const currentRevenue = financialData.totalRevenue || incomeStatement?.totalRevenue || 0;
  const annualStatements = incomeStatements.filter((stmt) => {
    // Consider it annual data if revenue is at least 50% of current annual revenue
    return stmt.totalRevenue && stmt.totalRevenue > currentRevenue * 0.5;
  });

  console.log('Annual statements found:', annualStatements.length);

  // Get 4 years ago revenue (use oldest available annual data)
  // Prefer statement from 3-4 years ago if available
  const revenueFourYearsAgo = annualStatements[annualStatements.length - 1]?.totalRevenue ||
                               incomeStatements[2]?.totalRevenue || // Try 3 years ago
                               incomeStatements[1]?.totalRevenue || // Try 2 years ago
                               currentRevenue;

  console.log('Revenue 4 years ago (filtered):', revenueFourYearsAgo);

  // Calculate depreciation from EBITDA
  // EBITDA = Operating Income + Depreciation & Amortization
  // Therefore: Depreciation ≈ EBITDA - Operating Income
  const totalRev = financialData.totalRevenue || incomeStatement?.totalRevenue || 0;
  const operatingIncome = totalRev * (financialData.operatingMargins || 0);
  const ebitda = financialData.ebitda || 0;
  const depreciation = Math.max(0, ebitda - operatingIncome); // D&A approximation

  return {
    // Growth metrics (in millions JPY)
    revenue: toMillions(financialData.totalRevenue || incomeStatement?.totalRevenue),
    marketCap: toMillions(price?.marketCap || summaryDetail?.marketCap),
    capex: toMillions(Math.abs(financialData.freeCashflow || 0)), // Using free cash flow as proxy
    depreciation: toMillions(depreciation),
    revenueCurrentYear: toMillions(financialData.totalRevenue || incomeStatement?.totalRevenue),
    revenueFourYearsAgo: toMillions(revenueFourYearsAgo),

    // Profitability metrics (in millions JPY)
    netIncome: toMillions(defaultKeyStats?.netIncomeToCommon || cashflow?.netIncome || incomeStatement?.netIncome),
    equity: toMillions(equity),
    totalAssets: toMillions(equity * ((financialData.debtToEquity || 0) / 100 + 1)), // Estimate from D/E ratio
    operatingIncome: toMillions(financialData.ebitda || incomeStatement?.operatingIncome),

    // Safety metrics (in millions JPY)
    currentAssets: toMillions((financialData.totalCash || 0) * (financialData.currentRatio || 0)),
    currentLiabilities: toMillions(financialData.totalCash || 0),

    // Valuation metrics (stock price and dividend are in JPY, not millions)
    stockPrice: toStr(currentPrice),
    annualDividend: toStr(summaryDetail?.dividendRate || summaryDetail?.trailingAnnualDividendRate || 0),
  };
}
