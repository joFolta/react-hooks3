import React, { useState, useEffect } from "react";

// x2 optimizations in the commments

function Counter() {
  // useState runs a function (vs variable) passed as an argument only on the first render (saves memory from reading from localstorage every render)
  const initialCount = () => Number(window.localStorage.getItem("count") || 0);
  const [count, setCount] = useState(initialCount);
  const increment = () => setCount(count + 1);
  // 2nd argument as array added to useEffect so that callback function (1st arg) only runs when the item(s) in the array are changed
  // this ensures a count is set to localStorage only when Counter re-renders due to a change of count
  useEffect(() => {
    window.localStorage.setItem("count", count);
  }, [count]);
  return <button onClick={increment}>{count}</button>;
}

export default Counter;
