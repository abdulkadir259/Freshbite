"use client"

import RestaurantHeader from "@/app/_components/RestaurantHeader"
import './../style.css'
import AddFootItems from "@/app/_components/AddFoodItem"
import { useState } from "react"
import FoodItemList from "@/app/_components/foodItemList"
const Dashboard =()=>{
    const [addItem, setAddItem] = useState(false)
    return(
        <>
        <div className="backgroundImages">
        <RestaurantHeader/>
        <button onClick={()=>setAddItem(true)}>Add Food </button>
        <button onClick={()=>setAddItem(false)}>Dashboard</button>
        {
            addItem ? <AddFootItems setAddItem={setAddItem}/>:<FoodItemList/>
        }
        
            
            </div>
            </>
    )
}

export default Dashboard