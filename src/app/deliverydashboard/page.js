"use client";

import { useRouter } from "next/navigation";
import DeliveryHeader from "../_components/DeliveryHeader";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    getOrderDetail();
  }, []);
  const getOrderDetail = async () => {
    const userStorage = JSON.parse(localStorage.getItem("delivery"));
    let response = await fetch(
      "http://localhost:3000/api/restaurant/deliveryPartner/orders/" +
        userStorage._id
    );
    response = await response.json();
    if (response.success) {
      setMyOrders(response.result);
    }
  };

  useEffect(() => {
    const delivery = JSON.parse(localStorage.getItem("delivery"));
    if (delivery) {
      router.push("/deliverydashboard");
    }
  }, []);
  return (
    <>
      <div>
        <DeliveryHeader />
        <h1>My Order List</h1>
        {myOrders.map((item) => {
          return (
            <>
              <div
                className="restaurant-wrapper"
                style={{ margin: "20px auto" }}
              >
                <h4>Name: {item.data.name}</h4>
                <div>Amount : {item.amount}</div>
                <div>Address : {item.data.address}</div>
                <div>Status : {item.status}</div>
                {/* <div>
                  Update Status :
                  <select>
                    <option>Confirm</option>
                    <option>On the way</option>
                    <option>Delivered</option>
                    <option>Failed to deliver</option>
                  </select>
                </div> */}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Page;
