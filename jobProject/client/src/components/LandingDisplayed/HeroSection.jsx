import React from "react";
import LandingNavbar from "./LandingNavbar";
import UserDash from "../PostedContent/UserDash";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import JobDataFront from "../PostedContent/JodDataFront";
import DummyPost from "../PostedContent/DummyPost";
import UserDummyDash from "../PostedContent/userDummyDash";

const HeroSection = () => {
  const [userData, setUserData] = useState({}); // Initialize userData state

  useEffect(() => {
    const callAboutUsPage = async () => {
      try {
        const res = await axios.get("/about", {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (res.status === 200) {
          setUserData(res.data); // Set user data to state
          console.log(res.data);
        } else {
          throw new Error(res.statusText);
        }
      } catch (err) {
        console.log(err);
      }
    };

    callAboutUsPage();
  }, [userData]); // Add an empty dependency array to run the effect only once

  return (
    <div>
      <LandingNavbar />
      <div className="p-5 md:p-10 lg:p-16 md:flex">
        <div className="md:w-1/2 md:mt-[5rem] mt-[3rem] md:pr-8">
        
          <h1 className="HeadingStyled text-4xl md:text-6xl lg:text-7xl mt-8 md:mt-0 leading-9">
            Get hired by popular teams
          </h1>
          <p className="ParaStyled mt-7 text-sm md:text-base lg:text-lg text-gray-500 font-light">
            Find jobs according to your interest. Simply click on search and
            choose a category based on your skills.
          </p>
        </div>
      </div>
   <UserDummyDash/>
    </div>
  );
};

export default HeroSection;
