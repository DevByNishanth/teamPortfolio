import React from "react";
import Hero from "./components/Hero";
import Aboutus from "./components/Aboutus";
import MyTeam from "./components/MyTeam";
import Ourservices from "./components/Ourservices";
import Footer from "./components/Footer";
import Projects from "./components/Projects";

const App = () => {
  return (
    <>
      <Hero />
      <Aboutus />
      <Projects/>
      <MyTeam/>
      <Ourservices/>
      <Footer/>
    </>
  );
};

export default App;
