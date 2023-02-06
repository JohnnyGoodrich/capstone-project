import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../style/Today.css'
import Popup from 'reactjs-popup';
import {getUserToken,setUserToken, clearUserToken, decodeToken} from "../utils/authToken"
import { useContext } from "react"
import { UserContext } from "../data"


function Today() {
    const [averageRating, setAverageRating] = useState(0)
    const [averageProteinNum, setAverageProteinNum] = useState(0)
    const [averageCarbsNum, setAverageCarbsNum] = useState(0)
    const [averageFatNum, setAverageFatNum] = useState(0)
    const [mealItem, setMealItem] = useState(null)
    const [calorieGoalNum, setCalorieGoalNum] = useState(0)
    const [goals, setGoals] = useState()
    const token = getUserToken()

    const [editForm, setEditForm] = useState({
        calories: "",
        protein: "",
        carbohydrates: "",
        fat: "",
    })

    const mealURL = `https://capstone-nutrition-app.herokuapp.com/meal/63e05088c1ea98433aebbf23`
    const goalURL = `http://localhost:4000/goals`

    // const changeCalorieNum = (e)=>{
    //     setCalorieGoalNum(e)
    //     console.log(calorieGoal)
    // }
    const getMeal = async () => {
        try {
            const response = await fetch(mealURL)
            const foundFood = await response.json()
            // setMeal(foundFood.title)
            // console.log(foundFood.title.title)
            setMealItem(foundFood.foods)
            console.log(foundFood.foods)
        } catch (err) {
            console.log(err)
        }
    }
    const getGoals = async () => {
        try {
            const response = await fetch(goalURL)
            const foundGoals = await response.json()
            // setMeal(foundFood.title)
            // console.log(foundFood.title.title)
            setGoals(foundGoals)
            console.log(foundGoals)
            console.log(foundGoals[0].calories)
            console.log(goals[0].calories)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getGoals()
        getMeal()
        average()
        averageProtein()
        averageCarbs()
        averageFat()
    }, [])

    useEffect(() => {
        getMeal()
        console.log(mealItem)
    }, [])
    useEffect(() => {
        average()
    }, [mealItem])
    useEffect(() => {
        averageProtein()
    }, [mealItem])
    useEffect(() => {
        averageCarbs()
    }, [mealItem])
    useEffect(() => {
        averageFat()
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
        }, 10);
    });
    // setCaloriegoalNum(document.getElementById("calorie-input").value)
    async function average() {
        
        let calorieGoal = goals[0].calories
        // calorieGoal = document.getElementById("calorie-input").value
        // console.log(calorieGoal)
        const array = []
        let sum = 0
        try {
            for (let i = 0; i < mealItem.length; i++) {
                let num = sum / calorieGoal
                array.push(mealItem[i].calories)
                sum += array[i]
                // console.log(mealItem[i].calories)
                // console.log((sum / calorieGoal) * 100)
                console.log(calorieGoal)

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
    async function averageProtein() {
        let proteinGoal = goals[0].protein
        const array = []
        let sum = 0
        try {
            for (let i = 0; i < mealItem.length; i++) {
                let num = sum / proteinGoal
                array.push(mealItem[i].protein)
                sum += array[i]
                // console.log(mealItem[i].protein)
                // console.log((sum / proteinGoal) * 100)

            } if (sum > proteinGoal) {
                setAverageProteinNum(100)
            } else {
                setAverageProteinNum((sum / proteinGoal) * 100)
            }
        } catch (err) {
            console.log(err)
        }
    }
    async function averageCarbs() {
        let carbsGoal = goals[0].carbohydrates
        const array = []
        let sum = 0
        try {
            for (let i = 0; i < mealItem.length; i++) {
                let num = sum / carbsGoal
                array.push(mealItem[i].carbohydrates)
                sum += array[i]
                // console.log(mealItem[i].carbohydrates)
                // console.log((sum / carbsGoal) * 100)

            } if (sum > carbsGoal) {
                setAverageCarbsNum(100)
            } else {
                setAverageCarbsNum((sum / carbsGoal) * 100)
            }
        } catch (err) {
            console.log(err)
        }
    }
    async function averageFat() {
        let fatGoal = goals[0].fat
        const array = []
        let sum = 0
        try {
            for (let i = 0; i < mealItem.length; i++) {
                let num = sum / fatGoal
                array.push(mealItem[i].fat)
                sum += array[i]
                // console.log(mealItem[i].fat)
                // console.log((sum / fatGoal) * 100)

            } if (sum > fatGoal) {
                setAverageFatNum(100)
            } else {
                setAverageFatNum((sum / fatGoal) * 100)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleChange = (e) => {
        const userInput = { ...editForm }
        userInput[e.target.name] = e.target.value
        setEditForm(userInput)
    }

    const handleSubmit = async (e) => {
        // e.preventDefault()
        const currentState = { ...goals, ...editForm }
        try {
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(currentState)
            }
            const response = await fetch(goalURL, requestOptions)
            const updateGoal = await response.json()
            setGoals(updateGoal)

            // navigate(-1)

        } catch (err) {
            console.log(err)
            // navigate(URL)
        }
    }

    return (
        <div>
        {goals ? (
            <div className='container'>
                <Popup trigger={<button className="button"> Set Goals </button>} modal contentStyle={{ padding: '50px', border: 'none' }}>

                    <div className='popup-form-data'>
                        <form className='popup-form-data' onSubmit={handleSubmit}>
                            <label for="fname">Set Calorie Goal: </label>
                            <input
                                id="calorie-input"
                                type="number"
                                value={editForm.calories}
                                name="calories"
                                onChange={handleChange}
                            />
                            {/* <input class="comment" type="submit" value="Submit" ></input> */}

                            &nbsp;

                            <label for="fname">Set Protein Goal: </label>
                            <input
                                id="calorie-input"
                                type="number"
                                value={editForm.protein}
                                name="protein"
                                onChange={handleChange}
                            />
                            {/* <input class="comment" type="submit" value="Submit" ></input> */}


                            <div class='popup-form-data'>&nbsp;

                                <label for="fname">Set Carbs Goal: </label>
                                <input
                                    id="calorie-input"
                                    type="number"
                                    value={editForm.carbohydrates}
                                    name="carbohydrates"
                                    onChange={handleChange}
                                />
                                {/* <input class="comment" type="submit" value="Submit" ></input> */}


                            </div>&nbsp;

                            <label for="fname">Set Fat Goal: </label>
                            <input
                                id="calorie-input"
                                type="number"
                                value={editForm.fat}
                                name="fat"
                                onChange={handleChange}
                            />
                            {/* <input class="comment" type="submit" value="Submit" ></input> */}
                            <button type='submit'>Set</button>
                        </form>
                    </div>

                </Popup>

                <div className='progress-box'>
                    <div>
                            <h3 id='calorie-goal'>Current Calorie goal: {goals[0].calories}</h3>
                    </div>
                    <div id="progress" >
                        <div data-num={averageRating} className="progress-item">ds</div>
                    </div>
                </div>
                <div className='progress-box'>
                    <h3 id='protein-goal'>Current Protein goal: {goals[0].protein}g</h3>
                    <div id="progress" >
                        <div data-num={averageProteinNum} className="progress-item">ds</div>
                    </div>
                </div>
                <div className='progress-box'>
                    <h3 id='carbs-goal'>Current Carb goal: {goals[0].carbohydrates}g</h3>
                    <div id="progress" >
                        <div data-num={averageCarbsNum} className="progress-item">ds</div>
                    </div>
                </div>
                <div className='progress-box'>
                    <h3 id='fat-goal'>Current Fat goal: {goals[0].fat}g</h3>
                    <div id="progress" >
                        <div data-num={averageFatNum} className="progress-item">ds</div>
                    </div>
                </div>
            </div>) : (<p>loading</p>)}
        </div>
    )

}
export default Today