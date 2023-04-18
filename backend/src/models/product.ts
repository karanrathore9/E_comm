import mongoose, { Document, Model } from "mongoose";

interface ProductAttributes {
  name: string;
  slug: string;
  price: number;
  description: string;
  // productPictures: {
  //   img: string;
  // }[];
  productPicture:string;

  category: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
}

interface ProductDocument extends Document, ProductAttributes {}

interface ProductModel extends Model<ProductDocument> {}

const productSchema = new mongoose.Schema<ProductDocument, ProductModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    // productPictures: [
    //   {
    //     img: {
    //       type: String,
    //     },
    //   },
    // ],
    productPicture: {
      type: String,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Product = mongoose.model<ProductDocument, ProductModel>(
  "Product",
  productSchema
);

export { ProductDocument, ProductAttributes, ProductModel };
export default Product;

