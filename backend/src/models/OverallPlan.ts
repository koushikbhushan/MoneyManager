import mongoose, { Document, Schema } from 'mongoose';

export interface IOverallPlanCategory {
  name: string;
  defaultBudget: number;
}

export interface IOverallPlan extends Document {
  name: string;
  userId: string;
  categories: IOverallPlanCategory[];
}

const OverallPlanCategorySchema = new Schema<IOverallPlanCategory>({
  name: { type: String, required: true },
  defaultBudget: { type: Number, required: true },
});

const OverallPlanSchema = new Schema<IOverallPlan>({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  categories: [OverallPlanCategorySchema],
});

export default mongoose.model<IOverallPlan>('OverallPlan', OverallPlanSchema);
