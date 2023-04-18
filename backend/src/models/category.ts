import { Document, Schema, Model, model } from "mongoose";

export interface CategoryDocument extends Document {
  name: string;
  slug: string;
  parentId?: string;
  categoryImage?: string;
}

const categorySchema: Schema<CategoryDocument> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  categoryImage:{
    type:String,
  },
  parentId: {
    type: String,
    ref: "Category",
  },
});

const Category: Model<CategoryDocument> = model<CategoryDocument>(
  "Category",
  categorySchema
);

export default Category;
