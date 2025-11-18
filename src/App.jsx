import './App.css'

function App() {

  return (
    <div className="container">
      <h1>LEADERBOARD</h1>
      <div className="inputContainer">
        <input type="text" placeholder='First Name' ></input>
        <input type="text" placeholder='Last Name' ></input>
        <input type="text" placeholder='Country' ></input>
        <input type="number" placeholder='Player Score' ></input>
        <button className="addPlayer">Add Player</button>
      </div>
      <div className="board">
        <div className="boardRow">
          <div className="nameTime">
            <p>Laxmi Sharma</p>
            <p>5/22/2021, 3:21:57 PM</p>
          </div>
          <p className="country">India</p>
          <p className="score">115</p>
          <ion-icon name="trash-outline"></ion-icon>
          <button className="increment">+5</button>
          <button className="decrement">-5</button>
        </div>
      </div>
    </div>
  )
}

export default App
