import React, { useState, useEffect } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/UI/input";
import "./style.css";
import { getCategory, createCategory } from "../../services/Category";

interface ICategory {
  _id: number;
  name: string;
  children: ICategory[];
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [parentCategoryId, setParentCategoryId] = useState<string>("");
  const [categoryImage, setCategoryImage] = useState<File>();
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryList: ICategory[] = await getCategory();
      setCategories(categoryList);
    };
    fetchCategories();
  }, []);

  const handleClose = async () => {
    const category = {
      categoryName,
      parentCategoryId,
      categoryImage,
    };
    console.log("This is done Now!!!", category);

    const response = await createCategory(category);

    if (response) {
      setShow(false);
    }
  };

  const handleShow = () => setShow(true);

  console.log(categories);

  const renderCategories = (categories: ICategory[]) => {
    return (
      <ul>
        {categories.map((category: ICategory) => (
          <li key={category._id}>
            {category.name}
            {category.children.length > 0 &&
              renderCategories(category.children)}
          </li>
        ))}
      </ul>
    );
  };

  const renderSelectOptions = (categories: ICategory[]) => {
    return categories.map((category: ICategory) => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ));
  };

  const handleCategoryImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCategoryImage(e.target.files[0]);
    }
  };

  return (
    <>
      <h1>All Categories</h1>
      <Container>
        <Button variant="primary" onClick={handleShow}>
          Add Category
        </Button>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <div className="categories-list">
                  {renderCategories(categories)}
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Input
              value={categoryName}
              placeholder={"Category Name"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCategoryName(e.target.value)
              }
            />
            <select
              className="form-control"
              value={parentCategoryId}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setParentCategoryId(e.target.value)
              }
            >
              <option value={""}>Select Category</option>
              {renderSelectOptions(categories)}
            </select>
            <input
              type="file"
              name="CategoryImage"
              onChange={handleCategoryImage}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Category;


