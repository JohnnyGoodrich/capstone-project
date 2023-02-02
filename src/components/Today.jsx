import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../style/Today.css'


function Today() {
    const [averageRating, setAverageRating] = useState(0)
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

    let items = document.querySelectorAll('.progress-item');
    const counters = Array(items.length);
    const intervals = Array(items.length);
    counters.fill(0);
    items.forEach((number,index) => {
      intervals[index] = setInterval(() => {
              if(counters[index] == parseInt(number.dataset.num)){
                  clearInterval(intervals[index]);
              }else{
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
                let num = sum/calorieGoal
                array.push(mealItem[i].calories)
                sum += array[i]
                console.log(mealItem[i].calories)
                console.log((sum/calorieGoal)*100)

            }
            setAverageRating((sum/calorieGoal)*100 )
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='container1'>
            <div id="progress" >
                <div data-num={averageRating} className="progress-item">ds</div>
            </div>
        </div>
    )
}
export default Today