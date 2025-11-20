import { useEffect, useState } from "react";
import "./App.css";
import dayjs from "dayjs";

function App() {
    const [inputs, setInputs] = useState({});
    const [peopleList, setPeopleList] = useState(
        JSON.parse(localStorage.getItem("list")) || []
    );

    function handleInputs(event) {
        const { name, value } = event.target;

        setInputs((prev) => ({
            ...prev,

            [name]: name === "score" ? Number(value) : value,
        }));
    }

    function addPlayer() {
        if (
            inputs.firstName !== undefined &&
            inputs.lastName !== undefined &&
            inputs.country !== undefined &&
            inputs.score !== undefined
        ) {
            setPeopleList((prevList) =>
                [
                    ...prevList,
                    {
                        ...inputs,
                        id: crypto.randomUUID(),
                        date: dayjs().format("M/D/YYYY, h:mm:ss A"),
                    },
                ].sort((a, b) => b.score - a.score)
            );
            setInputs({});
        }
    }

    function increment(id) {
        setPeopleList((prevList) =>
            prevList
                .map((person) =>
                    person.id === id
                        ? { ...person, score: person.score + 5 }
                        : person
                )
                .sort((a, b) => b.score - a.score)
        );
    }

    function decrement(id) {
        setPeopleList((prevList) =>
            prevList
                .map((person) =>
                    person.id === id
                        ? { ...person, score: person.score - 5 }
                        : person
                )
                .sort((a, b) => b.score - a.score)
        );
    }

    function deletePerson(id) {
        setPeopleList((prevList) =>
            prevList.filter((person) => person.id !== id)
        ).sort((a, b) => b.score - a.score);
    }

    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(peopleList));
    }, [peopleList]);

    const list = peopleList.map((person) => (
        <div className="boardRow" key={person.id}>
            <div className="nameTime">
                <p className="name">
                    {person.firstName} {person.lastName}
                </p>
                <p className="time">{person.date}</p>
            </div>
            <p className="country">{person.country}</p>
            <p className="score">{person.score}</p>
            <div className="icon">
                <ion-icon
                    name="trash-outline"
                    onClick={() => {
                        deletePerson(person.id);
                    }}
                ></ion-icon>
            </div>
            <div className="buttonsContainer">
                <button
                    className="increment"
                    onClick={() => {
                        increment(person.id);
                    }}
                >
                    +5
                </button>
                <button
                    className="decrement"
                    onClick={() => {
                        decrement(person.id);
                    }}
                >
                    -5
                </button>
            </div>
        </div>
    ));

    return (
        <div className="container">
            <h1>LEADERBOARD</h1>
            <form
                className="inputContainer"
                action=""
                onSubmit={addPlayer}
                autoComplete="off"
            >
                <input
                    type="text"
                    placeholder="First Name"
                    onChange={handleInputs}
                    name="firstName"
                    value={inputs.firstName || ""}
                    autoComplete="off"
                    required
                ></input>
                <input
                    type="text"
                    placeholder="Last Name"
                    onChange={handleInputs}
                    name="lastName"
                    value={inputs.lastName || ""}
                    autoComplete="off"
                    required
                ></input>
                <input
                    type="text"
                    placeholder="Country"
                    onChange={handleInputs}
                    name="country"
                    value={inputs.country || ""}
                    autoComplete="off"
                    required
                ></input>
                <input
                    type="number"
                    placeholder="Player Score"
                    onChange={handleInputs}
                    name="score"
                    value={inputs.score || ""}
                    autoComplete="off"
                    required
                ></input>
                <button className="addPlayer" type="submit">
                    Add Player
                </button>
            </form>
            <div className="board">{list}</div>
        </div>
    );
}

export default App;
