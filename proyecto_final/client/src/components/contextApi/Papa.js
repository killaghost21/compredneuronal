import React, { useState, useEffect } from "react";
import Hijo from "./Hijo";
import "./App.css";
import { xyzContext } from "./Context";

const Papa = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    console.log("click contador Padre");
    setCount(count + 1);
  };

  //did Mount
  useEffect(() => {}, []);

  return (
    <xyzContext.Provider value={{ count, setCount }}>
      <div className="Papa">
        <h2>Context API PubSub</h2>
        <p>papa</p>
        <p>
          <button onClick={handleClick}>click</button>
        </p>
        <p>count BisNieto: {count}</p>
        <Hijo />
      </div>
    </xyzContext.Provider>
  );
};

export default Papa;
