import React, { useState } from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { userLogout } from "../features/Store/Slices/userSlice";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CartState } from "../features/Store/Slices/cartSlice";



const Header = () => {
  const auth = localStorage.getItem("user");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const cartQuantity = useSelector((state: CartState) => {
      console.log(state.counter,"HSjhsgdhsdf!+++===")
      return state.cart.counter;
    });

  const logout = () => {
    localStorage.clear();
    dispatch(userLogout());
    navigate("/signin");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to={"/"} className="navbar-brand">
          {role === "admin" ? "Admin Dashboard" : "E-Commerce"}
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            {!auth ? (
              <li>
                <NavLink to={"/signin"} className="nav-link">
                  Signin
                </NavLink>
              </li>
            ) : role === "admin" ? (
              <>
                <li className="nav-items">
                  <NavLink to={"/products"} className="nav-link">
                    Product
                  </NavLink>
                </li>
                <li className="nav-items">
                  <NavLink to={"/category"} className="nav-link">
                    Category
                  </NavLink>
                </li>
                <li className="nav-items">
                  <NavLink onClick={logout} to={"/signin"} className="nav-link">
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-items">
                  <NavLink to={"/wishlist"} className="nav-link">
                    WishList{" "}
                    <span role="img" aria-label="heart">
                      ❤️
                    </span>
                  </NavLink>
                </li>
                <li className="nav-items">
                  <NavDropdown title="Profile" id="nav-dropdown">
                    <NavDropdown.Item href="/profile">
                      View Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

                    <NavDropdown.Item href="/address">
                      Manage Address
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/updatepassword">
                      Update Password
                    </NavDropdown.Item>
                  </NavDropdown>
                </li>
                <li className="nav-items">
                  <NavLink to={"/cart"} className="nav-link">
                    <FaShoppingCart />
                    Cart
                    <Badge>{cartQuantity}</Badge>
                  </NavLink>
                </li>
                <li className="nav-items">
                  <NavLink onClick={logout} to={"/signin"} className="nav-link">
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
