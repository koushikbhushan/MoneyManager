const API_BASE_URL = 'http://localhost:5000/api'; // Change to your backend URL if needed

export async function fetchBudgetCategories() {
  const res = await fetch(`${API_BASE_URL}/budget-categories`);
  if (!res.ok) throw new Error('Failed to fetch budget categories');
  return res.json();
}

export async function addBudgetCategory(category) {
  const res = await fetch(`${API_BASE_URL}/budget-categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error('Failed to add budget category');
  return res.json();
}

export async function updateBudgetCategory(id, category) {
  const res = await fetch(`${API_BASE_URL}/budget-categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error('Failed to update budget category');
  return res.json();
}

export async function deleteBudgetCategory(id) {
  const res = await fetch(`${API_BASE_URL}/budget-categories/${id}`, {
    method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete budget category');
  return res.json();
}

export async function fetchInvestments() {
  const res = await fetch(`${API_BASE_URL}/investments`);
  if (!res.ok) throw new Error('Failed to fetch investments');
  return res.json();
}

export async function addInvestment(investment) {
  const res = await fetch(`${API_BASE_URL}/investments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(investment),
  });
  if (!res.ok) throw new Error('Failed to add investment');
  return res.json();
}

export async function updateInvestment(id, investment) {
  const res = await fetch(`${API_BASE_URL}/investments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(investment),
  });
  if (!res.ok) throw new Error('Failed to update investment');
  return res.json();
}

export async function deleteInvestment(id) {
  const res = await fetch(`${API_BASE_URL}/investments/${id}`, {
    method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete investment');
  return res.json();
}
