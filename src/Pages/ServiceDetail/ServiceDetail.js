import { Link, useParams } from "react-router-dom";
import useServiceDetail from "../../hooks/useServiceDetail";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service] = useServiceDetail(serviceId);
  return (
    <div className="text-center mt-5">
      <h1 className="text-primary">You are about to book </h1>
      <img src={service.img} alt="" />
      <h2>{service.name}</h2>
      <h4 className="text-danger">Price: ${service.price}</h4>

      <div className="text-center">
        <Link to={`/checkout/${serviceId}`}>
          <button className="btn btn-primary">Proceed Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceDetail;
