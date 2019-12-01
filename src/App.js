import React, { useState } from "react";
import Tilt from "./Tilt";

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
          <Tilt>
            <div className="totally-centered">vanilla-tilt</div>
          </Tilt>
        ) : null}
      </div>
    </div>
  );
}

export default App;
