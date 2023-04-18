import express, { NextFunction, Request, Response } from "express";
import Product, { ProductDocument } from "../models/product";
import shortid from "shortid";
import slugify from "slugify";
import Category from "../models/category";
import escapeStringRegexp from "escape-string-regexp";
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

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("here it is")
  try {
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

// export const searchProduct = async (req: Request, res: Response) => {
//   const  keyword  = req.params.key;
//   try {
//     const products = await Product.find({
//       $or: [
//         { name: { $regex: keyword, $options: "i" } },
//       ],
//     })
//       .populate("category")
//       .lean()
//       .exec();
//     res.status(200).json({ products });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server Error");
//   }
// };



// export const getProduct = (req: Request, res: Response) => {
//  Product.find()
//    .populate("category")
//    .lean()
//    .exec()
//    .then((products) => {
//      res.status(200).json({ products });
//    })
//    .catch((error) => {
//      res.status(400).json({ error });
//    });
// };

// export const getProductDetailsById = (req: Request, res: Response) => {
//   const { productId } = req.params;
//   if (productId) {
//     Product.findOne({ _id: productId })
//       .exec()
//       .then((product) => {
//         if (product) {
//           res.status(200).json({ product });
//         } else {
//           res.status(404).json({ error: "Product not found" });
//         }
//       })
//       .catch((error) => {
//         res.status(400).json({ error });
//       });
//   } else {
//     return res.status(400).json({ error: "Params required" });
//   }
// };

// export const deleteProductById = (req: Request, res: Response) => {
//   const { productId } = req.body.payload;
//   if (productId) {
//     Product.deleteOne({ _id: productId })
//       .exec()
//       .then((result) => {
//         res.status(202).json({ result });
//       })
//       .catch((error) => {
//         res.status(400).json({ error });
//       });
//   } else {
//     res.status(400).json({ error: "Params required" });
//   }
// };

// export const searchProductByKey = (req: Request, res: Response) => {
//   const regex = new RegExp(escapeStringRegexp(req.params.key), "i");
//   Product.find({
//     $or: [
//       { name: { $regex: regex } },
//       { price: { $regex: regex } },
//       { category: { $regex: regex } },
//     ],
//   })
//     .then((products) => {
//       res.status(200).json({ products });
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };

// export const searchProductByKey = (req: Request, res: Response) => {
//   Product.find({
//     $or: [
//        { name:  { $regex: req.params.key, $options: "i" } },
//       //  { price: { $regex: req.params.key, $options: "i" } },
//       // { category: { $regex: req.params.key, $options: "i" } },
//     ],
//   })
//     .then((products) => {
//       res.status(200).json({ products });
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };

// import express, { NextFunction, Request, Response } from "express";
// import shortid from "shortid";
// import slugify from "slugify";
// import Product from "../models/product";

// export const createProduct = (req: Request, res: Response) => {
//   const user = res.locals.user;
//   // console.log("Hello Product", user._id);
//   // res.status(200).json({
//   //   file: req.files,
//   //   body: req.body,
//   // });

//   const { name, price, description, productPictures, category, createdBy} = req.body;
//   let productPictures =[];

//   if(req.files.length>0){
//     productPictures = req.files.map(file => {
//       return {img: file.filename }
//     })
//   }

//   const product = new Product({
//     name: name,
//     slug: slugify(name),
//     price,
//     description,
//     productPictures,
//     category,
//     createdBy: res.locals.user,
//   });

//   product.save().then((product) => {
//     return res.status(201).json({product});

//   }).catch((error) => {
//     return res.status(400).json({error});

//   })

// };
