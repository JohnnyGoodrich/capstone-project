import { useState } from "react";
import '../App.css'
import Search from "./Search";
import myFunction from "./SearchBar";
import { Link } from 'react-router-dom'
import Today from "./Today";
import Popup from 'reactjs-popup';
import React from "react";
import Modal from "./Popup";
import Progress from "./Progress";
import { getUserToken, setUserToken, clearUserToken, decodeToken } from "../utils/authToken"
import { useParams, useNavigate } from 'react-router-dom'
import LoginForm from "./LoginForm"
import { useContext } from "react"
import { UserContext } from "../data"


function Main() {
    const {setAuth, setUser} = useContext(UserContext)
    const token = getUserToken()
    const navigate = useNavigate()

    function logout() {
        clearUserToken();
        navigate('/')
    }

    let pageNumber = 1
    const [toggleState, setToggleState] = useState(2);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    const setClick = (page) => {
        toggleTab(page)
        pageNumber = page
        console.log(page)
    }
    console.log(pageNumber)

    const loginUser = async (data) => {
        try {
            const configs = {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
            const response = await fetch(
                "https://capstone-nutrition-app.herokuapp.com/auth/login",
                configs
            )
    
            const currentUser = await response.json()
            if (currentUser.token) {
                setUserToken(currentUser.token)
                setUser(currentUser.user)
                setAuth(currentUser.isLoggedIn)
    
                return currentUser
            } else {
                throw `Server Error: ${currentUser.statusText}`
            }
        } catch (err) {
            console.log(err)
            console.log(UserContext)
            clearUserToken();
            setAuth(false);
        }
    }
    
    return (
        <div className="container1">
            <div className="bloc-tabs">
                <button
                    className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                    onClick={() => setClick(1)}
                >
                    Home
                </button>
                <button
                    className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                    onClick={() => setClick(2)}
                >
                    Today's Progress
                </button>
                <button
                    className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                    onClick={() => setClick(3)}
                >
                    Input Food
                </button>
            </div>

            <div className="content-tabs">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>
                {/* <Progress/> */}
                {token ?
                    <div className='avatar-logout-button'>
                        <img src="https://img.freepik.com/premium-vector/cute-avocado-chef-cartoon_138676-2984.jpg?w=2000" id="avatar-image" />
                        <div className='button-box'>
                            <button type="button" onClick={logout} className='btn btn-outline-warning'>Logout</button>
                        </div>
                    </div> : <a id="login-box" href="/auth">LOGIN|SIGN-UP</a>}
                    {/* <LoginForm signIn={loginUser}/> */}
                    
                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                
                    <Today />

                </div>

                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                    
                    <Search />
                   
                </div>
            </div>
        </div>
    );
}

export default Main;