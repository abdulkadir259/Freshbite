"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const FoodItemList =()=>{
     const [foodItems, setFoodItems] = useState()

    useEffect(() => {
        loadFoodItems()
    }, [])

const router = useRouter();
    
const loadFoodItems = async()=>{
    const restaurantData = JSON.parse(localStorage.getItem("RestaurantUser"))
    
let response = await fetch(`http://localhost:3000/api/restaurant/foods/${restaurantData._id}`);
response = await response.json();
if(response.success){
    setFoodItems(response.result)
}else{
    alert("food list not available")
}
}

const deleteFoodItem= async(id)=>{
let response =  await fetch(`http://localhost:3000/api/restaurant/foods/${id}`,{
    method:'delete'
})
response = await response.json();
if(response.success){
    loadFoodItems()
}else{
    alert("food item not deleted")
}
}

    return(<>
    <div className="container">
        <h1>Food items</h1>
        <table style={{margin:'auto'}}>
            <thead>
                <tr>
                    <td>S.N</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Description</td>
                    <td>Image</td>
                    <td>Operations</td>
                </tr>
            </thead>
            <tbody>
                {
                    foodItems?.map((item, key)=>{
                        return(
                            <>
                             <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td><img src={item.img_path}/></td>
                    <td><button onClick={()=>deleteFoodItem(item._id)}>Delete</button><button onClick={()=>router.push('dashboard/'+ item._id)}>Update</button></td>
                </tr>
                            </>
                        )
                    })
                }
           
            </tbody>
        </table>
    </div>
    </>)
}

export default FoodItemList