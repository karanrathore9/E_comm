import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Modal, Button } from "react-bootstrap";
import Input from "../../components/UI/input";

import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import Product from "../UserProductListing/productListing";
import { ProductService } from "../../services/Product"; // Import the ProductService

interface ProductData {
  name: string;
  price: string;
  description: string;
  categoryId: string;
  productPicture: File | null;
}

interface Category {
  _id: string;
  name: string;
}

const Products =  () => {
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    productPicture: null,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [productDetailModal, setProductDetailModal] = useState<boolean>(false);
  const [productDetails, setProductDetails] = useState<any>(null);

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    ProductService.getCategories() // Call the getCategories function from the ProductService
      .then((categoryList) => setCategories(categoryList))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitProductForm = () => {
    ProductService.createProduct(productData) // Call the createProduct function from the ProductService
      .then((data) => {
        console.log("THIS IS YOUR ", data);
        setShow(false);
      })
      .catch((err) => {
        console.log(err);
      });

    setShow(false);
  };

  const handleShow = () => setShow(true);

  const renderSelectOptions = (categories: Category[]) => {
    return categories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ));
  };

  const handleProductImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductData({
        ...productData,
        productPicture: e.target.files[0],
      });
    }
  };

  return (
    <>
      <h3>Products</h3>
      <Container>
        <Button variant="primary" onClick={handleShow}>
          Add Product
        </Button>

        <Row>
          <Col>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Product />
            </div>
          </Col>
        </Row>
        <Row></Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            label="Name"
            value={productData.name}
            placeholder={`Product Name`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProductData({ ...productData, name: e.target.value })
            }
          />
          <Input
            label="Price"
            value={productData.price}
            placeholder={`Price`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProductData({ ...productData, price: e.target.value })
            }
          />
          <Input
            label="Description"
            value={productData.description}
            placeholder={`Description`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setProductData({ ...productData, description: e.target.value })
            }
          />
          <select
            className="form-control"
            value={productData.categoryId}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setProductData({ ...productData, categoryId: e.target.value })
            }
          >
            <option value={""}>Select Category</option>
            {renderSelectOptions(categories)}
          </select>
          <input
            type="file"
            name="ProductImage"
            onChange={handleProductImage}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitProductForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Products;

