import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function EditFood() {
    const params = useParams()
    const { id } = params
    const URL = `http://localhost:4000/food/${id}`
    const [foodDetails, setFoodDetails] = useState(null)
    const [editForm, setEditForm] = useState({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        image: "",
    })

    const getFoodDetails = async () => {
        try {

            const response = await fetch(URL)
            const foundFoodDetails = await response.json()
            setFoodDetails(foundFoodDetails)
            console.log(foodDetails)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getFoodDetails()
    }, [])

    const loaded = () => (
        <div className='container3'>
            <div className='review-editor'></div>
            <section>
                <div className='review-details-list'>
                    <div className='food-details'>
                        <div className='food-card'>
                        <h4>Name: {foodDetails.name}</h4>
                        <h4>Calories: {foodDetails.calories}</h4>
                        <h4>Protein: {foodDetails.protein}</h4>
                        <h4>Carbohydrates: {foodDetails.carbohydrates}</h4>
                        <h4>Fat: {foodDetails.fat}</h4>
                        </div>
                        <div className='edit-image'>
                        <img src={foodDetails.image} height="200px" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

    const loading = () => (
        <>
            <h1>
                Loading...
            </h1>
        </>
    );
    return (
        <div>
            {foodDetails ? loaded() : loading()}

        </div>
    )
}
export default EditFood