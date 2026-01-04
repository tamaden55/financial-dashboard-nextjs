import { NextRequest, NextResponse } from 'next/server';

/**
 * EDINET API Route Handler
 * Fetches financial data from Japan's EDINET (Electronic Disclosure for Investors' NETwork)
 */

const EDINET_BASE_URL = 'https://disclosure.edinet-fsa.go.jp/api/v2';

interface EdinetDocument {
  docID: string;
  filerName: string;
  docDescription: string;
  submitDateTime: string;
  secCode?: string;
}

interface EdinetDocumentsResponse {
  metadata: {
    resultset: {
      count: number;
    };
  };
  results: EdinetDocument[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code: securitiesCode } = await params;

  try {
    console.log('API called with code:', securitiesCode);

    // For now, return placeholder data immediately
    // TODO: Implement real EDINET data fetching later
    const financialData = {
      // Growth metrics
      revenue: '100000',
      marketCap: '500000',
      capex: '5000',
      depreciation: '3000',
      revenueCurrentYear: '100000',
      revenueFourYearsAgo: '80000',

      // Profitability metrics
      netIncome: '10000',
      equity: '200000',
      totalAssets: '300000',
      operatingIncome: '15000',

      // Safety metrics
      currentAssets: '150000',
      currentLiabilities: '50000',

      // Valuation metrics
      stockPrice: '2500',
      annualDividend: '100',
    };

    return NextResponse.json({
      companyName: `企業コード${securitiesCode}`,
      submitDate: new Date().toISOString(),
      financialData,
    });
  } catch (error) {
    console.error('EDINET API Error:', error);
    return NextResponse.json(
      { error: 'データ取得中にエラーが発生しました' },
      { status: 500 }
    );
  }
}

/**
 * Find the latest securities report for a given company
 */
async function findLatestSecuritiesReport(
  securitiesCode: string
): Promise<EdinetDocument | null> {
  // Search for documents from the past 6 months
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 6);

  const dateStr = formatDate(endDate);

  // Type 2 = 有価証券報告書 (Securities Report)
  const url = `${EDINET_BASE_URL}/documents.json?date=${dateStr}&type=2`;

  const response = await fetch(url);
  const data: EdinetDocumentsResponse = await response.json();

  if (!data.results || data.results.length === 0) {
    return null;
  }

  // Filter by securities code and find the most recent report
  const documents = data.results.filter((doc) => doc.secCode === securitiesCode);

  if (documents.length === 0) {
    return null;
  }

  // Sort by submission date (most recent first)
  documents.sort((a, b) =>
    new Date(b.submitDateTime).getTime() - new Date(a.submitDateTime).getTime()
  );

  return documents[0];
}

/**
 * Fetch and parse financial data from XBRL
 */
async function fetchFinancialData(docID: string) {
  // Type 5 = XBRL形式のデータ
  const url = `${EDINET_BASE_URL}/documents/${docID}?type=5`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch XBRL data');
  }

  // For now, return a placeholder
  // TODO: Parse XBRL data properly
  // This requires unzipping the response and parsing XML

  return {
    // Growth metrics
    revenue: '100000',
    marketCap: '500000',
    capex: '5000',
    depreciation: '3000',
    revenueCurrentYear: '100000',
    revenueFourYearsAgo: '80000',

    // Profitability metrics
    netIncome: '10000',
    equity: '200000',
    totalAssets: '300000',
    operatingIncome: '15000',

    // Safety metrics
    currentAssets: '150000',
    currentLiabilities: '50000',

    // Valuation metrics
    stockPrice: '2500',
    annualDividend: '100',
  };
}

/**
 * Format date as YYYY-MM-DD
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
