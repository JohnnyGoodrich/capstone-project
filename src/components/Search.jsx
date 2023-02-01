import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { BsSearch } from "react-icons/bs"
import '../style/Search.css'

const Search = (props) => {
    const [searchValue, setSearchValue] = useState('')
    const [movies, setMovies] = useState('')
    const [food, setFood] = useState(null)
    const [mealItem, setMealItem] = useState(null)
    const [meal, setMeal] = useState(null)
    const params = useParams()
    const { id } = params

    const BASE_URL = `https://movie-backend-project3.herokuapp.com/movie`
    const URL = "http://localhost:4000/food"
    const mealURL = `http://localhost:4000/meal/63d98149c8ac5f0cc6197613`
    const URL2 = `http://localhost:4000/food/${id}`

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
    }, [])


    const onChange = (event) => {
        setSearchValue(event.target.value)
    }
    const onSearch = (searchItem) => {
        setSearchValue(searchItem)
    }

    
    const addItem = async(item)=>{
        let itemObject = new Object()
        for(let i =0; i<food.length; i++){
            console.log(food[i].name.length)
            console.log(item.length)

            if (food[i].name === item){
                itemObject = food[i] 

            }
        }
        console.log(itemObject)
        mealItem.push(itemObject) 
        console.log(mealItem)

    }
    // async function addItem(){
    //     console
    // }

    const deleteItem = async()=>{
        mealItem.pop(food[2]) 

    }

    return (
        <div className="search-context">
            <div className='search-context2'>
                <div className="search-context-inner">
                    <p id="look-up-symbol">{<BsSearch />}</p>
                    <input type="text" value={searchValue} onChange={onChange} id="search" autoComplete="off" placeholder="Search foods..." />
                    <Link style={{ textDecoration: 'none' }} to={`/details/${searchValue}`}>
                        <button onClick={() => <Link to={`/details/${searchValue}`}></Link>} id="search-submit">Search</button>
                    </Link>
                </div>
                <div className="drop-down-list">
                    {Object.values(movies).filter((movie) => {
                        const searchItem = searchValue.toLowerCase()
                        const movieTitle = movie.title.toLowerCase()
                        return (searchItem && movieTitle.startsWith(searchItem) && movieTitle !== searchItem)
                    })
                        .slice(0, 8)
                        .map((movie, idx) => (
                            <div onClick={() => onSearch(movie)} className="drop-down-row" key={idx}>
                                <Link style={{ textDecoration: 'none' }} key={movie._id} to={`/review/${movie._id}`}>
                                    <div className='drop-down-info'>
                                        <img id="search-image" style={{ borderRadius: '10px' }} src={movie.image} alt="" />
                                        <div>
                                            <div id="search-title" style={{ textDecoration: 'none' }}>{movie.title}</div>
                                            <p className='movie-info-search'><span className='age-rating'>{movie.agerating}</span>&nbsp; {movie.year}, {movie.hlength}h{movie.mlength}m</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
                    <button >Add</button>
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
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (<p> No meals to show </p>)}
            </div>
            <Link style={{ textDecoration: 'none' }} to={`/newfood`}>
                <button>Add New Food</button>
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
                                            <button key={index} onClick={()=> addItem(foods.name)}>Add</button>
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