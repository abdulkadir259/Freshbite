import { useState } from "react"

const AddFootItems = (props)=>{
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [path, setPath] = useState("")
    const [description, setDescriptoin] = useState("")
    const [error, setError] = useState(false)

    const handleAddFoodItem = async() =>{
        console.log(name,price,path,description);
        if(!name || !path || !price || !description){
            setError(true)
            return false
        }else{
            setError(false)
        }

        const restaurantData = JSON.parse(localStorage.getItem("RestaurantUser"))
        console.log(localStorage.getItem("RestaurantUser"));
        
        let resto_id;
        if(restaurantData){
            resto_id=restaurantData._id   
        }
        let response = await fetch("http://localhost:3000/api/restaurant/foods",{
            method:"POST",
            body:JSON.stringify({name, price, img_path:path, description, resto_id})
        });
        response = await response.json();
        if(response.success){
            // alert("food item added")
            props.setAddItem(false)
        }else{
            alert("Food item not added")
        }
        
    }
    return(
        <>
        <div className="container">
            <h1>Add new food items</h1>
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
                <button className="button" onClick={handleAddFoodItem}>Add Food Item</button>
            </div>
        </div>
        </>
    )

}

export default AddFootItems