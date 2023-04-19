import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
setCartItems,
incrementCounter,
decrementCounter,
} from "../../features/Store/Slices/cartSlice";
import {
Table,
Card,
Button,
Container,
Row,
Col,
Form,
Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.css";
import { useDispatch } from "react-redux";

import { FaSearch, FaHeart } from "react-icons/fa";
import {
getAllProducts,
addToCart,
addToWishlist,
} from "../../services/Product";

interface Category {
name: string;
}

interface ProductItem {
_id: string;
name: string;
price: number;
description: string;
productPicture: string;
// category: Category;
}

const Home = (): JSX.Element => {
const [product, setProduct] = useState<ProductItem[]>([]);
const [selectedCategory, setSelectedCategory] = useState<string>("All");
const [searchTerm, setSearchTerm] = useState<string>("");
const userId: string | null = localStorage.getItem("userId");
const token: string | null = localStorage.getItem("token");

const dispatch = useDispatch();

useEffect(() => {
loadAllProducts();
}, []);

const loadAllProducts = async (): Promise<void> => {
const products= await getAllProducts();
setProduct(products);
};

const handleCategoryClick = async (category: string): Promise<void> => {
setSelectedCategory(category);
const products: ProductItem[] = await getAllProducts(category, searchTerm);
setProduct(products);
};

const handleSubmit = async (
e: React.FormEvent<HTMLFormElement>
): Promise<void> => {
e.preventDefault();
const products: ProductItem[] = await getAllProducts(
selectedCategory,
searchTerm
);
setProduct(products);
};

const getUniqueData = (
data: ProductItem[],
property: string
): string[] => {
let newVal: string[] = data.map((curElem: any) => {
return curElem[property].name;
});
newVal = ["All", ...new Set(newVal)];
console.log(newVal);
return newVal;
};

const categoryOnlyData: string[] = getUniqueData(product, "category");

const addtoCart = (id: string, price: number): void => {
dispatch(incrementCounter());
addToCart(userId, id, price);
};

const addToWishlis = (id: string): void => {
addToWishlist(userId, id);
};
return (
  <>
  <Row>
  <Col md={2}>
  <Form className="d-flex" onSubmit={handleSubmit}>
  <Form.Control
  type="search"
  placeholder="Search"
  className="me-2"
  aria-label="Search"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  />
  <Button type="submit">
  <FaSearch />
  </Button>
  </Form>
  <h5>Filter By Category</h5>
  <div>
  {categoryOnlyData.map((curElem: string, index: number) => {
  return (
  <button
  key={index}
  type="button"
  name="category"
  value={curElem}
  onClick={() => handleCategoryClick(curElem)}
  >
  {curElem}
  </button>
              );
            })}
          </div>
        </Col>
        <Col md={10}>
          <div className="product-grid">
            {/* <InfiniteScroll
              dataLength={product.length}
              style={{ display: "flex", flexWrap: "wrap" }}
              next={getAllProducts}
              hasMore={true}
              loader={<Spinner />}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            > */}
            {product.map((item: ProductItem, index) => (
              <div className="card" key={index}>
                <img
                  src={item.productPicture}
                  alt={item.name}
                  className="card-img-top"
                />

                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-price">{item.price}</p>
                  <Button
                    variant="primary"
                    onClick={() => addtoCart(item._id, item.price)}
                  >
                    Add to Cart
                  </Button>
                  <Button variant="link" onClick={() => addToWishlis(item._id)}>
                    <FaHeart size={20} />
                  </Button>
                </div>
              </div>
            ))}
            {/* </InfiniteScroll> */}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Home;



