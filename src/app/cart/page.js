"use client";

import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { deliveryCharges, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cartFood"))
  );
  const [total] = useState(() =>
    cartStorage.length == 1
      ? cartStorage[0].price
      : cartStorage.reduce((a, b) => {
          return a.price + b.price;
        })
  );

  const OrderNow = () => {
    if (JSON.parse(localStorage.getItem("user"))) {
      router.push("/order");
    } else {
      router.push("/user-auth?order=true");
    }
  };

  return (
    <>
      <CustomerHeader />
      <div className="food-item-wrapper">
        {cartStorage.length > 0 ? (
          cartStorage.map((item) => {
            return (
              <>
                <div className="list-item">
                  <div className="list-item-block-1">
                    <img src={item.img_path} style={{ width: "100px" }} />
                  </div>
                  <div className="list-item-block-2">
                    <div>{item.name}</div>

                    <div className="description">{item.description}</div>
                    <button onClick={() => removeCart(item._id)}>
                      Remove From Cart
                    </button>
                  </div>
                  <div className="list-item-block-3">Price: {item.price}</div>
                </div>
              </>
            );
          })
        ) : (
          <h1>No food item added</h1>
        )}
      </div>
      <div className="total-wrapper">
        <div className="block-1">
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
        </div>
        <div className="block-2">
          <button onClick={OrderNow}>Order Now</button>
        </div>
      </div>
      <RestaurantFooter />
    </>
  );
};

export default Page;
