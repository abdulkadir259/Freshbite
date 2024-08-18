"use client"

import { useState } from "react"
import RestaurantLogin from "../_components/RestaurantLogin"
import RestaurantSignUp from "../_components/RestaurantSignup"
import RestaurantHeader from "../_components/RestaurantHeader"
import './style.css'
import RestaurantFooter from "../_components/RestaurantFooter"

const Restaurant = () =>{
    const [login, setLogin] = useState(true)
    const {username,password} = process.env
    console.log(username);
    
    return(
        <>
        <div className="container">
            <RestaurantHeader/>
        <h1>
        Restaurant Page Login/ Signup page
        </h1>
        {
            login ? <RestaurantLogin/> :  <RestaurantSignUp/>
        }
        
       <div>

        <button className="button-link" onClick={()=>{setLogin(!login)}}>
            {
                login?"Do Not  Have Account? Sign up" : " Already Have Account? Login"
            }
            
            </button>
            </div>
        </div>
    <RestaurantFooter/>
        </>
    )
}

export default Restaurant