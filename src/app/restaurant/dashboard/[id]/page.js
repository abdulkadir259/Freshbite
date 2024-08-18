"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const EditFoodItems = (props)=>{
    console.log(props.params.id);
    
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [path, setPath] = useState("")
    const [description, setDescriptoin] = useState("")
    const [error, setError] = useState(false)
     const router = useRouter()

     useEffect(() => {
        handleLoadFoodItem()
     }, [])
     
     const handleLoadFoodItem = async()=>{
 let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + props.params.id)
 response = await response.json();
 if(response.success){
    console.log(response);
    
    setName(response.result.name)
    setPrice(response.result.price)
    setDescriptoin(response.result.description)
    setPath(response.result.img_path)
 }
     }

    const handleBackBtn=()=>{
router.push("/restaurant/dashboard")
    }

    const handleEditFoodItem = async() =>{
        console.log(name,price,path,description);
        if(!name || !path || !price || !description){
            setError(true)
            return false
        }else{
            setError(false)
        }

        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/" + props.params.id,{
            method:"PUT",
            body:JSON.stringify({name, price, img_path:path, description})
        })
        response = await response.json();
        if(response.success){
            router.push("/restaurant/dashboard")
        }else{
            alert("not updated")
        }
        
    }

    
    return(
        <>
        <div className="container">
            <h1>Update food items</h1>
            <div className="input-wrapper">
                <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="input-field" placeholder="Enter food name"/>
                {error && !name && <span className="input-error">Enter valid name</span>}
            </div>
            <div className="input-wrapper">
                <input onChange={(e)=>setPrice(e.target.value)} value={price} type="text" className="input-field" placeholder="Enter Price"/>
                {error && !price && <span className="input-error">Enter valid price</span>}
            </div>
            <div className="input-wrapper">
                <input onChange={(e)=>setPath(e.target.value)} value={path} type="text" className="input-field" placeholder="Enter image Path"/>
                {error && !path && <span className="input-error">Enter valid path</span>}
            </div>
            <div className="input-wrapper">
                <input onChange={(e)=>setDescriptoin(e.target.value)} value={description} type="text" className="input-field" placeholder="Enter Description"/>
                {error && !description && <span className="input-error">Enter valid description</span>}
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleEditFoodItem}>Update Food Item</button>
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={handleBackBtn}>Back</button>
            </div>
        </div>
        </>
    )

}

export default EditFoodItems