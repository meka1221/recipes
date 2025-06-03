import React, { useEffect } from "react";
import VideoBg from "../assets/video/main.mp4";
import { FaArrowCircleRight } from "react-icons/fa";
import "./HomeWelcome.scss";
import axios from "axios";

const HomeWelcome = () => {
  // const fetchData = async () => {
  //   const { data } = await axios.get("http://51.20.52.136/ru");
  //   console.log(data);
  // };
  // useEffect(() => {
  //   fetchData();
  // }, []);
  return (
    <section id="homeWelcome">
      <video className="homeWelcome__video" autoPlay muted loop playsInline>
        <source src={VideoBg} type="video/mp4" />
      </video>

      <div className="container">
        <div className="homeWelcome">
          <div className="homeWelcome__title">
            <h2>100% Natural Food</h2>
            <h1>
              Ищи, сохраняй
              <br /> и делись любимыми <br /> рецептами
            </h1>
            <button>
              Исследовать
              <FaArrowCircleRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeWelcome;
