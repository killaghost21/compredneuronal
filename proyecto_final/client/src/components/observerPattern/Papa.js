import React, { useState, useEffect } from "react";
import Hijo from "./Hijo";
import "./App.css";
import PubSub from "pubsub-js";

const Papa = () => {
  const [count, setCount] = useState(0);

  //did Mount
  useEffect(() => {
    PubSub.subscribe("contador", (e, data) => {
      setCount(data);
    });
  }, []);

  return (
    <div className="Papa">
      <h2>Observer Pattern PubSub</h2>
      <p>papa</p>
      <p>count BisNieto: {count}</p>
      <Hijo />
    </div>
  );
};

export default Papa;
