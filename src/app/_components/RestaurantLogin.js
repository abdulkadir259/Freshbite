"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const RestaurantLogin = ()=>{

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState(false)
const router = useRouter()
    const handleLogin= async()=>{
        if(!email || !password){
            setError(true)
            return false
        }else{
            setError(false)
        }
let response = await fetch("http://localhost:3000/api/restaurant",{
    method:'POST',
    body:JSON.stringify({email, password, login:true})
})
response = await response.json();
if(response.success){
    const {result} = response
    delete result.password
    localStorage.setItem("RestaurantUser", JSON.stringify(result))
router.push("/restaurant/dashboard")
}else{
    alert("Login failed")
}

        console.log(email, password);   
    }
    return(<>
    <h3 style={{color:'red'}}>
        LOGIN 
        </h3>
        <div>
            
            <div className="input-wrapper">
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className="input-field" type="text" placeholder="Enter email id" />
            </div>
            {
                error && !email && <span className="input-error">Please enter valid email</span>
            }
            <div  className="input-wrapper">
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className="input-field" type="password" placeholder="Enter password" />
            </div>
            {
                error && !password && <span className="input-error">Please enter valid password</span>
            }
            <div  className="input-wrapper">
                <button className="button" onClick={handleLogin}>Login</button>
            </div>
        </div>

    </>)
}

export default RestaurantLogin