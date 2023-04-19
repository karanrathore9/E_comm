import express, { NextFunction, Request, Response } from "express";
import Product, { ProductDocument } from "../models/product";
import shortid from "shortid";
import slugify from "slugify";
import Category from "../models/category";
import escapeStringRegexp from "escape-string-regexp";
import Joi from "joi";
interface CreateProductRequestBody {
  name: string;
  price: number;
  description: string;
  productPicture: string;
  category: string;
  createdBy: string;
}

// interface ProductPicture {
//   img: string;
// }

// const createProductSchema = Joi.object({
//   name: Joi.string().min(3).required(),
//   price: Joi.number().min(1).required(),
//   description: Joi.string().min(10).required(),
//   productPicture: Joi.string().uri(),
//   category: Joi.string().required(),
//   createdBy: Joi.string().required(),
// });

// const updateProductSchema = Joi.object({
//   name: Joi.string().optional(),
//   price: Joi.number().optional(),
//   description: Joi.string().optional(),
//   productPicture: Joi.string().uri().optional(),
//   category: Joi.string().optional(),
// });


export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("here it is")
  try {
    // const { error, value } = createProductSchema.validate(req.body);
    // if (error) {
    //   throw new Error(error.message);
    // }
    const { name, price, description, category } = req.body;

    // let productPictures: ProductPicture[] = [];

    // if(req.files?.length){
    //     productPictures = req.files.map(file => {
    //       return {img: file.filename }
    //     })
    //   }

    let productUrl;
    if (req.file) {
      productUrl = "http://localhost:2000/" + req.file.filename;
    }

    const product = new Product({
      name,
      slug: slugify(name),
      price,
      description,
      productPicture: productUrl,
      category,
      // createdBy: res.locals.user._id,
    });

    const savedProduct = await product.save();
    return res.status(201).json({ product: savedProduct });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { category } = req.params;
  try {
    let products;
    if (category) {
      const categoryId = await Category.findOne({ name: category }).select(
        "_id"
      );
      if (!categoryId) {
        return res.status(400).json({ msg: "Invalid category name" });
      }
      products = await Product.find({ category: categoryId })
        .populate("category")
        .lean()
        .exec();
      res.status(200).json({ products });
    } else {
      products = await Product.find().populate("category").lean().exec();
      res.status(200).json({ products });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

export const deleteProductById = (req: Request, res: Response) => {
  Product.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(202).json({ result });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

export const getProductDetailsById = (req: Request, res: Response) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => {
      if (product) {
        res.status(200).json({ product });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

export const getProductsByCategory = (req: Request, res: Response) => {
  const { category } = req.params;
  let query = {};

  if (category) {
    query = { category: category };
  }

  Product.find(query)
    .populate("category")
    .lean()
    .exec()
    .then((products) => {
      res.status(200).json({ products });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

export const updateProductById = (req: Request, res: Response) => {

  // try {
    // const { error, value } = updateProductSchema.validate(req.body);
    // if (error) {
    //   throw new Error(error.message);
    // }

  let productUrl;
  if (req.file) {
    productUrl = "http://localhost:2000/" + req.file.filename;
  }
  Product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name:req.body.name,
        // slug: slugify(name),
        price:req.body.price,
        description:req.body.description,
        productPicture: productUrl,
        category:req.body.category
      },
    }
  )
    .then((product) => {
      if (product) {
        res.status(200).json({ product });
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
  // } 
  // catch (error) {
  //   res.status(400).json({ error });
   
  // }
};


export const searchProduct = async (req: Request, res: Response) => {
  const keyword = req.params.key;
  // console.log(keyword,"jkfhkfhsdkhfiu++++===");
  try {
    let query = {};
    if (keyword) {
      query = {
        $or: [{ name: { $regex: keyword, $options: "i" } }],
      };
    }
    const products = await Product.find(query)
      .populate("category")
      .lean()
      .exec();
    res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
