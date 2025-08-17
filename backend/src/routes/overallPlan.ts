import express from 'express';
import OverallPlan from '../models/OverallPlan';

const router = express.Router();

// Get overall plan for a user (for now, single user)
router.get('/', async (req, res) => {
  const plan = await OverallPlan.findOne();
  res.json(plan);
});

// Create or update overall plan
router.post('/', async (req, res) => {
  const { name, userId, categories } = req.body;
  let plan = await OverallPlan.findOne({ userId });
  if (plan) {
    plan.name = name;
    plan.categories = categories;
    await plan.save();
  } else {
    plan = new OverallPlan({ name, userId, categories });
    await plan.save();
  }
  res.json(plan);
});

// Edit a category in the overall plan
router.put('/category/:catName', async (req, res) => {
  const { userId, name, defaultBudget } = req.body;
  const plan = await OverallPlan.findOne({ userId });
  if (!plan) return res.status(404).json({ error: 'Plan not found' });
  const cat = plan.categories.find(c => c.name === req.params.catName);
  if (!cat) return res.status(404).json({ error: 'Category not found' });
  cat.name = name;
  cat.defaultBudget = defaultBudget;
  await plan.save();
  res.json(plan);
});

export default router;
