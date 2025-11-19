import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [inputs, setInputs] = useState({});
    const [peopleList, setPeopleList] = useState([]);

    function handleInputs(event) {
        const { name, value } = event.target;

        setInputs((prev) => ({
            ...prev,
            id: crypto.randomUUID(),
            [name]: name === "score" ? Number(value) : value,
        }));
    }

    function addPlayer() {
        setPeopleList((prevList) => [...prevList, { ...inputs }]);
        setInputs({});
    }

    useEffect(() => {
        console.log(inputs);
    }, [inputs]);

    const list = peopleList.map((person) => (
        <div className="boardRow" key={person.id}>
            <div className="nameTime">
                <p className="name">
                    {person.firstName} {person.lastName}
                </p>
                <p className="time">5/22/2021, 3:21:57 PM</p>
            </div>
            <p className="country">{person.country}</p>
            <p className="score">{person.score}</p>
            <div className="icon">
                <ion-icon name="trash-outline"></ion-icon>
            </div>
            <div className="buttonsContainer">
                <button className="increment">+5</button>
                <button className="decrement">-5</button>
            </div>
        </div>
    ));

    return (
        <div className="container">
            <h1>LEADERBOARD</h1>
            <div className="inputContainer">
                <input
                    type="text"
                    placeholder="First Name"
                    onChange={handleInputs}
                    name="firstName"
                    value={inputs.firstName || ""}
                ></input>
                <input
                    type="text"
                    placeholder="Last Name"
                    onChange={handleInputs}
                    name="lastName"
                    value={inputs.lastName || ""}
                ></input>
                <input
                    type="text"
                    placeholder="Country"
                    onChange={handleInputs}
                    name="country"
                    value={inputs.country || ""}
                ></input>
                <input
                    type="number"
                    placeholder="Player Score"
                    onChange={handleInputs}
                    name="score"
                    value={inputs.score || ""}
                    required
                ></input>
                <button className="addPlayer" onClick={addPlayer}>
                    Add Player
                </button>
            </div>
            <div className="board">{list}</div>
        </div>
    );
}

export default App;

/*

LOGIC:

Step-1 Take the inputs:
a) First Name b)Last Name c)Country d)Player Score
see if it can be done using one useState------------------------------DONE----------------------------------

Step-2) Make the add player button active by adding onClick. Take the inputs and take the array state.---------------DONE-----------

Step-3) Then work on +5 and -5

Step-4) Work on the trash icon

Step-6) Work on the sorting part

Additional fixes
1) Fix the ui of trash can on hover
2) In input fields dont show the last entered values as suggestions
3) Add the waring in inputs to fill before submission
*/
