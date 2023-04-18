import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Input from "../../components/UI/input";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { signup } from "../../services/Signup";

interface IFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.password
    );

    signup(formData)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response));
        navigate("/signin");
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
            <Form onSubmit={submitHandler}>
              <Row>
                <Col md={6}>
                  <Input
                    id="firstName"
                    label="First Name"
                    placeholder="First Name"
                    value={formData.firstName}
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  ></Input>
                </Col>
                <Col md={6}>
                  <Input
                    id="lastName"
                    label="Last Name"
                    placeholder="First Name"
                    value={formData.lastName}
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  ></Input>
                </Col>
              </Row>
              <Input
                id="email"
                label="Email"
                placeholder="Email"
                value={formData.email}
                type="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              ></Input>

              <Input
                id="password"
                label="Password"
                placeholder="Password"
                value={formData.password}
                type="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              ></Input>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            Already have Account ? <NavLink to={"/signin"}> Signin</NavLink>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;

// import React, { useEffect } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import Input from "../../components/UI/input";
// import { useDispatch } from "react-redux";
// import { useState } from "react";
// import { useNavigate, Link, NavLink } from "react-router-dom";
// import { signup } from "../../services/Signup";
// import { useForm } from "react-hook-form";

// interface IFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

// const Signup = () => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<IFormData>();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const auth = localStorage.getItem("user");
//     if (auth) {
//       navigate("/");
//     }
//   }, [navigate]);

//   const onSubmit = (data: IFormData) => {
//     console.log(data);
//     signup(data)
//       .then((response) => {
//         localStorage.setItem("user", JSON.stringify(response));
//         navigate("/signin");
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
//               <Row>
//                 <Col md={6}>
//                   <Input
//                     id="firstName"
//                     // name="firstName"
//                     label="First Name"
//                     placeholder="First Name"
//                     type="text"
//                     // onchange={(e) => setValue(e.target.value)}
//                     {...register("firstName", { required: true })}
//                   ></Input>
//                   {errors.firstName && (
//                     <span className="text-danger">First name is required</span>
//                   )}
//                 </Col>
//                 <Col md={6}>
//                   <Input
//                     id="lastName"
//                     label="Last Name"
//                     placeholder="Last Name"
//                     type="text"
//                     {...register("lastName", { required: true })}
//                   ></Input>
//                   {errors.lastName && (
//                     <span className="text-danger">Last name is required</span>
//                   )}
//                 </Col>
//               </Row>
//               <Input
//                 id="email"
//                 label="Email"
//                 placeholder="Email"
//                 type="email"
//                 {...register("email", {
//                   required: true,
//                   pattern: /^\S+@\S+$/i,
//                 })}
//               ></Input>
//               {errors.email && (
//                 <span className="text-danger">
//                   Please enter a valid email address
//                 </span>
//               )}

//               <Input
//                 id="password"
//                 label="Password"
//                 placeholder="Password"
//                 type="password"
//                 {...register("password", { required: true, minLength: 8 })}
//               ></Input>
//               {errors.password && (
//                 <span className="text-danger">
//                   Password must be at least 8 characters long
//                 </span>
//               )}

//               <Button variant="primary" type="submit">
//                 Submit
//               </Button>
//             </Form>
//             Already have an account? <NavLink to={"/signin"}>Sign in</NavLink>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Signup;
