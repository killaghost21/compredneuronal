import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { globalContext } from "./components/Context";
import "./App.css"

const App = () => {
  const [state, setState] = useState({ selector: {} });

  useEffect(() => {
    console.log("globalState: ",state);
  });
  return (
    <globalContext.Provider value={{ state, setState }}>
      <div className="layout">
        <Layout />
      </div>
    </globalContext.Provider>
  );
};

export default App;
