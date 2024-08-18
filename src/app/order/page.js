"use client";

import { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { deliveryCharges, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [removeCartData, setRemoveCartData] = useState(false);
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cartFood"))
  );
  const [userStorage, setUserStorage] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [total] = useState(() =>
    cartStorage?.length == 1
      ? cartStorage[0].price
      : cartStorage?.reduce((a, b) => {
          return a.price + b.price;
        })
  );
  console.log(total);

  useEffect(() => {
    if (!total) {
      router.push("/");
    }
  }, [total]);

  const orderNow = async () => {
    let user_Id = JSON.parse(localStorage.getItem("user"))._id;
    let city = JSON.parse(localStorage.getItem("user")).city;
    let cart = JSON.parse(localStorage.getItem("cartFood"));
    let resto_id = cart[0].resto_id;
    let foodItemIds = cart.map((item) => item._id).toString();
    let deliveryBoyResponse = await fetch(
      "http://localhost:3000/api/restaurant/deliveryPartner/" + city
    );
    deliveryBoyResponse = await deliveryBoyResponse.json();
    // console.log(deliveryBoyResponse);
    let deliverBoyIds = deliveryBoyResponse.result.map((item) => item._id);
    // console.log(deliverBoyIds);
    let deliveryBoy_id =
      deliverBoyIds[Math.floor(Math.random() * deliverBoyIds.length)];
    if (!deliveryBoy_id) {
      alert("Delivery Partner not available");
    }
    let collection = {
      user_Id,
      resto_id,
      foodItemIds,
      deliveryBoy_id,
      status: "confirm",
      amount: total + deliveryCharges + (total * TAX) / 100,
    };
    console.log(collection);
    let response = await fetch("http://localhost:3000/api/restaurant/order", {
      method: "POST",
      body: JSON.stringify(collection),
    });

    console.log(response);
    response = await response.json();
    if (response.success) {
      alert("Order Placed");
      setRemoveCartData(true);
      router.push("/myprofile");
    } else {
      alert("failed");
    }
  };

  return (
    <>
      <CustomerHeader removeCartData={removeCartData} />

      <div className="total-wrapper">
        <div className="block-1">
          <h2>User Details</h2>
          <div className="row">
            <span>Name : </span>
            <span>{userStorage.name}</span>
          </div>
          <div className="row">
            <span>Address : </span>
            <span>{userStorage.address}</span>
          </div>
          <div className="row">
            <span>Mobile no : </span>
            <span>{userStorage.mobile}</span>
          </div>
          <h2>Amount Details</h2>
          <div className="row">
            <span>Food Charges: </span>
            <span>{total}</span>
          </div>
          <div className="row">
            <span>Tax: </span>
            <span>{(total * TAX) / 100}</span>
          </div>
          <div className="row">
            <span>Delivery charges: </span>
            <span>{deliveryCharges}</span>
          </div>
          <div className="row">
            <span>Total Amount: </span>
            <span>{total + deliveryCharges + (total * TAX) / 100}</span>
          </div>
          <h2>Payment Methods</h2>
          <div className="row">
            <span>Cash On Delivery: </span>
            <span>{total + deliveryCharges + (total * TAX) / 100}</span>
          </div>
        </div>
        <div className="block-2">
          <button onClick={orderNow}>Place Your Order Now</button>
        </div>
      </div>
      <RestaurantFooter />
    </>
  );
};

export default Page;
