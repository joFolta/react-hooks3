import React, { useState, Suspense } from "react";
// React.lazy (needs Suspense ^)
// We give Suspense a fallback prop <Suspense fallback={<div>loading...</div>}>

// import Tilt from "./Tilt";
const Tilt = React.lazy(() => import("./Tilt"));

function useToggle(init = false) {
  const [on, setOn] = useState(init);
  const toggle = () => setOn(!on);
  return [on, toggle];
}

function App() {
  const [showTilt, toggleTilt] = useToggle();
  return (
    <div>
      <label>
        show tilt
        <input type="checkbox" checked={showTilt} onChange={toggleTilt}></input>
      </label>

      <div className="totally-centered">
        {showTilt ? (
          <Suspense fallback={<div className="white">loading...</div>}>
            <Tilt>
              <div className="totally-centered">vanilla-tilt</div>
            </Tilt>
          </Suspense>
        ) : null}
      </div>
    </div>
  );
}

export default App;
