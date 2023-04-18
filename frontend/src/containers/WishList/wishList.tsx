import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "./style.css";
import UserService from "../../services/WishList";

const WishList = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    UserService.getWishList(userId)
      .then((res) => {
        console.log(res.data.wishListItem);
        setWishlist(res.data.wishListItem);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToCart = (id: any, price: any) => {
    const requestBody = {
      cartItems: [
        {
          product: id,
          quantity: 1,
          price: price,
        },
      ],
    };

    UserService.addToCart(userId, requestBody)
      .then((res) => {
        console.log(res);
        removeFromWishList(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromWishList = (id: any) => {
    UserService.removeFromWishList(userId, id)
      .then((res) => {
        console.log(res, "PRODUCT REMOVED SUCCESSFULLY !!");
        UserService.getWishList(userId)
          .then((res) => {
            setWishlist(res.data.wishListItem);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsEmpty(wishlist.length === 0);
  }, [wishlist]);
  return (
    <>
      <div className="cartContainer">
        {isEmpty ? (
          <div className="emptyCartMessage">
            There is Nothing in your WishList !!
          </div>
        ) : (
          <Card className="cartTable">
            <div className="cartTableRow cartTableHeader">
              <div className="cartTableCell">Name</div>
              <div className="cartTableCell">Description</div>
              <div className="cartTableCell">Price</div>
              <div className="cartTableCell">Image</div>
            </div>
            {wishlist.map((item: any) => (
              <div key={item._id} className="cartTableRow">
                <div className="cartTableCell">{item.name}</div>
                <div className="cartTableCell">{item.description}</div>
                <div className="cartTableCell">{item.price}</div>

                <div className="cartTableCell">
                  <img style={{ width: 100 }} src={item.productPicture} />
                </div>
                <div>
                  <Button
                    variant="primary"
                    onClick={() => addToCart(item._id, item.price)}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => removeFromWishList(item._id)}
                  >
                    Remove from WishList
                  </Button>
                </div>
              </div>
            ))}
          </Card>
        )}
      </div>
    </>
  );
};

export default WishList;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Button, Card } from "react-bootstrap";
// import "../CartPage/style.css";

// const WishList = () => {
//   const [wishlist, setWishlist] = useState([]);
//   const [isEmpty, setIsEmpty] = useState(false);

//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     getWishList();
//   }, []);

//   useEffect(() => {
//     if (wishlist.length === 0) {
//       setIsEmpty(true);
//     } else {
//       setIsEmpty(false);
//     }
//   }, [wishlist]);

//   const getWishList = () => {
//     axios
//       .get(`http://localhost:2000/api/user/getwishList/${userId}`)
//       .then((res) => {
//         console.log(res.data.wishListItem);
//         setWishlist(res.data.wishListItem);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const addToCart = (id: any, price: any) => {
//     const requestBody = {
//       cartItems: [
//         {
//           product: id,
//           quantity: 1,
//           price: price,
//         },
//       ],
//     };

//     axios
//       .post(
//         `http://localhost:2000/api/user/cart/addtocart/${userId}`,
//         requestBody
//       )
//       .then((res) => {
//         console.log(res);
//         removeFromWishList(id);
//         getWishList();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const removeFromWishList = (id: any) => {
//     const requestBody = {
//       productId: id,
//     };
//     axios
//       .post(
//         `http://localhost:2000/api/user/addtowishlist/${userId}`,
//         requestBody
//       )
//       .then((res) => {
//         console.log(res, "PRODUCT REMOVED SUCCESSFULLY !!");
//         getWishList();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
