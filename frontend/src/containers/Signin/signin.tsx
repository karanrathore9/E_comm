import React, { useState } from "react";
import { Container, Form, Row, Col, Button, NavLink } from "react-bootstrap";
import Input from "../../components/UI/input";
import { useDispatch } from "react-redux";
import { saveLoginInfo } from "../../features/Store/Slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/Signin";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  fullName: string;
  contactNumber?: string;
  profilePicture?: string;
  token?: string;
}

const Signin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(email, password)
      .then((response) => {
        const userData = response.data.user;

        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("token", response.data.token);

        dispatch(saveLoginInfo(userData));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container>
        <Row style={{ marginTop: 50 }}>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={loginHandler}>
              <Input
                label="Email"
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />

              <Input
                label="Password"
                placeholder="Password"
                value={password}
                type="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            Don't have Account ? <Link to={"/signup"}> Signup</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signin;


// import React, { useState } from "react";
// import { Container, Form, Row, Col, Button, NavLink } from "react-bootstrap";
// import Input from "../../components/UI/input";
// import { useDispatch } from "react-redux";
// import { saveLoginInfo } from "../../features/Store/Slices/userSlice";
// import { Link, useNavigate } from "react-router-dom";
// import { login } from "../../services/Signin";
// import { useForm } from "react-hook-form";

// interface User {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
//   fullName: string;
//   contactNumber?: string;
//   profilePicture?: string;
//   token?: string;
// }

// type FormData = {
//   email: string;
//   password: string;
// };

// const Signin = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>();

//   const onSubmit = (data: FormData) => {
//     login(data.email, data.password)
//       .then((response) => {
//         const userData = response.data.user;

//         localStorage.setItem("role", response.data.user.role);
//         localStorage.setItem("userId", response.data.user._id);
//         localStorage.setItem("user", JSON.stringify(response));
//         localStorage.setItem("token", response.data.token);

//         dispatch(saveLoginInfo(userData));
//         navigate("/");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <>
//       <Container>
//         <Row style={{ marginTop: 50 }}>
//           <Col md={{ span: 6, offset: 3 }}>
//             <Form onSubmit={handleSubmit(onSubmit)}>
//               <Input
//                 label="Email"
//                 placeholder="Email"
//                 type="email"
//                 {...register("email", { required: true })}
//               />
//               {errors.email && <span>This field is required</span>}

//               <Input
//                 label="Password"
//                 placeholder="Password"
//                 type="password"
//                 {...register("password", { required: true })}
//               />
//               {errors.password && <span>This field is required</span>}

//               <Button variant="primary" type="submit">
//                 Submit
//               </Button>
//             </Form>
//             Don't have Account ? <Link to={"/signup"}> Signup</Link>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Signin;
