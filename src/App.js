import React, { useState } from "react";

// wrapping function with React.memo prevents unnecessary rerenders
const Upper = React.memo(function Upper({ children }) {
  const [count, setCount] = useState(0);
  console.log("rendering", children);
  const upper = children.toUpperCase();
  return (
    <div>
      <span>Uppercase version: {upper} </span>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
});

function App() {
  const [first, setFirstName] = useState("");
  const [last, setLastName] = useState("");
  return (
    <div>
      <label htmlFor="first-name-input">First Name</label>
      <input
        id="first-name-input"
        onChange={e => setFirstName(e.target.value)}
      ></input>
      <Upper>{first}</Upper>

      <hr />

      <label htmlFor="last-name-input">Last Name</label>
      <input
        id="last-name-input"
        onChange={e => setLastName(e.target.value)}
      ></input>
      <Upper>{last}</Upper>
    </div>
  );
}

export default App;
