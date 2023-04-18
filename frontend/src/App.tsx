import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Home from "./containers/Home/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./containers/Signin/signin";
import Signup from "./containers/Signup/signup";
import category from "./containers/Category/category";
import products from "./containers/Products/product";
import PrivateComponent from "./components/privateComponent";
import update from "./containers/UpdateProduct/updateProduct";
import UserHeader from "./components/header";
import cart from "./containers/Cart/cart";
import wishList from "./containers/WishList/wishList";
import viewprofile from "./containers/Profile/profile";
import address from "./containers/Address/address";
import updatepassword from "./containers/UpdatePassword/updatedPassword";

function App() {
  const role = localStorage.getItem("role");

  return (
    <div>
      <BrowserRouter>
        <UserHeader />
        <Routes>
          <Route Component={PrivateComponent}>
            <Route path="/category" Component={category} />
            <Route path="/products" Component={products} />
            <Route path="/update/:id" Component={update} />
          </Route>

          <Route path="/" Component={Home} />
          <Route path="/cart" Component={cart} />
          <Route path="/wishlist" Component={wishList} />
          <Route path="/profile" Component={viewprofile} />
          <Route path="/updatepassword" Component={updatepassword} />
          <Route path="/address" Component={address} />

          <Route path="/signin" Component={Signin} />
          <Route path="/signup" Component={Signup} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
