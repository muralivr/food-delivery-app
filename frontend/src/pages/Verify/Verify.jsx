import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function Verify() {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const navigate = useNavigate();

  async function verifyPayment() {
    await axios
      .post("http://localhost:4000/api/order/verify", { success, orderId })
      .then((res) => {
        if (res.data.success) {
          navigate("/myorders");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
}

export default Verify;
