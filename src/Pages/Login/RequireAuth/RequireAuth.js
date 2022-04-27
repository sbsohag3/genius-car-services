import React from "react";
import { useAuthState, useSendEmailVerification } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";


const RequireAuth = ({ children }) => {
  const [sendEmailVerification] =
    useSendEmailVerification(auth);
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if(user.providerData[0]?.providerId ==='password' && !user.emailVerified){
    return (
      <div className="text-center">
        <h3 className="text-danger">Your Email is not verified</h3>
        <h4 className="text-success">Please Verify your email address</h4>
        <button
        className="btn btn-primary"
          onClick={async () => {
            await sendEmailVerification();
            toast("Sent email");
          }}
        >
         Send Verification email Again
        </button>
   
      </div>
    );
  }
  return children;
};

export default RequireAuth;
