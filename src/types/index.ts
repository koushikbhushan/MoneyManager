// Budget Category Types (legacy, for reference)
export interface BudgetCategory {
  id: string;
  name: string;
  budget: number;
  spent: number;
}

// New Overall Plan and Monthly Budget Types
export interface OverallPlanCategory {
  name: string;
  defaultBudget: number;
}

export interface OverallPlan {
  _id: string;
  name: string;
  userId: string;
  categories: OverallPlanCategory[];
}

export interface MonthlyBudgetCategory {
  name: string;
  budget: number;
}

export interface BudgetItem {
  _id: string;
  categoryName: string;
  name: string;
  amount: number;
  date: string;
  note?: string;
}

export interface MonthlyBudget {
  _id: string;
  month: number;
  year: number;
  userId: string;
  categories: MonthlyBudgetCategory[];
  items: BudgetItem[];
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
