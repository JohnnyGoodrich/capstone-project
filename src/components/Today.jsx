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
    console.log()

    const [editForm, setEditForm] = useState({
        calories: "",
        protein: "",
        carbohydrates: "",
        fat: "",
    })

    const mealURL = `https://capstone-nutrition-app.herokuapp.com/meal/63e05088c1ea98433aebbf23`
    const goalURL = `http://localhost:4000/goals`

    const getMeal = async () => {
        try {
            const response = await fetch(mealURL)
            const foundFood = await response.json()
            setMealItem(foundFood.foods)
        } catch (err) {
            console.log(err)
        }
    }
    const getGoals = async () => {
        try {
            const response = await fetch(goalURL)
            const foundGoals = await response.json()
            setGoals(foundGoals)

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
                number.style.background = "conic-gradient(darkcyan calc(" + counters[index] + "%), lightgrey 0deg)";
                number.setAttribute('data-value', counters[index] + "%");
                number.innerHTML = counters[index] + "%";
            }
        }, 10);
    });
    async function average() {
        
        let calorieGoal = goals[0].calories
        const array = []
        let sum = 0
        try {
            for (let i = 0; i < mealItem.length; i++) {
                let num = sum / calorieGoal
                array.push(mealItem[i].calories)
                sum += array[i]
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

        } catch (err) {
            console.log(err)
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

                            &nbsp;

                            <label for="fname">Set Protein Goal: </label>
                            <input
                                id="calorie-input"
                                type="number"
                                value={editForm.protein}
                                name="protein"
                                onChange={handleChange}
                            />

                            <div class='popup-form-data'>&nbsp;

                                <label for="fname">Set Carbs Goal: </label>
                                <input
                                    id="calorie-input"
                                    type="number"
                                    value={editForm.carbohydrates}
                                    name="carbohydrates"
                                    onChange={handleChange}
                                />

                            </div>&nbsp;

                            <label for="fname">Set Fat Goal: </label>
                            <input
                                id="calorie-input"
                                type="number"
                                value={editForm.fat}
                                name="fat"
                                onChange={handleChange}
                            />
                            <button type='submit'>Set</button>
                        </form>
                    </div>

                </Popup>

                <div className='progress-box'>
                    <div>
                            <h3 id='goal-text'>Current Calorie goal: <span className='averageRating'>{goals[0].calories}</span></h3>
                    </div>
                    <div id="progress" >
                        <div data-num={averageRating} className="progress-item">ds</div>
                    </div>
                </div>
                <div className='progress-box'>
                    <h3 id='goal-text'>Current Protein goal: <span className='averageRating'>{goals[0].protein}</span>g</h3>
                    <div id="progress" >
                        <div data-num={averageProteinNum} className="progress-item">ds</div>
                    </div>
                </div>
                <div className='progress-box'>
                    <h3 id='goal-text'>Current Carb goal: <span className='averageRating'>{goals[0].carbohydrates}</span>g</h3>
                    <div id="progress" >
                        <div data-num={averageCarbsNum} className="progress-item">ds</div>
                    </div>
                </div>
                <div className='progress-box'>
                    <h3 id='goal-text'>Current Fat goal: <span className='averageRating'>{goals[0].fat}</span>g</h3>
                    <div id="progress" >
                        <div data-num={averageFatNum} className="progress-item">ds</div>
                    </div>
                </div>
            </div>) : (<p>loading</p>)}
        </div>
    )

}
export default Today