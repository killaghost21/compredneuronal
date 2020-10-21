import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Footer from "./Footer";
import Header from "./Header";
import PrincipalSection from "./PrincipalSection";
import SecundarySection from "./SecundarySection";
import axios from "axios";

const Layout = () => {
  const [teams, setTeams] = useState({});
  const [isDataLoad, setDataLoad] = useState(false);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://rapidapi.p.rapidapi.com/teams",
      params: { page: "0" },
      headers: {
        "x-rapidapi-host": "free-nba.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      },
    };
    if (localStorage.getItem("teams")) {
      setTeams(JSON.parse(localStorage.getItem("teams")));
      setDataLoad(true);
    } else {
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          setTeams(response.data);
          localStorage.setItem("teams", JSON.stringify(response.data));
          setDataLoad(true);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <main>
        {isDataLoad ? <PrincipalSection teams={teams.data} /> : "loading"}
        {isDataLoad ? <SecundarySection teams={teams.data} /> : "loading"}
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
