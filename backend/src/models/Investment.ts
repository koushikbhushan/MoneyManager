import mongoose, { Document, Schema } from 'mongoose';

export type InvestmentType = 'Stock' | 'ETF' | 'Mutual Fund' | 'Bond' | 'Cryptocurrency' | 'Real Estate' | 'Retirement' | 'Other';

export interface IInvestment extends Document {
  name: string;
  ticker: string;
  type: InvestmentType;
  value: number;
  initialInvestment: number;
  returnPercentage: number;
}

const InvestmentSchema = new Schema<IInvestment>({
  name: { type: String, required: true },
  ticker: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: Number, required: true },
  initialInvestment: { type: Number, required: true },
  returnPercentage: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<IInvestment>('Investment', InvestmentSchema);
