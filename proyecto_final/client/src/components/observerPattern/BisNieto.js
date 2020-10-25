import React, { useState, useEffect } from "react";
import PubSub from "pubsub-js";

const BisNieto = () => {
  const [count, setcount] = useState(0);

  const handleClick = () => {
    console.log("click contador Bisnieto");
    setcount(count + 1);
  };

  //did update
  useEffect(() => {
    PubSub.publish("contador", count);
  });

  return (
    <div className="BisNieto">
      <p>BisNieto</p>
      <button onClick={handleClick}>click</button>
      <hr />
      <span>{count}</span>
    </div>
  );
};

export default BisNieto;
