import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../style/Today.css'
import Popup from 'reactjs-popup';
import { getUserToken, setUserToken, clearUserToken, decodeToken } from "../utils/authToken"
import { useContext } from "react"
import { UserContext } from "../data"




function Today() {
    const [averageRating, setAverageRating] = useState(0)
    const [meal1Calories, setMeal1Calories] = useState(0)
    const [meal2Calories, setMeal2Calories] = useState(0)
    const [meal3Calories, setMeal3Calories] = useState(0)
    const [meal1Protein, setMeal1Protein] = useState(0)
    const [meal2Protein, setMeal2Protein] = useState(0)
    const [meal3Protein, setMeal3Protein] = useState(0)
    const [meal1Carbs, setMeal1Carbs] = useState(0)
    const [meal2Carbs, setMeal2Carbs] = useState(0)
    const [meal3Carbs, setMeal3Carbs] = useState(0)
    const [meal1Fat, setMeal1Fat] = useState(0)
    const [meal2Fat, setMeal2Fat] = useState(0)
    const [meal3Fat, setMeal3Fat] = useState(0)
    const [averageProteinNum, setAverageProteinNum] = useState(0)
    const [averageCarbsNum, setAverageCarbsNum] = useState(0)
    const [averageFatNum, setAverageFatNum] = useState(0)
    const [mealItem, setMealItem] = useState(null)
    const [breakfastItem, setBreakfastItem] = useState(null)
    const [lunchItem, setLunchItem] = useState(null)
    const [calorieGoalNum, setCalorieGoalNum] = useState(0)
    const [goals, setGoals] = useState()
    const token = getUserToken()
    const totalCalories = meal1Calories + meal3Calories + meal2Calories
    const totalProtein = meal1Protein + meal3Protein + meal2Protein
    const totalCarbs = meal1Carbs + meal3Carbs + meal2Carbs
    const totalFat = meal1Fat + meal3Fat + meal2Fat

    const [editForm, setEditForm] = useState({
        calories: "",
        protein: "",
        carbohydrates: "",
        fat: "",
    })

    const mealURL = `https://capstone-nutrition-app.herokuapp.com/meal/63e05088c1ea98433aebbf23`
    const goalURL = `https://capstone-nutrition-app.herokuapp.com/goals`
    const mealURL3 = `https://capstone-nutrition-app.herokuapp.com/meal/63dfe532c1ea98433aebba9f`
    const mealURL4 = `https://capstone-nutrition-app.herokuapp.com/meal/63dfee07c1ea98433aebbaab`

    const getMeal = async () => {
        try {
            const response = await fetch(mealURL)
            const foundFood = await response.json()
            setMealItem(foundFood.foods)
        } catch (err) {
            console.log(err)
        }
    }
    const getBreakfastItems = async () => {
        try {
            const response = await fetch(mealURL3)
            const foundFood = await response.json()
            setBreakfastItem(foundFood.foods)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getBreakfastItems()
    }, [])
    const getLunchItem = async () => {
        try {
            const response = await fetch(mealURL4)
            const foundFood = await response.json()
            setLunchItem(foundFood.foods)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getLunchItem()
    }, [])
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
    async function meal1Sum() {
        const array = []
        let sum = 0
        let calorieGoal = 2000
        try {
            for (let i = 0; i < mealItem.length; i++) {
                let num = document.querySelector("progress-bar progress-bar-striped active col-xs-9")
                array.push(mealItem[i].calories)
                sum += array[i]
                setMeal1Calories(sum)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        meal1Sum()
    }, [mealItem])

    async function meal1ProteinSum() {
        const array = []
        let sum = 0
        let calorieGoal = 2000
        try {
            for (let i = 0; i < mealItem.length; i++) {
                let num = document.querySelector("progress-bar progress-bar-striped active col-xs-9")
                array.push(mealItem[i].protein)
                sum += array[i]
                setMeal1Protein(sum)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        meal1ProteinSum()
    }, [mealItem])

    async function meal1CarbsSum() {
        const array = []
        let sum = 0
        let calorieGoal = 2000
        try {
            for (let i = 0; i < mealItem.length; i++) {
                let num = document.querySelector("progress-bar progress-bar-striped active col-xs-9")
                array.push(mealItem[i].carbohydrates)
                sum += array[i]
                setMeal1Carbs(sum)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        meal1CarbsSum()
    }, [mealItem])

    async function meal1FatSum() {
        const array = []
        let sum = 0
        let calorieGoal = 2000
        try {
            for (let i = 0; i < mealItem.length; i++) {
                let num = document.querySelector("progress-bar progress-bar-striped active col-xs-9")
                array.push(mealItem[i].fat)
                sum += array[i]
                setMeal1Fat(sum)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        meal1FatSum()
    }, [mealItem])

    async function meal2Sum() {
        const array = []
        let sum = 0
        let calorieGoal = 2000
        try {
            for (let i = 0; i < breakfastItem.length; i++) {
                let num = document.querySelector("progress-bar progress-bar-striped active col-xs-9")
                array.push(breakfastItem[i].calories)
                sum += array[i]
            }
            if (sum > calorieGoal) {
                setMeal2Calories(0)
            } else {
                setMeal2Calories(sum)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        meal2Sum()
    }, [breakfastItem])

    async function meal2ProteinSum() {
        const array = []
        let sum = 0
        let calorieGoal = 2000
        try {
            for (let i = 0; i < mealItem.length; i++) {
                let num = document.querySelector("progress-bar progress-bar-striped active col-xs-9")
                array.push(breakfastItem[i].protein)
                sum += array[i]
                setMeal2Protein(sum)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        meal2ProteinSum()
    }, [breakfastItem])

    async function meal2CarbsSum() {
        const array = []
        let sum = 0
        let calorieGoal = 2000
        try {
            for (let i = 0; i < breakfastItem.length; i++) {
                let num = document.querySelector("progress-bar progress-bar-striped active col-xs-9")
                array.push(breakfastItem[i].carbohydrates)
                sum += array[i]
                setMeal2Carbs(sum)
                console.log(meal2Carbs)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        meal2CarbsSum()
    }, [breakfastItem])

    async function meal2FatSum() {
        const array = []
        let sum = 0
        let calorieGoal = 2000
        try {
            for (let i = 0; i < breakfastItem.length; i++) {
                let num = document.querySelector("progress-bar progress-bar-striped active col-xs-9")
                array.push(breakfastItem[i].fat)
                sum += array[i]
                setMeal2Fat(sum)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        meal2FatSum()
    }, [breakfastItem])

    async function meal3Sum() {
        const array = []
        let sum = 0
        let calorieGoal = 2000
        try {
            for (let i = 0; i < lunchItem.length; i++) {
                let num = document.querySelector("progress-bar progress-bar-striped active col-xs-9")
                array.push(lunchItem[i].calories)
                sum += array[i]
            }
            if (sum > calorieGoal) {
                setMeal3Calories(0)
            } else {
                setMeal3Calories(sum)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        meal3Sum()
    }, [lunchItem])

    async function meal3ProteinSum() {
        const array = []
        let sum = 0
        let calorieGoal = 2000
        try {
            for (let i = 0; i < mealItem.length; i++) {
                let num = document.querySelector("progress-bar progress-bar-striped active col-xs-9")
                array.push(lunchItem[i].protein)
                sum += array[i]
                setMeal3Protein(sum)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        meal3ProteinSum()
    }, [lunchItem])

    async function meal3CarbsSum() {
        const array = []
        let sum = 0
        let calorieGoal = 2000
        try {
            for (let i = 0; i < lunchItem.length; i++) {
                let num = document.querySelector("progress-bar progress-bar-striped active col-xs-9")
                array.push(lunchItem[i].carbohydrates)
                sum += array[i]
                setMeal3Carbs(sum)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        meal3CarbsSum()
    }, [lunchItem])

    async function meal3FatSum() {
        const array = []
        let sum = 0
        let calorieGoal = 2000
        try {
            for (let i = 0; i < lunchItem.length; i++) {
                let num = document.querySelector("progress-bar progress-bar-striped active col-xs-9")
                array.push(lunchItem[i].fat)
                sum += array[i]
                setMeal3Fat(sum)
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        meal3FatSum()
    }, [lunchItem])

    async function average() {
        try {
            if (totalCalories > goals[0].calories) {
                setAverageRating(100)
            } else {
                setAverageRating((totalCalories / goals[0].calories) * 100)
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function averageProtein() {
        try {
            if (totalProtein > goals[0].protein) {
                setAverageProteinNum(100)
            } else {
                setAverageProteinNum((totalProtein / goals[0].protein) * 100)
            }
        } catch (err) {
            console.log(err)
        }
    }
    async function averageCarbs() {
        try {
            if (totalCarbs > goals[0].carbohydrates) {
                setAverageCarbsNum(100)
            } else {
                setAverageCarbsNum((totalCarbs / goals[0].carbohydrates) * 100)
            }
        } catch (err) {
            console.log(err)
        }
    }

    async function averageFat() {
        try {
            if (totalFat > goals[0].carbohydrates) {
                setAverageFatNum(100)
            } else {
                setAverageFatNum((totalFat / goals[0].fat) * 100)
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
                            <div id='goal-text' >Total calories consumed today: <span className='averageRating'>{totalCalories}</span></div>
                        </div>
                        <div id="progress" >
                            <div data-num={averageRating} className="progress-item">ds</div>
                        </div>
                    </div>
                    <div className='progress-box'>
                        <div>
                            <h3 id='goal-text'>Current Protein goal: <span className='averageRating'>{goals[0].protein}g</span></h3>
                            <div id='goal-text' >Total protein consumed today: <span className='averageRating'>{totalProtein}</span></div>
                        </div>
                        <div id="progress" >
                            <div data-num={averageProteinNum} className="progress-item">ds</div>
                        </div>
                    </div>
                    <div className='progress-box'>
                        <div>
                        <h3 id='goal-text'>Current Carbohydrate goal: <span className='averageRating'>{goals[0].carbohydrates}g</span></h3>
                        <div id='goal-text' >Total carbohydrates consumed today: <span className='averageRating'>{totalCarbs}</span></div>
                        </div>
                        <div id="progress" >
                            <div data-num={averageCarbsNum} className="progress-item">ds</div>
                        </div>
                    </div>
                    <div className='progress-box'>
                        <div>
                        <h3 id='goal-text'>Current Fat goal: <span className='averageRating'>{goals[0].fat}g</span></h3>
                        <div id='goal-text' >Total Fat consumed today: <span className='averageRating'>{totalFat}</span></div>
                        </div>
                        <div id="progress" >
                            <div data-num={averageFatNum} className="progress-item">ds</div>
                        </div>
                    </div>
                </div>) : (<p>loading...</p>)}
        </div>
    )

}
export default Today