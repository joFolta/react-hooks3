import React, { useReducer, useRef, useEffect } from "react";

// useReducer
//   -reduces useState usage;
//   -you don't need multiple instances of useState for every item of the component
//   -An alternative to useState.
//   -useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values. It also lets you optimize performance for components that trigger deep updates
//    because you can pass >dispatch< down instead of callbacks.

function reducer(state, action) {
  switch (action.type) {
    case "LAPSE":
      return {
        ...state,
        lapse: roundToTenth(action.now - action.startTime)
      };
    case "TOGGLE_RUNNING":
      return {
        ...state,
        running: !state.running
      };
    case "CLEAR":
      return {
        ...state,
        lapse: 0,
        running: false
      };
    default:
      return state;
  }
}

function Stopwatch() {
  const [{ running, lapse }, dispatch] = useReducer(reducer, {
    running: false,
    lapse: 0
  });
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current); // cleanup f(x)
  }, []);

  function handleRunClick() {
    if (running) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = msToSec(Date.now()) - lapse;
      intervalRef.current = setInterval(() => {
        // setLapse(roundToTenth(msToSec(Date.now()) - startTime));
        dispatch({
          type: "LAPSE",
          now: msToSec(Date.now()),
          startTime
        });
      }, 0);
    }
    // setRunning(!running);
    dispatch({ type: "TOGGLE_RUNNING" });
  }

  function handleClearClick() {
    clearInterval(intervalRef.current);
    // setLapse(0)
    // setRunning(false);
    dispatch({ type: "CLEAR" });
  }

  return (
    <div>
      <label style={{ fontSize: "5em", display: "block" }}>{lapse} secs</label>
      <button onClick={handleRunClick} style={buttonStyles}>
        {running ? "Stop" : "Start"}
      </button>
      <button onClick={handleClearClick} style={buttonStyles}>
        Clear
      </button>
    </div>
  );
}

const buttonStyles = {
  display: "block",
  border: "1px solid #ccc",
  background: "#fff",
  fontSize: "2em",
  padding: 15,
  margin: 5,
  width: 200
};

function roundToTenth(num) {
  return parseFloat(Math.round(num * 100) / 100).toFixed(1);
}

function msToSec(ms) {
  return ms / 1000;
}

export default Stopwatch;
