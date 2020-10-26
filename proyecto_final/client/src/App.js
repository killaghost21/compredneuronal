import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { globalContext } from "./components/Context";
import "./App.css";
import Spinner from "./components/Spinner";

const App = () => {
  const [state, setState] = useState({ selector: {}, spinner: false });

  useEffect(() => {
    console.log("globalState: ", state);
  });
  return (
    <globalContext.Provider value={{ state, setState }}>
      <div className="layout">
        <Layout />
        {state.spinner && <Spinner show={state.spinner} />}
      </div>
    </globalContext.Provider>
  );
};

export default App;
