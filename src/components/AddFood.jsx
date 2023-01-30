import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function AddFood(){
    const params = useParams()
    const {id} = params
    const [food, setFood] = useState(null)

    const URL = "http://localhost:4000/food"
    const URL2 = `http://localhost:4000/food/${id}`



    return(
    <h1>Add Food Page</h1>
    )
}

export default AddFood