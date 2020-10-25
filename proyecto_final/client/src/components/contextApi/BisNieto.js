import React, { useState, useEffect, useContext } from "react";
import { xyzContext } from "./Context";

const BisNieto = () => {
  const context = useContext(xyzContext);

  const handleClick = () => {
    console.log("click contador Bisnieto");
    context.setCount(context.count + 1);
  };

  //did update
  useEffect(() => {});

  return (
    <div className="BisNieto">
      <p>BisNieto</p>
      <button onClick={handleClick}>click</button>
      <hr />
      <span>{context.count}</span>
    </div>
  );
};

export default BisNieto;
