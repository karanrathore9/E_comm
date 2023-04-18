import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    categoryId: "",
    description: "",
    productPicture: "",
  });

  const [categories, setCategories] = useState([]);

  const [productDetails, setProductDetails] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = () => {
    console.log(params.id, "dhfdfhhfkj+++===");
    axios
      .get(`http://localhost:2000/api/products/get/${params.id}`)
      .then((res) => {
        console.log("THIS IS UPDATE PRODUCT RESPONSE", res.data.product);

        setProduct({
          ...product,
          name: res.data.product.name,
          price: res.data.product.price,
          categoryId: res.data.product.category,
          description: res.data.product.description,
          productPicture: res.data.product.productPicture,
        });
      })
      .catch((err) => {
        console.log("fbdsfdsfhdERROORRR");
        console.log(err);
      });
  };

  const updateProduct = async () => {
    console.log(
      "SEE This kjfdkgjdf 🧟🧟🧟🧟🧟🧟",
      product.name,
      product.price,
      product.categoryId,
      product.description,
      product.productPicture
    );
    axios
      .put(`http://localhost:2000/api/product/update/${params.id}`, product)
      .then((res) => {
        console.log("PRODUCTT UPDATED SUCCESSFULLY", res);
        navigate("/products");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:2000/api/category/getCategory")
      .then((res) => setCategories(res.data.categoryList))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderSelectOptions = (categories: any) => {
    return categories.map((category: any) => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ));
  };

  const handleProductImage = (e: any) => {
    setProduct({ ...product, productPicture: e.target.files[0] });
  };
  return (
    <>
      <Form onSubmit={updateProduct} className="mb-3">
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={product.name}
            placeholder="Product Name"
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            value={product.price}
            placeholder="Price"
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            value={product.description}
            placeholder="Description"
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Category:</Form.Label>
          <Form.Control
            as="select"
            value={product.categoryId}
            onChange={(e) =>
              setProduct({ ...product, categoryId: e.target.value })
            }
          >
            <option value={""}>Select Category</option>
            {renderSelectOptions(categories)}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Product Image:</Form.Label>
          <Form.Control
            type="file"
            name="ProductImage"
            onChange={handleProductImage}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </>
  );
};

export default Update;
