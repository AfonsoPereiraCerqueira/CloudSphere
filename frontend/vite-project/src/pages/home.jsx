import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import Workflow from "../components/Workflow";
import Pricing from "../components/Pricing";
import Footer from "../components/footer";

const Home = () => {
  return (
    <>
      <div>
        <HeroSection />
        <FeaturesSection />
        <Workflow />
        <Pricing />
        <Footer />
      </div>
    </>
  );
};

export default Home;
