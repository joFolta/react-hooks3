import React, { useReducer, useRef, useEffect } from "react";

function reducer(currentState, newState) {
  return { ...currentState, ...newState };
}

function useStopWatch() {
  const [{ running, lapse }, setState] = useReducer(reducer, {
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
        setState({ lapse: roundToTenth(msToSec(Date.now()) - startTime) });
      }, 0);
    }
    setState({ running: !running });
  }

  function handleClearClick() {
    clearInterval(intervalRef.current);
    setState({ lapse: 0, running: false });
  }

  return { lapse, running, handleRunClick, handleClearClick };
}

function Stopwatch() {
  const stopwatchOne = useStopWatch();
  const stopwatchTwo = useStopWatch();

  return (
    <div>
      <label style={{ fontSize: "5em", display: "block" }}>
        {stopwatchOne.lapse} secs
      </label>
      <button onClick={stopwatchOne.handleRunClick} style={buttonStyles}>
        {stopwatchOne.running ? "Stop" : "Start"}
      </button>
      <button onClick={stopwatchOne.handleClearClick} style={buttonStyles}>
        Clear
      </button>

      <hr />
      <strong>Lapse Difference: </strong>
      <span>{stopwatchOne.lapse - stopwatchTwo.lapse} secs</span>
      <hr />

      <label style={{ fontSize: "5em", display: "block" }}>
        {stopwatchTwo.lapse} secs
      </label>
      <button onClick={stopwatchTwo.handleRunClick} style={buttonStyles}>
        {stopwatchTwo.running ? "Stop" : "Start"}
      </button>
      <button onClick={stopwatchTwo.handleClearClick} style={buttonStyles}>
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
