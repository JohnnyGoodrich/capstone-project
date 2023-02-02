import { useState } from "react";
import '../App.css'
import Search from "./Search";
import myFunction from "./SearchBar";
import { Link } from 'react-router-dom'
import Today from "./Today";

function Main() {
    let pageNumber = 1
    const [toggleState, setToggleState] = useState(3);

    const toggleTab = (index) => {
        setToggleState(index);
    };
    const setClick = (page)=>{
        toggleTab(page)
        pageNumber=page
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
                    <h2>Content 1</h2>
                    <hr />
                    {/* <p>
                    Content
                    </p> */}
                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                    <Today/>
                    {/* <p>
                      Content
                    </p> */}
                </div>

                <div className={toggleState === 3 ? "content  active-content" : "content"}>
                    <Search/>
                    {/* <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name"></input>
                    <ul id="myUL">
                    </ul> */}
                </div>
            </div>
        </div>
    );
}

export default Main;