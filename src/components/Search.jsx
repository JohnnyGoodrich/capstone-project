import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { BsSearch } from "react-icons/bs"
import '../style/Search.css'
import Progress from './Progress'
import { getUserToken, setUserToken, clearUserToken, decodeToken } from "../utils/authToken"

const Search = (props) => {
    const [searchValue, setSearchValue] = useState('')
    const [movies, setMovies] = useState('')
    const [food, setFood] = useState(null)
    const [apiFoods, setApiFoods] = useState(null)
    const [mealItem, setMealItem] = useState(null)
    const [meal, setMeal] = useState(null)
    const [addFood, setAddFood] = useState(null)
    const [deleteFood, setDeleteFood] = useState(null)
    const [averageRating, setAverageRating] = useState(0)
    const params = useParams()
    const navigate = useNavigate()
    const { id } = params

    const URL = "https://capstone-nutrition-app.herokuapp.com/food"
    const mealURL = `https://capstone-nutrition-app.herokuapp.com/meal/63d98149c8ac5f0cc6197613`
    const mealItemURL = `https://capstone-nutrition-app.herokuapp.com/meal/edit/${id}`
    const URL2 = `https://capstone-nutrition-app.herokuapp.com/food/${id}`
    const API = `https://api.edamam.com/api/nutrition-data?app_id=bb62f382&app_key=6504bb61e928acc7fad1e6d78d60ff28&nutrition-type=logging&ingr=chicken`


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
    const getAPI = async () => {
        try {
            const response = await fetch(API)
            const foundFood = await response.json()
            setApiFoods(foundFood.ingredients)
            console.log(foundFood.totalNutrients.CHOCDF.quantity)
            console.log(foundFood.ingredients)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getAPI()

    }, [])



    const getMeal = async () => {
        try {
            const response = await fetch(mealURL)
            const foundFood = await response.json()
            setMeal(foundFood.title)
            // console.log(foundFood.title.title)
            setMealItem(foundFood.foods)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMeal()
        // console.log(mealItem)
    }, [])


    const onChange = (event) => {
        setSearchValue(event.target.value)
    }
    const onSearch = (searchItem) => {
        setSearchValue(searchItem)
    }
    // Adding items to the backend

    // handle submit
    // const handleChange = (e) => {
    //     const userInput = { ...mealItem }
    //     userInput[e.target.name] = e.target.value
    //     setMealItem(userInput)
    // }

    // const handleSubmit = async (e) => {
    //     // e.preventDefault()
    //     const currentState = { ...mealItem }

    //     try {
    //         const requestOptions = {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 // Authorization: `Bearer ${token}`
    //             },
    //             body: JSON.stringify(currentState)

    //         }
    //         const response = await fetch(mealURL, requestOptions)
    //         const createdMealItem = await response.json()
    //         setMealItem([...mealItem, createdMealItem])

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // adding an item
    // const addItem = async(item)=>{
    //     let itemObject = new Object()
    //     for(let i =0; i<food.length; i++){
    //         if (food[i].name === item){
    //             itemObject = food[i] 
    //         }
    //     }
    //     mealItem.push(itemObject)
    //     handleSubmit()
    //     // handleChange()
    //     console.log(itemObject)
    //     console.log(mealItem)

    // }

    // create handlesubmit 
    const getfood = async (e) => {
        try {
            const response = await fetch(`https://capstone-nutrition-app.herokuapp.com/food/${e.target.value}`)
            const foundFood = await response.json()
            console.log(foundFood)
            setAddFood(foundFood)
        } catch (err) {
            console.log(err)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("hello" + addFood)
        const currentState = addFood
        // need to await addfood before post? 
        try {
            const foodResponse = await fetch(`https://capstone-nutrition-app.herokuapp.com/food/${e.target.value}`)
            const foundFood = await foodResponse.json()
            console.log(mealURL, foundFood)
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(foundFood)
                // body: foundFood

            }

            const postResponse = await fetch(mealURL, requestOptions)
            console.log(postResponse)
            const createdMealItem = await postResponse.json()
            setMealItem([...mealItem, createdMealItem])

        } catch (err) {
            console.log(err)
        }

    }
    const handleSubmit2 = async (e) => {
        e.preventDefault()

        console.log("hello" + addFood)
        const currentState = addFood
        // need to await addfood before post? 
        try {
            const foodResponse = await fetch(`https://api.edamam.com/api/nutrition-data?app_id=bb62f382&app_key=6504bb61e928acc7fad1e6d78d60ff28&nutrition-type=logging&ingr=chicken`)
            const foundFood = await foodResponse.json()
            console.log(mealURL, foundFood)
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(foundFood)
                // body: foundFood

            }

            const postResponse = await fetch(mealURL, requestOptions)
            console.log(postResponse)
            const createdMealItem = await postResponse.json()
            setMealItem([...mealItem, createdMealItem])

        } catch (err) {
            console.log(err)
        }

    }
    // post that mealItem to the DB
    // refresh screen to include new items
    const removeItem = async (e) => {
        // e.preventDefault()
        const removedItem = e.target.value
        try {
            const options = {
                method: "DELETE",
                headers: {
                    // Authorization: `Bearer ${token}`
                }
            }
            setDeleteFood([mealItem])

            const response = await fetch(`https://capstone-nutrition-app.herokuapp.com/meal/edit/${e.target.value}`, options)
            // const createdMealItem = await response.json()
            // setMealItem([mealItem])
            navigate(0)
        } catch (err) {
            console.log(err)

        }
    }
    useEffect(() => {
        average()
    }, [mealItem])

    let items = document.querySelectorAll('.progress-item');
    const counters = Array(items.length);
    const intervals = Array(items.length);
    counters.fill(0);
    items.forEach((number, index) => {
        intervals[index] = setInterval(() => {
            if (counters[index] == parseInt(number.dataset.num)) {
                clearInterval(intervals[index]);
            } else {
                counters[index] += 1;
                number.style.background = "conic-gradient(aqua calc(" + counters[index] + "%), gray 0deg)";
                number.setAttribute('data-value', counters[index] + "%");
                number.innerHTML = counters[index] + "%";
            }
        }, 15);
    });

    async function average() {
        const array = []
        let sum = 0
        let calorieGoal = 2000
        try {
            for (let i = 0; i < mealItem.length; i++) {
                let num = document.querySelector("progress-bar progress-bar-striped active col-xs-9")
                console.log(num)
                array.push(mealItem[i].calories)
                sum += array[i]
                // console.log(mealItem[i].calories)
                // console.log((sum / calorieGoal) * 100)

            }
            if (sum > calorieGoal) {
                setAverageRating(100)
            } else {

                setAverageRating((sum / calorieGoal) * 100)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const roundNumber = (num) => {
        let value = Math.floor(num)
        // let value = Math.floor(num*10)/10
        return value
        console.log(value)
    }


    return (
        <div className="search-context">
            <div className='search-context2'>
                <div className="search-context-inner">
                    <p id="look-up-symbol">{<BsSearch />}</p>
                    <input type="text" onChange={onChange} id="search" autoComplete="off" placeholder="Search foods..." />
                    <Link style={{ textDecoration: 'none' }} to={`/details/${searchValue}`}>
                        <button onClick={() => <Link to={`/details/${searchValue}`}></Link>} id="search-submit">Search</button>
                    </Link>
                </div>
                {/* <div className="drop-down-list">
                    {Object.values(food).filter((food) => {
                        const searchItem = searchValue
                        const foodTitle = food.name
                        return (searchItem && foodTitle.startsWith(searchItem) && foodTitle !== searchItem)
                    })
                        .slice(0, 8)
                        .map((food, idx) => (
                            <div onClick={() => onSearch(food)} className="drop-down-row" key={idx}>
                                <Link style={{ textDecoration: 'none' }} key={food._id} to={`/review/${food._id}`}>
                                    <div className='drop-down-info'>
                                        <img id="search-image" style={{ borderRadius: '10px' }} src={food.image} alt="" />
                                        <div>
                                            <div id="search-title" style={{ textDecoration: 'none' }}>{food.name}</div>
                                            <button key={idx} value={food._id} onClick={handleSubmit}>Add</button> */}
                {/* <p className='movie-info-search'><span className='age-rating'>{food.calories}</span>&nbsp; {food.protein}, {food.carbohydrates}h{food.fat}m</p> */}
                {/* </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div> */}
            </div>
            <button ></button>
            <div id="progress" >
                <div className='wheel-label'>Calories from this meal</div>
                <div data-num={averageRating} className="progress-item">ds</div>
            </div>
            <div>
                <div class="cntainer-fluid">
                    <div class="progress">
                        <label class="progress-label col-xs-3" > Total memory:</label>
                        <div class="progress-bar progress-bar-striped active col-xs-9" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ width: { averageRating } }}>
                            40% Complete (success)
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {meal ? (
                    <div>{meal.title}</div>
                ) : (<p>No meals to show</p>)}

            </div>
            <div className='all-foods2'>
                {mealItem ? (
                    mealItem.map((mealItems, index) => {
                        return (
                            <div key={mealItems._id} className='food-list'>
                                <div className='edit'>
                                    <div className='foods2'>
                                        <div className='food-text'>
                                            <div className=''>Name: {mealItems.name}</div>
                                            <div className=''>Calories: {mealItems.calories}</div>
                                            <div className=''>Protein: {mealItems.protein}</div>
                                            <div className=''>Carbs: {mealItems.carbohydrates}</div>
                                            <div className=''>Fat: {mealItems.fat}</div>

                                        </div>
                                        <div>
                                            <img className='' src={mealItems.image} height="100px" />
                                            <button key={index} value={mealItems._id} onClick={removeItem}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (<p> No meals to show </p>)}
            </div>
            <Link style={{ textDecoration: 'none' }} to={`/newfood`}>
                <button>Add New Food or Edit Existing Food</button>
            </Link>
            <div className='all-foods2'>
                {food ? (
                    food.map((foods, index) => {
                        return (
                            <div key={foods._id} className='food-list'>
                                <div className='edit'>
                                    <div className='foods2'>
                                        <div className='food-text'>
                                            <div className=''>Name: {foods.name}</div>
                                            <div className=''>Calories: {foods.calories}</div>
                                            <div className=''>Protein: {foods.protein}</div>
                                            <div className=''>Carbs: {foods.carbohydrates}</div>
                                            <div className=''>Fat: {foods.fat}</div>
                                        </div>
                                        <div>
                                            <img className='' src={foods.image} height="100px" />
                                            <button key={index} value={foods._id} onClick={handleSubmit}>Add</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (<p> No foods to show </p>)}
            </div>
            <div className='all-foods2'>
                {apiFoods ? (
                    apiFoods.map((foods, index) => {
                        return (
                            <div key={foods._id} className='food-list'>
                                <div className='edit'>
                                    <div className='foods2'>
                                        <div className='food-text'>
                                            <div className=''>Name: {foods.text}</div>
                                            <div className=''>Calories: {roundNumber(foods.parsed[0].nutrients.ENERC_KCAL.quantity)}</div>
                                            <div className=''>Protein: {roundNumber(foods.parsed[0].nutrients.PROCNT.quantity)}</div>
                                            <div className=''>Carbs: {roundNumber(foods.parsed[0].nutrients.CHOCDF.quantity)}</div>
                                            <div className=''>Fat: {roundNumber(foods.parsed[0].nutrients.FAT.quantity)}</div>
                                        </div>
                                        <div>
                                            <img className='' src={foods.image} height="100px" />
                                            <button key={index} value={foods._id} onClick={handleSubmit2}>Add</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (<p> No foods to show </p>)}
            </div>

        </div>
    )
}

export default Search