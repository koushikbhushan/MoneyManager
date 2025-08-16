// Budget Category Types
export interface BudgetCategory {
  id: string;
  name: string;
  budget: number;
  spent: number;
}

// Investment Types
export interface Investment {
  id: string;
  name: string;
  ticker: string;
  type: InvestmentType;
  value: number;
  initialInvestment: number;
  returnPercentage: number;
}

export type InvestmentType = 'Stock' | 'ETF' | 'Mutual Fund' | 'Bond' | 'Cryptocurrency' | 'Real Estate' | 'Retirement' | 'Other';

// User Preferences
export interface UserPreferences {
  currency: string;
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
}
