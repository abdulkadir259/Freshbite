'use client'

import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import { useRouter } from "next/navigation";

export default function Home() {
  const [location, setLocation] = useState([])
  const [selectLocation, setSelectLocation] = useState('')
  const[showLocation, setShowLocation] = useState(false)
const [restaurants, setRestaurants] = useState([])
const router = useRouter()
  useEffect(() => {
    loadLocations(); 
    loadRestaurants()
  }, [])
  
  const loadLocations=async()=>{
let response =  await fetch('http://localhost:3000/api/restaurant/customer/locations')
response = await response.json()
if(response.success){
  setLocation(response.result)
  console.log(response.result);
}
  }

  const loadRestaurants =  async(params)=>{
    let url = "http://localhost:3000/api/restaurant/customer"
    if(params?.location){
url = url + "?location="+params.location
    }else if(params?.restaurant){
      url = url + "?restaurant="+params.restaurant
    }
    console.log(url);
    
    let response = await fetch(url);
    response = await response.json()
    if(response.success){
setRestaurants(response.result)
console.log(response.result);

    }
  }

  return (
  <main >
    <CustomerHeader/>
    <div className="main-page-banner">
    <h1 style={{textTransform:'capitalize'}}>food delivery app</h1>
    <div className="input-wrapper2">
      <input type="text" className="select-input" placeholder="select place" value={selectLocation} onClick={()=>setShowLocation(true)}/>
      <ul className="location-list">
      {
        showLocation && location.map((item)=>{
          return(
            <>
            <li onClick={()=>{setSelectLocation(item); setShowLocation(false); loadRestaurants({location:item})}}>{item}</li>
            </>
          )
        })
      }
      </ul>
      <input type="text" className="search-input" placeholder="Enter food or restaurant name" onChange={(e)=>loadRestaurants({restaurant:e.target.value})}/>
    </div>
    </div>
    <div className="restaurant-list-container">
      {
        restaurants.map((item)=>{
          return(
            <>
            <div className="restaurant-wrapper" onClick={()=>router.push('explore/'+ item.name + "?id=" + item._id)}>
              <div className="heading-wrapper">
              <h3>{item.name}</h3>
              <h5>{item.contact}</h5>
              </div>
              <div className="address-wrapper">
                <div>{item.city},</div>
                <div className="address">{item.address}, Email:{item.email}</div>
              </div>
            </div>
            </>
          )
        })
      }
    </div>
    <RestaurantFooter/>
  </main>
  );
}
