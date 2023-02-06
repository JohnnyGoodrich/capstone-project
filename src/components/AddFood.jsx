import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../style/AddFood.css'
import { Link } from 'react-router-dom'


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

    const URL = "https://capstone-nutrition-app.herokuapp.com/food"
    const URL2 = `https://capstone-nutrition-app.herokuapp.com/food/${id}`

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
        <div className='container2'>
            <form className='food-form' onSubmit={handleSubmit}>
                <div className='create-food'>
                    <h2 className='section-header'>Create a New Food</h2>
                    <label className='comment-label' htmlFor='title'>
                        <div>Name</div>
                        <input
                            type="text"
                            className="name"
                            name="name"
                            // placeholder="name"
                            autoComplete='off'
                            value={editForm.name}
                            onChange={handleChange}
                        />
                    </label>
                    <div>
                        <div>Calories</div>
                        <label htmlFor='title'>
                            <input
                                type="number"
                                className="name"
                                name="calories"
                                // placeholder="1-100"
                                min="0"
                                autoComplete='off'
                                value={editForm.calories}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label className='comment-label' htmlFor='title'>
                            <div>Protein</div>
                            <input
                                type="number"
                                className="name"
                                name="protein"
                                // placeholder="1-100"
                                min="0"
                                autoComplete='off'
                                value={editForm.protein}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <label className='comment-label' htmlFor='title'>
                        <div>Carbs</div>
                        <input
                            type="number"
                            className="name"
                            name="carbs"
                            // placeholder="1-100"
                            min="0"
                            autoComplete='off'
                            value={editForm.carbs}
                            onChange={handleChange}
                        />
                    </label>
                    <div>
                        <label className='comment-label' htmlFor='title'>
                            <div>Fat</div>
                            <input
                                type="number"
                                className="name"
                                name="fat"
                                // placeholder="1-100"
                                min="0"
                                autoComplete='off'
                                value={editForm.fat}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label className='comment-label' htmlFor='title'>
                            <div>Image</div>
                            <input
                                type="text"
                                className="name"
                                name="image"
                                // placeholder="1-100"
                                min="0"
                                autoComplete='off'
                                value={editForm.image}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <br />
                    <div className='button'>
                        <button type="submit" value="Post Review">Create Food</button>
                    </div>
                </div>
            </form>
            <div className='all-foods-box'>
                <div className='all-foods3'>
                    {food ? (
                        food.map((foods, index) => {
                            return (
                                <Link style={{ textDecoration: 'none' }} to={`/newfood/${foods._id}`} className=''>
                                    <div key={foods._id} className='food-list2'>
                                        <div className='edit'>
                                            <div className='foods2'>
                                                <div className='food-text'>
                                                    <div className=''>Name: {foods.name}</div>
                                                    <div className=''>Calories: {foods.calories}</div>
                                                    <div className=''>Protein: {foods.protein}</div>
                                                    <div className=''>Carbs: {foods.carbohydrates}</div>
                                                    <div className=''>Fat: {foods.fat}</div>
                                                </div>

                                            <img className='' src={foods.image} height="100px" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    ) : (<p> No foods to show </p>)}
                </div>
                <div>

                </div>
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