import React from "react";
import Layout from "./components/Layout";
import PapaObserverPattern from "./components/observerPattern/Papa";
import PapaContextApi from "./components/contextApi/Papa";

const App = () => {
  return (
    <div>
      {/* <Layout /> */}
      <PapaObserverPattern />
      <PapaContextApi />
    </div>
  );
};

export default App;
