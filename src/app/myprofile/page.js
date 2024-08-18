"use client";

import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { useEffect } from "react";

const Page = () => {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    getOrderDetail();
  }, []);
  const getOrderDetail = async () => {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    let response = await fetch(
      "http://localhost:3000/api/restaurant/order?id=" + userStorage._id
    );
    response = await response.json();
    if (response.success) {
      setMyOrders(response.result);
    }
  };

  return (
    <>
      <div>
        <CustomerHeader />
        {myOrders.map((item) => {
          return (
            <>
              <div
                className="restaurant-wrapper"
                style={{ margin: "20px auto" }}
              >
                <h4>{item.data.name}</h4>
                <div>Amount : {item.amount}</div>
                <div>Address : {item.data.address}</div>
                <div>Status : {item.status}</div>
              </div>
            </>
          );
        })}
        <RestaurantFooter />
      </div>
    </>
  );
};

export default Page;
