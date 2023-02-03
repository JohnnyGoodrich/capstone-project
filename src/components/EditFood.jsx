import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../style/EditFood.css'

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

    const removeFood = async () => {
        try {
            const options = {
                method: "DELETE",
                // headers: {
                //     Authorization: `Bearer ${token}`
                // }
            }
            // const response = await fetch(URL4, options)
            // const deletedReview = await response.json()
        } catch (err) {
            console.log(err)
            // navigate(-1)
        }
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
                <button class='delete-button' value={foodDetails._id} >Delete Food</button>
            </div>
            <form className='container3'  >
                <div className='create-review'>
                    <h2 className='section-header'>Edit this food</h2>
                    <div className='text-box'>Name</div>
                    <input
                        type="number"
                        value={editForm.name}
                        className="comment"
                        name="rating"
                        // placeholder="rating"
                        // onChange={handleChange}
                    />
                    <div className='text-box'>Calories</div>
                    <input
                        type="text"
                        className="comment"
                        value={editForm.calories}
                        name="comment"
                        // placeholder="comment"
                        // onChange={handleChange}
                    />
                    <div className='text-box'>Protein</div>
                    <input
                        type="text"
                        className="comment"
                        value={editForm.protein}
                        name="comment"
                        // placeholder="comment"
                        // onChange={handleChange}
                    />
                    <div className='text-box'>Carbohydrates</div>
                    <input
                        type="text"
                        className="comment"
                        value={editForm.carbohydrates}
                        name="comment"
                        // placeholder="comment"
                        // onChange={handleChange}
                    />
                    <div className='text-box'>Fat</div>
                    <input
                        type="text"
                        className="comment"
                        value={editForm.fat}
                        name="comment"
                        // placeholder="comment"
                        // onChange={handleChange}
                    />
                    <div className='text-box'>Image</div>
                    <input
                        type="text"
                        className="comment"
                        value={editForm.fat}
                        name="comment"
                        // placeholder="comment"
                        // onChange={handleChange}
                    />
                    <div className='update-review-box'>
                    <input className='update-review' type="submit" value="Update Review" />
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