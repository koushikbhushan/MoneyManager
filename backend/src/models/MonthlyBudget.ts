import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IMonthlyBudgetCategory {
  name: string;
  budget: number;
}

export interface IBudgetItem extends Types.Subdocument {
  categoryName: string;
  name: string;
  amount: number;
  date: Date;
  note?: string;
}

export interface IMonthlyBudget extends Document {
  month: number;
  year: number;
  userId: string;
  categories: IMonthlyBudgetCategory[];
  items: Types.DocumentArray<IBudgetItem>;
}



const MonthlyBudgetCategorySchema = new Schema<IMonthlyBudgetCategory>({
  name: { type: String, required: true },
  budget: { type: Number, required: true },
});

const BudgetItemSchema = new Schema<IBudgetItem>({
  categoryName: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  note: { type: String },
});

const MonthlyBudgetSchema = new Schema<IMonthlyBudget>({
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  userId: { type: String, required: true },
  categories: [MonthlyBudgetCategorySchema],
  items: [BudgetItemSchema],
});

export default mongoose.model<IMonthlyBudget>('MonthlyBudget', MonthlyBudgetSchema);
