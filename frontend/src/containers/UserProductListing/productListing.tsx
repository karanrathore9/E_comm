import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { getProductList, deleteProductById } from "../../services/Product";
import { Link } from "react-router-dom";

interface ProductItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  productPicture: string;
}

const Product = (): JSX.Element => {
  const [product, setProduct] = useState<ProductItem[]>([]);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const productList = await getProductList();
        setProduct(productList);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductList();
  }, []);

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProductById(id);
      const productList = await getProductList();
      setProduct(productList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "block" }}>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {product.map((item: ProductItem) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <img style={{ width: 100 }} src={item.productPicture} />
              </td>
              <td>
                <button onClick={() => handleDeleteProduct(item._id)}>
                  Delete
                </button>{" "}
                <button>
                  {" "}
                  <Link to={"/update/" + item._id}>Update</Link>{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Product;

