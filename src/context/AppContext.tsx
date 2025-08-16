import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BudgetCategory, Investment } from '../types';
import * as api from '../utils/api';

// Define the context type
interface AppContextType {
  budgetCategories: BudgetCategory[];
  investments: Investment[];
  loading: boolean;
  error: string | null;
  fetchAll: () => void;
  addBudgetCategory: (category: Omit<BudgetCategory, 'id'>) => Promise<void>;
  updateBudgetCategory: (category: BudgetCategory) => Promise<void>;
  deleteBudgetCategory: (id: string) => Promise<void>;
  addInvestment: (investment: Omit<Investment, 'id'>) => Promise<void>;
  updateInvestment: (investment: Investment) => Promise<void>;
  deleteInvestment: (id: string) => Promise<void>;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const [cats, invs] = await Promise.all([
        api.fetchBudgetCategories(),
        api.fetchInvestments(),
      ]);
      setBudgetCategories(cats);
      setInvestments(invs);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Budget category functions
  const addBudgetCategory = async (category: Omit<BudgetCategory, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      await api.addBudgetCategory(category);
      await fetchAll();
    } catch (err: any) {
      setError(err.message || 'Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  const updateBudgetCategory = async (category: BudgetCategory) => {
    setLoading(true);
    setError(null);
    try {
      await api.updateBudgetCategory(category.id, category);
      await fetchAll();
    } catch (err: any) {
      setError(err.message || 'Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  const deleteBudgetCategory = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.deleteBudgetCategory(id);
      await fetchAll();
    } catch (err: any) {
      setError(err.message || 'Failed to delete category');
    } finally {
      setLoading(false);
    }
  };

  // Investment functions
  const addInvestment = async (investment: Omit<Investment, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      await api.addInvestment(investment);
      await fetchAll();
    } catch (err: any) {
      setError(err.message || 'Failed to add investment');
    } finally {
      setLoading(false);
    }
  };

  const updateInvestment = async (investment: Investment) => {
    setLoading(true);
    setError(null);
    try {
      await api.updateInvestment(investment.id, investment);
      await fetchAll();
    } catch (err: any) {
      setError(err.message || 'Failed to update investment');
    } finally {
      setLoading(false);
    }
  };

  const deleteInvestment = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.deleteInvestment(id);
      await fetchAll();
    } catch (err: any) {
      setError(err.message || 'Failed to delete investment');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    budgetCategories,
    investments,
    loading,
    error,
    fetchAll,
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
