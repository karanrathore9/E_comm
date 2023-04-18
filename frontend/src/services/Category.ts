import axios from "axios";

interface ICategory {
  _id: number;
  name: string;
  children: ICategory[];
}

const getCategory = async () => {
  try {
    const response = await axios.get(
      "http://localhost:2000/api/category/getCategory"
    );
    return response.data.categoryList;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const createCategory = async (category: {
  categoryName: string;
  parentCategoryId: string;
  categoryImage: any;
}) => {
  try {
    const form = new FormData();
    form.append("name", category.categoryName);
    form.append("parentId", category.parentCategoryId);
    form.append("categoryImage", category.categoryImage);

    const response = await axios.post(
      "http://localhost:2000/api/category/create",
      form
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getCategory, createCategory };
