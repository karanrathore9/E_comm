import axios from "axios";

const BASE_URL = "http://localhost:2000/api/";

interface ProductItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  productPicture: string;
}
const token = localStorage.getItem("token");
const headers = { Authorization: `Bearer ${token}` };

export const getAllProducts = async (
  category?: string,
  search?: string
): Promise<ProductItem[]> => {
  let url = "http://localhost:2000/api/product/get";
  if (category && category !== "All") {
    url += `/${category}`;
  }
  try {
    const response = await axios.get<{ products: ProductItem[] }>(url);
    let filteredProducts = response.data.products;
    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filteredProducts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addToCart = async (
  userId: any,
  productId: string,
  price: number
) => {
  const requestBody = {
    cartItems: [
      {
        product: productId,
        quantity: 1,
        price: price,
      },
    ],
  };

  try {
    const response = await axios.post(
      `${BASE_URL}/user/cart/addtocart/${userId}`,
      requestBody
    );
    console.log("Product added to cart:", response);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error;
  }
};

export const addToWishlist = async (userId: any, productId: any) => {
  const requestBody = {
    productId: productId,
  };
  try {
    const response = await axios.post(
      `${BASE_URL}/user/addtowishlist/${userId}`,
      requestBody
    );
    console.log("Product added to wishlist:", response);
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    throw error;
  }
};

const API_URL = "http://localhost:2000/api/product";

export const getProductList = async (): Promise<ProductItem[]> => {
  try {
    const response = await axios.get<{ products: ProductItem[] }>(
      `${API_URL}/get`
    );
    return response.data.products;
  } catch (error) {
    throw new Error("Error fetching product list");
  }
};

export const deleteProductById = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/delete/${id}`, { headers });
  } catch (error) {
    throw new Error(`Error deleting product with id ${id}`);
  }
};

const URL = "http://localhost:2000/api/";

export const getProductDetails = async (id: any) => {
  try {
    const response = await axios.get(URL + `products/get/${id}`);
    return response.data.product;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateProduct = async (id: any, product: any) => {
  try {
    const response = await axios.put(
      API_URL + `product/update/${id}`,
      product,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL + "category/getCategory");
    return response.data.categoryList;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const ProductService = {
  createProduct: async (productData: any) => {
    const form = new FormData();
    form.append("name", productData.name);
    form.append("price", productData.price);
    form.append("description", productData.description);
    form.append("category", productData.categoryId);
    if (productData.productPicture) {
      form.append("productPicture", productData.productPicture);
    }

    try {
      const response = await axios.post(`${BASE_URL}/product/create`, form, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Error creating product.");
    }
  },

  getCategories: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/category/getCategory`);
      return response.data.categoryList;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting categories.");
    }
  },
};
