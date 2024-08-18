"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const RestaurantSignUp = () =>{
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')
    const [name, setname] = useState('')
    const [city, setcity] = useState('')
    const [address, setaddress] = useState('')
    const [contact, setcontact] = useState('')
    const [error, setError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const router = useRouter()

    const handleSignup =async()=>{
        if(password!==cpassword){
            setPasswordError(true)
        }else{
            setPasswordError(false)
        }

        if(!email || !password || !cpassword || !city || !address || !contact){
            setError(true)
            alert("please enter valid data")
            return false
        }else{
            setError(false)
        }
      
        console.log(email, name, cpassword, address, contact, password, city);
        let response = await fetch("http://localhost:3000/api/restaurant",{
            method:"POST", 
            body:JSON.stringify({email,name,password,address,contact,city})  
        })
        response = await response.json();
        console.log(response);
        if(response.success){
            console.log(response);
            const{result} = response;
            delete result.password;
            localStorage.setItem("RestaurantUser", JSON.stringify(result))
            router.push("/restaurant/dashboard")
        }
        
    }

    return(
        <>
         <h3 style={{color:'red'}}>
        Signup 
        </h3>
        <div>
            <div className="input-wrapper">
            <input className="input-field" type="text" placeholder="Enter email id"  value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <div  className="input-wrapper">
            <input className="input-field" type="password" placeholder="Enter password" value={password} onChange={(e)=>{setpassword(e.target.value)}} />
            </div>
            
            <div  className="input-wrapper">
            <input className="input-field" type="password" placeholder="Confirm password" value={cpassword} onChange={(e)=>{setcpassword(e.target.value)}}/>
            </div>
            {
                passwordError && <span className="input-error">Password and confirm password not matched</span>
            }
            <div  className="input-wrapper">
            <input className="input-field" type="text" placeholder="Enter Restaurant name" value={name} onChange={(e)=>{setname(e.target.value)}}/>
            </div>
            <div  className="input-wrapper">
            <input className="input-field" type="text" placeholder="Enter City" value={city} onChange={(e)=>{setcity(e.target.value)}}/>
            </div>
            <div  className="input-wrapper">
            <input className="input-field" type="text" placeholder="Enter full address" value={address} onChange={(e)=>{setaddress(e.target.value)}}/>
            </div>
            <div  className="input-wrapper">
            <input className="input-field" type="text" placeholder="Enter contact number" value={contact} onChange={(e)=>{setcontact(e.target.value)}}/>
            </div>
            <div  className="input-wrapper">
                <button className="button" onClick={handleSignup}>Sign up</button>
            </div>
        </div>
        </>
    )
}

export default RestaurantSignUp