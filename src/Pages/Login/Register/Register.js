import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import "./Register.css";
import auth from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";
import { sendEmailVerification } from "firebase/auth";
import Loading from "../../Shared/Loading/Loading";
import PageTitle from "../../Shared/PageTitle/PageTitle";
import useToken from "../../../hooks/useToken";

const Register = () => {
  const [agree, setAgree] = useState(false);
  const [token] = useToken();

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };
  if (loading || updating) {
    return <Loading />;
  }

  if (token) {
    navigate("/home");
  }

  const handleRegister = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    // const agree = event.target.terms.checked;

    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    alert("Updated profile");
    console.log("updated profile");
    navigate("/home");
  };

  return (
    <div className="register">
      <PageTitle title={"Register"} />
      <h2>Please Register</h2>
      <div className="register-form shadow border">
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            id=""
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            id=""
            placeholder="Enter Email"
            required
          />
          <input
            type="password"
            name="password"
            id=""
            placeholder="Enter Your Password"
            required
          />
          <input
            onClick={() => setAgree(!agree)}
            type="checkbox"
            name="terms"
            id="terms"
          />
          <label
            className={`ps-2 fs-.5 ${agree ? "" : "text-danger"}`}
            htmlFor="terms"
          >
            Accept Genius Car Terms and Conditions
          </label>
          <input
            disabled={!agree}
            className="btn btn-primary mt-2"
            type="submit"
            value="Register"
          />
        </form>
        <p>
          Already have an account ?{" "}
          <Link
            to="/login"
            className="text-danger pe-auto text-decoration-none"
            onClick={navigateLogin}
          >
            Please Login
          </Link>
        </p>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
