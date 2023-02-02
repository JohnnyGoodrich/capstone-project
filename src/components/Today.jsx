import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../style/Today.css'


function Today() {
    const [averageRating, setAverageRating] = useState(0)
    const [averageProteinNum, setAverageProteinNum] = useState(0)
    const [averageCarbsNum, setAverageCarbsNum] = useState(0)
    const [averageFatNum, setAverageFatNum] = useState(0)
    const [mealItem, setMealItem] = useState(null)
    const mealURL = `http://localhost:4000/meal/63d98149c8ac5f0cc6197613`

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
        }, 15);
    });

    async function average() {
        const array = []
        let sum = 0
        let calorieGoal = 2000
        try {
            for (let i = 0; i < mealItem.length; i++) {
                let num = sum / calorieGoal
                array.push(mealItem[i].calories)
                sum += array[i]
                console.log(mealItem[i].calories)
                console.log((sum / calorieGoal) * 100)

            }
            setAverageRating((sum / calorieGoal) * 100)
        } catch (err) {
            console.log(err)
        }
    }
    async function averageProtein() {
        const array = []
        let sum = 0
        let proteinGoal = 150
        try {
            for (let i = 0; i < mealItem.length; i++) {
                let num = sum / proteinGoal
                array.push(mealItem[i].protein)
                sum += array[i]
                console.log(mealItem[i].protein)
                console.log((sum / proteinGoal) * 100)

            }
            setAverageProteinNum((sum / proteinGoal) * 100)
        } catch (err) {
            console.log(err)
        }
    }
    async function averageCarbs() {
        const array = []
        let sum = 0
        let carbsGoal = 1000
        try {
            for (let i = 0; i < mealItem.length; i++) {
                let num = sum / carbsGoal
                array.push(mealItem[i].carbohydrates)
                sum += array[i]
                console.log(mealItem[i].carbohydrates)
                console.log((sum / carbsGoal) * 100)

            }
            setAverageCarbsNum((sum / carbsGoal) * 100)
        } catch (err) {
            console.log(err)
        }
    }
    async function averageFat() {
        const array = []
        let sum = 0
        let fatGoal = 200
        try {
            for (let i = 0; i < mealItem.length; i++) {
                let num = sum / fatGoal
                array.push(mealItem[i].fat)
                sum += array[i]
                console.log(mealItem[i].fat)
                console.log((sum / fatGoal) * 100)

            }
            setAverageFatNum((sum / fatGoal) * 100)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className='container1'>
                <h1>Calories</h1>
                <div id="progress" >
                    <div data-num={averageRating} className="progress-item">ds</div>
                </div>
                <h1>Protein</h1>
                <div id="progress" >
                    <div data-num={averageProteinNum} className="progress-item">ds</div>
                </div>
                <h1>Carbs</h1>
                <div id="progress" >
                    <div data-num={averageCarbsNum} className="progress-item">ds</div>
                </div>
                <h1>Fat</h1>
                <div id="progress" >
                    <div data-num={averageFatNum} className="progress-item">ds</div>
                </div>
            </div>
        </div>
    )

}
export default Today