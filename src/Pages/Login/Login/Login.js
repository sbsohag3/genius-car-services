import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import SocialLogin from "../SocialLogin/SocialLogin";
import "./Login.css";

import "react-toastify/dist/ReactToastify.css";
import PageTitle from "../../Shared/PageTitle/PageTitle";
import { toast } from "react-toastify";
import useToken from "../../../hooks/useToken";

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  let errorElement;

  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
    const [token]= useToken(user)
  if (error) {
    errorElement = <p className="text-danger">Error: {error?.message}</p>;
  }
  if (loading || sending) {
    return <Loading />;
  }
  if (token) {
    navigate(from, { replace: true });

  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await signInWithEmailAndPassword(email, password);
  };
  const navigateRegister = (event) => {
    navigate("/register");
  };
  const resetPassword = async () => {
    const email = emailRef.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Sent email");
    }
    else{
      toast('Please Enter Your Email')
    }
  };

  return (
    <div className="container  mx-auto mb-3">
      <PageTitle title={"Login"}/>
      <div className="login-form">
        <h2 className="text-primary text-center mt-3">Please Login</h2>
        <div className="border p-5 rounded shadow">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                ref={emailRef}
                type="email"
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={passwordRef}
                type="password"
                placeholder="Password"
                required
              />
            </Form.Group>

            <Button variant="primary w-100 mb-4" type="submit">
              Log In
            </Button>
          </Form>
          {errorElement}
          <p className="form-text">
            New to Genius Car?{" "}
            <Link
              to="/register"
              className="text-danger text-decoration-none "
              onClick={navigateRegister}
            >
              Please Register
            </Link>
          </p>
          <p className="form-text">
            Forget Password?{" "}
            <button
              className="btn btn-link text-primary text-decoration-none "
              onClick={resetPassword}
            >
              Reset Password
            </button>
          </p>
          <SocialLogin />
          
        </div>
      </div>
    </div>
  );
};

export default Login;
