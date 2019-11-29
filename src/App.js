import React, { useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

function Tilt(props) {
  const tiltRef = useRef();
  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5
    });
    // cleanup fx for unmount
    return () => tiltRef.current.VanillaTilt.destroy();
    // onmount (useEffect only runs on mount; AKA no dependencies)
  }, []);
  return (
    <div ref={tiltRef} className="tilt-root">
      <div className="tilt-child">{props.children}</div>
    </div>
  );
}

function App() {
  return (
    <div className="totally-centered">
      <Tilt>
        <div className="totally-centered">vanilla-tilt</div>
      </Tilt>
    </div>
  );
}

export default App;
