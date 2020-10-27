import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "./Footer";
import Header from "./Header";
import PrincipalSection from "./PrincipalSection";
import SecundarySection from "./SecundarySection";
import axios from "axios";
import Spinner from "./Spinner";

const Layout = () => {
  const [teams, setTeams] = useState({});
  const [isDataLoad, setDataLoad] = useState(false);

  const callTeams = async () => {
    let response = await axios.get("http://localhost:5001/teams");
    setTeams(response.data.teams);
    setDataLoad(true);
  };

  useEffect(() => {
    callTeams();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
        {isDataLoad ? <PrincipalSection teams={teams} /> : <Spinner />}
        {isDataLoad ? <SecundarySection teams={teams} /> : <Spinner />}
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
