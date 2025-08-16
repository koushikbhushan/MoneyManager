import mongoose, { Document, Schema } from 'mongoose';

export interface IBudgetCategory extends Document {
  name: string;
  budget: number;
  spent: number;
}

const BudgetCategorySchema = new Schema<IBudgetCategory>({
  name: { type: String, required: true },
  budget: { type: Number, required: true },
  spent: { type: Number, required: true, default: 0 },
}, { timestamps: true });

export default mongoose.model<IBudgetCategory>('BudgetCategory', BudgetCategorySchema);
