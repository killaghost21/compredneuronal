import React, { useState, useEffect } from "react";
import Hijo from "./Hijo";
import "./App.css";

const Papa = () => {
  const [count, setCount] = useState(0);

  //did Mount
  useEffect(() => {}, []);

  return (
    <div className="Papa">
      <h2>Context API PubSub</h2>
      <p>papa</p>
      <p>count BisNieto: {count}</p>
      <Hijo />
    </div>
  );
};

export default Papa;
