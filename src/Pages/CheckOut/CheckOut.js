import React from "react";
import { useParams } from "react-router-dom";
import useServiceDetail from "../../hooks/useServiceDetail";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import axios from "axios";
import { toast} from "react-toastify";

const CheckOut = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetail(serviceId);
  const [user] = useAuthState(auth);
  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const order = {
      service: service.name,
      email: user.email,
      serviceId: serviceId,
      address: event.target.address.value,
      phone: event.target.phone.value,
    };
    axios.post("https://stormy-shore-62736.herokuapp.com/order", order).then((response) => {
      const { data } = response;
      if (data.insertedId) {
        toast("Your order is booked!!!");
        event.target.reset();
      }
    });
  };
  return (
    <div className="w-25 mx-auto text-center">
      <h2>
        Please Order: <br />
        <span className="text-primary">{service.name}</span>
      </h2>
      <form onSubmit={handlePlaceOrder}>
        <input
          className="w-100 mb-2"
          type="text"
          value={user?.displayName}
          name="name"
          id=""
          placeholder="Name"
          required
          readOnly
          disabled
        />
        <br />
        <input
          className="w-100 mb-2"
          type="email"
          value={user?.email}
          name=""
          id="email"
          placeholder="Email"
          required
          readOnly
          disabled
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          value={service.name}
          name="service"
          id=""
          placeholder="Service"
          required
          readOnly
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="address"
          id=""
          placeholder="Address"
          autoComplete="off"
          required
        />
        <br />
        <input
          className="w-100 mb-2"
          type="text"
          name="phone"
          id=""
          placeholder="Phone Number"
          required
        />
        <br />
        <input
          className="bt btn-primary w-100"
          type="submit"
          value="Please Submit"
        />
      </form>
    </div>
  );

};

export default CheckOut;
