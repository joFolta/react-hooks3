import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import createActivityDetector from "activity-detector";

// useIdle - Custom Hook
function useIdle(options) {
  const [isIdle, setIsIdle] = React.useState(false);
  React.useEffect(() => {
    const activityDetector = createActivityDetector(options);
    activityDetector.on("idle", () => setIsIdle(true));
    activityDetector.on("active", () => setIsIdle(false));
    return () => activityDetector.stop(); // cleanup function (to avoid memory leaks)
  }, []); // empty array, so it only runs onMount of component, rather than every re-render
  return isIdle;
}

function App() {
  const isIdle = useIdle({ timeToIdle: 1000 }); // options: idle after 1 sec
  return <div>{isIdle ? "Are you still there?" : "Hello there!"}</div>;
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
