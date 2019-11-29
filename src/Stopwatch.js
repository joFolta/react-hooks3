import React, { useState, useRef, useEffect } from "react";

function Stopwatch() {
  const [lapse, setLapse] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    // clear setInterval on unmount (otherwise it'd keep running even after unmount)
    return () => clearInterval(intervalRef.current); // cleanup f(x)
  }, []);

  function handleRunClick() {
    if (running) {
      clearInterval(intervalRef.current);
    } else {
      const startTime = msToSec(Date.now()) - lapse;
      // keep track of interval ID with useRef, so that we can clearInterval (on Stop, Clear, or unMount)
      intervalRef.current = setInterval(() => {
        setLapse(roundToTenth(msToSec(Date.now()) - startTime));
      }, 0); // setInterval being called as frequently as it possibly can
    }
    setRunning(!running);
  }

  function handleClearClick() {
    clearInterval(intervalRef.current);
    setLapse(0);
    setRunning(false);
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
