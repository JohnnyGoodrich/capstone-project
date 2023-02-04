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



function Main() {
    let pageNumber = 1
    const [toggleState, setToggleState] = useState(3);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    const setClick = (page) => {
        toggleTab(page)
        pageNumber = page
        console.log(page)
    }
    console.log(pageNumber)
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
                <Progress/>

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