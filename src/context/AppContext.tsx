import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BudgetCategory, Investment } from '../types';

// Mock data for initial state
const initialBudgetCategories: BudgetCategory[] = [
  { id: '1', name: 'Housing', budget: 1200, spent: 1000 },
  { id: '2', name: 'Food', budget: 500, spent: 350 },
  { id: '3', name: 'Transportation', budget: 300, spent: 250 },
  { id: '4', name: 'Entertainment', budget: 200, spent: 150 },
  { id: '5', name: 'Utilities', budget: 250, spent: 220 },
];

const initialInvestments: Investment[] = [
  { 
    id: '1', 
    name: 'Apple Inc.', 
    ticker: 'AAPL', 
    type: 'Stock', 
    value: 5000, 
    initialInvestment: 4000,
    returnPercentage: 25
  },
  { 
    id: '2', 
    name: 'S&P 500 ETF', 
    ticker: 'SPY', 
    type: 'ETF', 
    value: 10000, 
    initialInvestment: 9000,
    returnPercentage: 11.11
  },
  { 
    id: '3', 
    name: 'Bitcoin', 
    ticker: 'BTC', 
    type: 'Cryptocurrency', 
    value: 3000, 
    initialInvestment: 2000,
    returnPercentage: 50
  },
  { 
    id: '4', 
    name: '401(k)', 
    ticker: 'N/A', 
    type: 'Retirement', 
    value: 50000, 
    initialInvestment: 45000,
    returnPercentage: 11.11
  },
];

// Define the context type
interface AppContextType {
  budgetCategories: BudgetCategory[];
  investments: Investment[];
  addBudgetCategory: (category: Omit<BudgetCategory, 'id'>) => void;
  updateBudgetCategory: (category: BudgetCategory) => void;
  deleteBudgetCategory: (id: string) => void;
  addInvestment: (investment: Omit<Investment, 'id'>) => void;
  updateInvestment: (investment: Investment) => void;
  deleteInvestment: (id: string) => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>(initialBudgetCategories);
  const [investments, setInvestments] = useState<Investment[]>(initialInvestments);

  // Budget category functions
  const addBudgetCategory = (category: Omit<BudgetCategory, 'id'>) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(), // Simple ID generation
    };
    setBudgetCategories([...budgetCategories, newCategory]);
  };

  const updateBudgetCategory = (category: BudgetCategory) => {
    setBudgetCategories(
      budgetCategories.map((item) => (item.id === category.id ? category : item))
    );
  };

  const deleteBudgetCategory = (id: string) => {
    setBudgetCategories(budgetCategories.filter((item) => item.id !== id));
  };

  // Investment functions
  const addInvestment = (investment: Omit<Investment, 'id'>) => {
    const newInvestment = {
      ...investment,
      id: Date.now().toString(), // Simple ID generation
    };
    setInvestments([...investments, newInvestment]);
  };

  const updateInvestment = (investment: Investment) => {
    setInvestments(
      investments.map((item) => (item.id === investment.id ? investment : item))
    );
  };

  const deleteInvestment = (id: string) => {
    setInvestments(investments.filter((item) => item.id !== id));
  };

  const value = {
    budgetCategories,
    investments,
    addBudgetCategory,
    updateBudgetCategory,
    deleteBudgetCategory,
    addInvestment,
    updateInvestment,
    deleteInvestment,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
