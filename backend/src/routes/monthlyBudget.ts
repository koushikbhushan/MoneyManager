import express from 'express';
import MonthlyBudget from '../models/MonthlyBudget';
import OverallPlan from '../models/OverallPlan';

const router = express.Router();

// Get monthly budget, merging with overall plan if needed
router.get('/:year/:month', async (req, res) => {
  const { year, month } = req.params;
  const userId = req.query.userId || 'default';
  let monthly = await MonthlyBudget.findOne({ year, month, userId });
  if (!monthly) {
    // Fallback to overall plan
    const plan = await OverallPlan.findOne({ userId });
    if (!plan) return res.status(404).json({ error: 'No plan found' });
    monthly = new MonthlyBudget({
      year,
      month,
      userId,
      categories: plan.categories.map(c => ({ name: c.name, budget: c.defaultBudget })),
      items: [],
    });
    await monthly.save();
  }
  res.json(monthly);
});

// Update monthly budget (categories)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { categories } = req.body;
  const monthly = await MonthlyBudget.findByIdAndUpdate(id, { categories }, { new: true });
  if (!monthly) return res.status(404).json({ error: 'Not found' });
  res.json(monthly);
});

// Add or edit a budget item

router.post('/:id/items', async (req, res) => {
  const { id } = req.params;
  const { item, itemId } = req.body;
  const monthly = await MonthlyBudget.findById(id);
  if (!monthly) return res.status(404).json({ error: 'Not found' });
  if (itemId) {
    // Edit
    const subdoc = monthly.items.id(itemId);
    if (!subdoc) return res.status(404).json({ error: 'Item not found' });
    Object.assign(subdoc, item);
  } else {
    // Add
    monthly.items.push(item);
  }
  await monthly.save();
  res.json(monthly);
});

// Delete a budget item

router.delete('/:id/items/:itemId', async (req, res) => {
  const { id, itemId } = req.params;
  const monthly = await MonthlyBudget.findById(id);
  if (!monthly) return res.status(404).json({ error: 'Not found' });
  const subdoc = monthly.items.id(itemId);
  if (!subdoc) return res.status(404).json({ error: 'Item not found' });
  monthly.items.pull(itemId);
  await monthly.save();
  res.json(monthly);
});

export default router;
