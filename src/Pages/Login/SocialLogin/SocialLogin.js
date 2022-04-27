import React from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsGithub } from "react-icons/bs";
import {
  useSignInWithFacebook,
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import useToken from "../../../hooks/useToken";

const SocialLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithFacebook, user2, loading2, error2] =
    useSignInWithFacebook(auth);
  const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [token]= useToken(user || user1 || user2)
  let from = location.state?.from?.pathname || "/";
  let errorElement;
  if (loading || loading1 || loading2) {
    return <Loading />;
  }
  if (error || error1 || error2) {
    errorElement = (
      <div>
        <p className="text-danger">
          Error: {error?.message}
          {error1?.message}
        </p>
      </div>
    );
  }

  if (token) {
    navigate(from, { replace: true });
  }
  return (
    <div>
      <div className="d-flex align-items-center">
        <div style={{ height: "1px" }} className="bg-secondary w-50"></div>
        <p className="mt-2 px-2">or</p>
        <div style={{ height: "1px" }} className="bg-secondary w-50"></div>
      </div>
      {errorElement}
      <div className="mb-2">
        <button
          onClick={() => signInWithGoogle()}
          className="btn btn-secondary w-100  mx-auto d-block "
        >
          <FcGoogle className="fs-4 me-2" />
          Google Sign In
        </button>
      </div>
      <div className="mb-2">
        <button
          onClick={() => signInWithFacebook()}
          className="btn btn-primary w-100 mx-auto d-block "
        >
          <BsFacebook className="fs-4 me-2" />
          Facebook Sign In
        </button>
      </div>
      <div className="mb-2">
        <button
          onClick={() => signInWithGithub()}
          className="btn btn-info w-100 mx-auto d-block "
        >
          <BsGithub className="fs-4 me-2" />
          Github Sign In
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
