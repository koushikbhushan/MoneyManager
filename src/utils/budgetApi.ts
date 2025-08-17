// API utility for monthly budgeting and overall plan endpoints
const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchOverallPlan(userId = 'default') {
  const res = await fetch(`${API_BASE_URL}/overall-plan?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch overall plan');
  return res.json();
}

export async function saveOverallPlan(data: any) {
  const res = await fetch(`${API_BASE_URL}/overall-plan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save overall plan');
  return res.json();
}

export async function updateOverallPlanCategory(catName: string, data: any) {
  const res = await fetch(`${API_BASE_URL}/overall-plan/category/${catName}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update category');
  return res.json();
}

export async function fetchMonthlyBudget(year: number, month: number, userId: string = 'default') {
  const res = await fetch(`${API_BASE_URL}/monthly-budget/${year}/${month}?userId=${userId}`);
  if (!res.ok) throw new Error('Failed to fetch monthly budget');
  return res.json();
}

export async function updateMonthlyBudgetCategories(id: string, categories: any[]) {
  const res = await fetch(`${API_BASE_URL}/monthly-budget/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ categories }),
  });
  if (!res.ok) throw new Error('Failed to update monthly categories');
  return res.json();
}

export async function addOrEditBudgetItem(monthlyId: string, item: any, itemId?: string) {
  const res = await fetch(`${API_BASE_URL}/monthly-budget/${monthlyId}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item, itemId }),
  });
  if (!res.ok) throw new Error('Failed to save item');
  return res.json();
}

export async function deleteBudgetItem(monthlyId: string, itemId: string) {
  const res = await fetch(`${API_BASE_URL}/monthly-budget/${monthlyId}/items/${itemId}`, {
    method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete item');
  return res.json();
}
