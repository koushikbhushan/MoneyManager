import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  OverallPlan,
  MonthlyBudget,
  OverallPlanCategory,
  MonthlyBudgetCategory,
  BudgetItem,
  Investment,
} from '../types';
import * as api from '../utils/api';
import * as budgetApi from '../utils/budgetApi';

// Define the context type
interface AppContextType {
  overallPlan: OverallPlan | null;
  monthlyBudget: MonthlyBudget | null;
  loading: boolean;
  error: string | null;
  fetchOverallPlan: () => Promise<void>;
  saveOverallPlan: (data: Partial<OverallPlan>) => Promise<void>;
  updateOverallPlanCategory: (catName: string, data: Partial<OverallPlanCategory>) => Promise<void>;
  fetchMonthlyBudget: (year: number, month: number) => Promise<void>;
  updateMonthlyBudgetCategories: (categories: MonthlyBudgetCategory[]) => Promise<void>;
  addOrEditBudgetItem: (item: Partial<BudgetItem>, itemId?: string) => Promise<void>;
  deleteBudgetItem: (itemId: string) => Promise<void>;
  // Investments (legacy)
  investments: Investment[];
  fetchInvestments: () => Promise<void>;
  addInvestment: (investment: Omit<Investment, 'id'>) => Promise<void>;
  updateInvestment: (investment: Investment) => Promise<void>;
  deleteInvestment: (id: string) => Promise<void>;
}


const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [overallPlan, setOverallPlan] = useState<OverallPlan | null>(null);
  const [monthlyBudget, setMonthlyBudget] = useState<MonthlyBudget | null>(null);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  // New: Fetch overall plan
  const fetchOverallPlan = async () => {
    setLoading(true);
    setError(null);
    try {
      const plan = await budgetApi.fetchOverallPlan();
      setOverallPlan(plan);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch overall plan');
    } finally {
      setLoading(false);
    }
  };

  // New: Save overall plan
  const saveOverallPlan = async (data: Partial<OverallPlan>) => {
    setLoading(true);
    setError(null);
    try {
      await budgetApi.saveOverallPlan(data);
      await fetchOverallPlan();
    } catch (err: any) {
      setError(err.message || 'Failed to save overall plan');
    } finally {
      setLoading(false);
    }
  };

  // New: Update overall plan category
  const updateOverallPlanCategory = async (catName: string, data: Partial<OverallPlanCategory>) => {
    setLoading(true);
    setError(null);
    try {
      await budgetApi.updateOverallPlanCategory(catName, data);
      await fetchOverallPlan();
    } catch (err: any) {
      setError(err.message || 'Failed to update category');
    } finally {
      setLoading(false);
    }
  };

  // New: Fetch monthly budget
  const fetchMonthlyBudget = async (year: number, month: number) => {
    setLoading(true);
    setError(null);
    try {
      const mb = await budgetApi.fetchMonthlyBudget(year, month);
      setMonthlyBudget(mb);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch monthly budget');
    } finally {
      setLoading(false);
    }
  };

  // New: Update monthly budget categories
  const updateMonthlyBudgetCategories = async (categories: MonthlyBudgetCategory[]) => {
    if (!monthlyBudget) return;
    setLoading(true);
    setError(null);
    try {
      await budgetApi.updateMonthlyBudgetCategories(monthlyBudget._id, categories);
      await fetchMonthlyBudget(monthlyBudget.year, monthlyBudget.month);
    } catch (err: any) {
      setError(err.message || 'Failed to update monthly categories');
    } finally {
      setLoading(false);
    }
  };

  // New: Add or edit budget item
  const addOrEditBudgetItem = async (item: Partial<BudgetItem>, itemId?: string) => {
    if (!monthlyBudget) return;
    setLoading(true);
    setError(null);
    try {
      await budgetApi.addOrEditBudgetItem(monthlyBudget._id, item, itemId);
      await fetchMonthlyBudget(monthlyBudget.year, monthlyBudget.month);
    } catch (err: any) {
      setError(err.message || 'Failed to save item');
    } finally {
      setLoading(false);
    }
  };

  // New: Delete budget item
  const deleteBudgetItem = async (itemId: string) => {
    if (!monthlyBudget) return;
    setLoading(true);
    setError(null);
    try {
      await budgetApi.deleteBudgetItem(monthlyBudget._id, itemId);
      await fetchMonthlyBudget(monthlyBudget.year, monthlyBudget.month);
    } catch (err: any) {
      setError(err.message || 'Failed to delete item');
    } finally {
      setLoading(false);
    }
  };


  // Initial load: fetch overall plan and current month budget
  useEffect(() => {
    fetchOverallPlan();
    const now = new Date();
    fetchMonthlyBudget(now.getFullYear(), now.getMonth() + 1);
  }, []);

  // Budget category functions

  // Investment functions
  const addInvestment = async (investment: Omit<Investment, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      await api.addInvestment(investment);
      await fetchInvestments();
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
      await fetchInvestments();
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
      await fetchInvestments();
    } catch (err: any) {
      setError(err.message || 'Failed to delete investment');
    } finally {
      setLoading(false);
    }
  };


  // Legacy investment functions (unchanged)
  const fetchInvestments = async () => {
    setLoading(true);
    setError(null);
    try {
      const invs = await api.fetchInvestments();
      setInvestments(invs);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch investments');
    } finally {
      setLoading(false);
    }
  };

  const value: AppContextType = {
    overallPlan,
    monthlyBudget,
    loading,
    error,
    fetchOverallPlan,
    saveOverallPlan,
    updateOverallPlanCategory,
    fetchMonthlyBudget,
    updateMonthlyBudgetCategories,
    addOrEditBudgetItem,
    deleteBudgetItem,
    investments,
    fetchInvestments,
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
