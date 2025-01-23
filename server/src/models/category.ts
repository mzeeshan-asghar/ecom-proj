import mongoose, { Schema } from "mongoose";

// Category Schema
export interface ICategory extends Document {
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model<ICategory>("Category", categorySchema);

export default CategoryModel;
