import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../style/EditFood.css'

function EditFood() {
    const params = useParams()
    const { id } = params
    const navigate = useNavigate()
    const URL = `https://capstone-nutrition-app.herokuapp.com/food/${id}`
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
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getFoodDetails()
    }, [])

    const removeFood = async () => {
        try {
            const options = {
                method: "DELETE",
                // headers: {
                //     Authorization: `Bearer ${token}`
                // }
            }
            const response = await fetch(URL, options)
            const deletedFood = await response.json()
        } catch (err) {
            console.log(err)
            navigate(-1)
        }
    }
    const updateFood = async (e) => {
        e.preventDefault()
        const currentState = { ...foodDetails, ...editForm }
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(currentState)
            }
            const response = await fetch(URL, requestOptions)
            const updatedFood = await response.json()
            setFoodDetails(updatedFood)

            navigate(-1)

        } catch (err) {
            console.log(err)
            navigate(URL)
        }
    }
    const handleChange = (e) => {
        const userInput = { ...editForm }
        userInput[e.target.name] = e.target.value
        setEditForm(userInput)
    }
    const loaded = () => (
        <div>
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
                <button class='delete-button' onClick={removeFood} >Delete Food</button>
            </div>
            <form className='container3' onSubmit={(e) => { updateFood(e) }} >
                <div className='create-review'>
                    <h2 className='section-header'>Edit this food</h2>
                    <div className='text-box'>Name</div>
                    <input
                        type="text"
                        value={editForm.name}
                        className="comment"
                        name="name"
                        // placeholder="rating"
                        onChange={handleChange}
                    />
                    <div className='text-box'>Calories</div>
                    <input
                        type="text"
                        className="comment"
                        value={editForm.calories}
                        name="calories"
                        // placeholder="comment"
                        onChange={handleChange}
                    />
                    <div className='text-box'>Protein</div>
                    <input
                        type="text"
                        className="comment"
                        value={editForm.protein}
                        name="protein"
                        // placeholder="comment"
                        onChange={handleChange}
                    />
                    <div className='text-box'>Carbohydrates</div>
                    <input
                        type="text"
                        className="comment"
                        value={editForm.carbohydrates}
                        name="carbohydrates"
                        // placeholder="comment"
                        onChange={handleChange}
                    />
                    <div className='text-box'>Fat</div>
                    <input
                        type="text"
                        className="comment"
                        value={editForm.fat}
                        name="fat"
                        // placeholder="comment"
                        onChange={handleChange}
                    />
                    <div className='text-box'>Image</div>
                    <input
                        type="text"
                        className="comment"
                        value={editForm.image}
                        name="image"
                        // placeholder="comment"
                        onChange={handleChange}
                    />
                    <div className='update-review-box'>
                    <input className='update-review' type="submit" value="Update Food" />
                    </div>

                </div>
            </form>

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