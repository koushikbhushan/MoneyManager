import express from 'express';
import BudgetCategory from '../models/BudgetCategory';

const router = express.Router();

// Get all budget categories
router.get('/', async (req, res) => {
  const categories = await BudgetCategory.find();
  res.json(categories);
});

// Create a new budget category
router.post('/', async (req, res) => {
  const { name, budget, spent } = req.body;
  const category = new BudgetCategory({ name, budget, spent });
  await category.save();
  res.status(201).json(category);
});

// Update a budget category
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, budget, spent } = req.body;
  const category = await BudgetCategory.findByIdAndUpdate(id, { name, budget, spent }, { new: true });
  if (!category) return res.status(404).json({ error: 'Not found' });
  res.json(category);
});

// Delete a budget category
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const category = await BudgetCategory.findByIdAndDelete(id);
  if (!category) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
