import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


import budgetCategoriesRouter from './routes/budgetCategories';
import investmentsRouter from './routes/investments';

app.get('/', (req, res) => {
  res.send('MoneyManager backend is running!');
});

app.use('/api/budget-categories', budgetCategoriesRouter);
app.use('/api/investments', investmentsRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || '', {
  // useNewUrlParser: true, useUnifiedTopology: true // not needed in mongoose 6+
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
