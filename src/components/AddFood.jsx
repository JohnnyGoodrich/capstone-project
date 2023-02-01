import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../style/AddFood.css'

function AddFood() {
    const params = useParams()
    const { id } = params
    const [food, setFood] = useState(null)
    const [editForm, setEditForm] = useState({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        image: "",
    })

    const URL = "http://localhost:4000/food"
    const URL2 = `http://localhost:4000/food/${id}`

    // get foods
    const getFoods = async () => {
        try {

            const response = await fetch(URL)
            const foundFood = await response.json()
            setFood(foundFood)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getFoods()
    }, [])

    // handlechange and handlesubmit
    const handleChange = (e) => {
        const userInput = { ...editForm }
        userInput[e.target.name] = e.target.value
        setEditForm(userInput)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const currentState = { ...editForm }

        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(currentState)

            }
            const response = await fetch(URL, requestOptions)
            const createdFood = await response.json()
            setFood([...food, createdFood])
            setEditForm([{
                name: "",
                Calories: "",
                Protein: "",
                Carbs: "",
                Fat: "",
                image: "",
            }])
        } catch (err) {
            console.log(err)
        }
    }
    // end handle functions


    const loaded = () => (
        <div>
            <form className='rating-form' onSubmit={handleSubmit}>
                <h2 className='section-header'>Create a New Food</h2>
                <div className='create-review'>
                    <label className='comment-label' htmlFor='title'>
                        <div>Name</div>
                        <input
                            type="text"
                            className="name"
                            name="name"
                            placeholder="name"
                            autoComplete='off'
                            value={editForm.name}
                            onChange={handleChange}
                        />
                    </label>
                    <div>Calories</div>
                    <label htmlFor='title'>
                        <input
                            type="number"
                            className="calories"
                            name="calories"
                            // placeholder="1-100"
                            min="0"
                            autoComplete='off'
                            value={editForm.calories}
                            onChange={handleChange}
                        />
                    </label>
                    <label className='comment-label' htmlFor=''>
                        <div>Protein</div>
                        <input
                            type="number"
                            className="protein"
                            name="protein"
                            // placeholder="1-100"
                            min="0"
                            autoComplete='off'
                            value={editForm.protein}
                            onChange={handleChange}
                        />
                    </label>
                    <label className='comment-label' htmlFor='title'>
                        <div>Carbs</div>
                        <input
                            type="number"
                            className="carbs"
                            name="carbs"
                            // placeholder="1-100"
                            min="0"
                            autoComplete='off'
                            value={editForm.carbs}
                            onChange={handleChange}
                        />
                    </label>
                    <label className='comment-label' htmlFor='title'>
                        <div>Fat</div>
                        <input
                            type="number"
                            className="fat"
                            name="fat"
                            // placeholder="1-100"
                            min="0"
                            autoComplete='off'
                            value={editForm.fat}
                            onChange={handleChange}
                        />
                    </label>
                    <label className='comment-label' htmlFor='title'>
                        <div>Image</div>
                        <input
                            type="text"
                            className="image"
                            name="image"
                            // placeholder="1-100"
                            min="0"
                            autoComplete='off'
                            value={editForm.image}
                            onChange={handleChange}
                        />
                    </label>

                    <br />
                    <div className='button'>
                        <button type="submit" value="Post Review">Create Food</button>
                    </div>
                </div>
            </form>
            <div className='all-foods'>
                {food ? (
                    food.map((foods, index) => {
                        return (
                            <div key={foods._id} className='food-list'>
                                <div className='edit'>
                                    <div className='foods'>

                                        <p className='rating-number'>Name: {foods.name}</p>
                                        <p className='rating-number'>Calories: {foods.calories}</p>
                                        <p className='rating-number'>Protein: {foods.protein}</p>
                                        <p className='rating-number'>Carbs: {foods.carbohydrates}</p>
                                        <p className='rating-number'>Fat: {foods.fat}</p>
                                        <img className='rating-number' src={foods.image} height="100px" />
                                        {/* <p className='review-comment'>"{review.comment}"</p> */}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (<p> No foods to show </p>)}
            </div>
            <div>

            </div>
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
            {/* {food ? loaded() : loading()} */}
            {loaded()}

        </div>
    )

}

export default AddFood