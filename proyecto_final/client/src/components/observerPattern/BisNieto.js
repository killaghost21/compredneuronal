import React from "react";

const BisNieto = () => {
  
  const handleClick = () => {
    console.log("click Bisnieto");
  };

  return (
    <div className="BisNieto">
      <p>BisNieto</p>
      <button onClick={handleClick}>click</button>
    </div>
  );
};

export default BisNieto;
