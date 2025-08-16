import express from 'express';
import Investment from '../models/Investment';

const router = express.Router();

// Get all investments
router.get('/', async (req, res) => {
  const investments = await Investment.find();
  res.json(investments);
});

// Create a new investment
router.post('/', async (req, res) => {
  const { name, ticker, type, value, initialInvestment, returnPercentage } = req.body;
  const investment = new Investment({ name, ticker, type, value, initialInvestment, returnPercentage });
  await investment.save();
  res.status(201).json(investment);
});

// Update an investment
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, ticker, type, value, initialInvestment, returnPercentage } = req.body;
  const investment = await Investment.findByIdAndUpdate(id, { name, ticker, type, value, initialInvestment, returnPercentage }, { new: true });
  if (!investment) return res.status(404).json({ error: 'Not found' });
  res.json(investment);
});

// Delete an investment
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const investment = await Investment.findByIdAndDelete(id);
  if (!investment) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
