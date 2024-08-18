"use client"

import CustomerHeader from "@/app/_components/CustomerHeader"
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import { useEffect, useState } from "react"

const Page = (props) => {
const [restaurantDetail, setRestaurantDetail] = useState();
const [foodItems, setFoodItems] = useState([])
const [cartData, setCartData] = useState();
const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cartFood')));
const [cartId, setCartId] = useState(cartStorage ? ()=>cartStorage?.map((item)=>{
   return item._id
}):[]);
const [removeCartData, setRemoveCartData] = useState()


    const name = props.params.name
    

    useEffect(() => {
    loadRestaurantDetails()
    console.log( props.searchParams.id);
}, [])
console.log(cartId);

   
    

    const loadRestaurantDetails= async()=>{
        const id = props.searchParams.id;
        let response = await fetch("http://localhost:3000/api/restaurant/customer/" + id)
        response =await response.json()
        if(response.success){
            console.log(response);
            
setRestaurantDetail(response.result)
setFoodItems(response.foodItems)
        }
    }

    const addToCart=(item)=>{
        setCartData(item)
        let localCartId = cartId;
        localCartId.push(item._id)
        setCartId(localCartId)
        setRemoveCartData()
    }

    const removeCart=(id)=>{
setRemoveCartData(id);
let localCartIds = cartId.filter(item=>item!=id);
setCartId(localCartIds)
setCartData()
    }

    return (
        <>
            <div>
                <CustomerHeader cartData={cartData} removeCartData={removeCartData}/>
                <div className="restaurant-page-banner">
                    <h1 style={{ textTransform: 'capitalize' }}>{decodeURI(name)}</h1>
                </div>
                <div className="detail-wrapper">
                    <h3>Contact: {restaurantDetail?.contact}</h3>
                    <h3>1City: {restaurantDetail?.city}</h3>
                    <h3>Address: {restaurantDetail?.address}</h3>
                    <h3>Email: {restaurantDetail?.email}</h3>
                </div>
                <div className="food-item-wrapper">
                    {
                      foodItems.length>0?  foodItems.map((item)=>{
                            return(
                                <>
                                <div className="list-item">
                                    <div><img src={item.img_path} style={{width:'100px'}}/></div>
                                    <div>
                                    <div>{item.name}</div>
                                    <div>{item.price}</div>
                                    <div className="description">{item.description}</div>
                                    {
                                    cartId?.includes(item._id) ? 
                                    <button onClick={()=>removeCart(item._id)}>Remove From Cart</button> : 
                                    <button onClick={()=>addToCart(item)}>Add To Cart</button>
                                    }
                                    </div>
                                </div>
                                </>
                            )
                        }) : <h1>No food item added</h1>
                    }
                </div>
                <RestaurantFooter/>
            </div>
        </>
    )
}

export default Page