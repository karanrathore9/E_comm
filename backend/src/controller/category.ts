import express, { NextFunction, Request, Response } from "express";
import Category, { CategoryDocument } from "../models/category";
import slugify from "slugify";

interface CategoryNode {
  _id: string;
  name: string;
  slug: string;
  parentId?: string;
  children?: CategoryNode[];
}

function createCategories(
  categories: CategoryDocument[],
  parentId: string | null = null
): CategoryNode[] {
  const categoryList: CategoryNode[] = [];

  let filteredCategories: CategoryDocument[];
  if (parentId === null) {
    filteredCategories = categories.filter((cat) => cat.parentId === undefined);
  } else {
    filteredCategories = categories.filter((cat) => cat.parentId === parentId);
  }

  for (const cate of filteredCategories) {
    categoryList.push({
      _id: cate._id.toString(),
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      children: createCategories(categories, cate._id.toString()),
    });
  }

  return categoryList;
}

export const addCategory = (req: Request, res: Response) => {
  // let categoryUrl;
  // if (req.file) {
  //   categoryUrl = "http://localhost:2000/public/" + req.file.filename;
  // }
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
    parentId: req.body.parentId,
    // categoryImage: categoryUrl,
  };

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const cat = new Category(categoryObj);
  cat.save().then(
    (category) => {
      return res.status(201).json({
        category,
      });
    },
    (err) => {
      return res.status(400).json({
        error: err.message,
      });
    }
  );
};

export const getCategories = (req: Request, res: Response) => {
  Category.find({})
    .lean()
    .exec()
    .then((categories) => {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// exports.updateCategories = async (req:Request, res:Response) => {
//   const { _id, name, parentId, type } = req.body;
//   const updatedCategories = [];
//   if (name instanceof Array) {
//     for (let i = 0; i < name.length; i++) {
//       const category = {
//         name: name[i],
//         type: type[i],
//       };
//       if (parentId[i] !== "") {
//         category.parentId = parentId[i];
//       }

//       const updatedCategory = await Category.findOneAndUpdate(
//         { _id: _id[i] },
//         category,
//         { new: true }
//       );
//       updatedCategories.push(updatedCategory);
//     }
//     return res.status(201).json({ updateCategories: updatedCategories });
//   } else {
//     const category = {
//       name,
//       type,
//     };
//     if (parentId !== "") {
//       category.parentId = parentId;
//     }
//     const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
//       new: true,
//     });
//     return res.status(201).json({ updatedCategory });
//   }
// };

// exports.deleteCategories = async (req: Request, res: Response) => {
//   const { ids } = req.body.payload;
//   const deletedCategories = [];
//   for (let i = 0; i < ids.length; i++) {
//     const deleteCategory = await Category.findOneAndDelete({
//       _id: ids[i]._id,
//       createdBy: req.user._id,
//     });
//     deletedCategories.push(deleteCategory);
//   }

//   if (deletedCategories.length == ids.length) {
//     res.status(201).json({ message: "Categories removed" });
//   } else {
//     res.status(400).json({ message: "Something went wrong" });
//   }
// };

//---------------Initial Code--------------

// import express, { NextFunction, Request, Response } from "express";
// import Category from "../models/category";
// import slugify from "slugify";

// // const createCategories(categories, parentId=null)=>{

// //     const categoryList = [];
// //     if(parentId == null){
// //         categories.filter(cat=>cat.parentId == undefined);

// //     }else{

// //     }

// // }
// function createCategories(categories, parentId =null){

//     const categoryList = [];
//     let category;
//     if(parentId == null){
//         categories.filter(cat => cat.parentId == undefined);

//     }else{
//         category = categories.filter(cat => cat.parentId == parentId);
//     }

//     for(let cate of category){
//         categoryList.push({
//             _id:category._id,
//             name:cate.name,
//             slug:cate.slug,
//             children:createCategories(categories.cate._id)
//         });

//     }
//     return categoryList;
// }

// export const addCategory = (req:Request,res:Response) => {

//     const categoryObj = {
//         name:req.body.name,
//         slug: slugify(req.body.name),
//         parentId:req.body.parentId
//     }
//     if(req.body.parentId){
//         categoryObj.parentId = req.body.parentId;
//     }
//     const cat = new Category(categoryObj);
//     cat.save()
//     .then((category) => {
//         return res.status(201).json({
//             category
//         })

//     }).catch((err) =>{
//         return res.status(400).json({
//             err
//         })
//     })
// }

// // export const getCategories = (req:Request,res:Response) => {
// //     Category.find({}).then((categories)=>{

// //         const categoryList = createCategories(categories);
// //         return res.status(200).json({ categoryList });

// //     }).catch((err)=>{
// //         return res.status(400).json({err})

// //     })
// // }

// export const getCategories = (req: Request, res: Response) => {
//   Category.find({})
//     .exec()
//     .then((categories) => {

//         const categoryList = createCategories(categories);
//       res.status(200).json({ categoryList });
//     })
//     .catch((error) => {
//       res.status(400).json({ error });
//     });
// };
