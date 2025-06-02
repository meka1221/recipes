import React from "react";
import AboutUs1 from "../assets/images/aboutUs1.svg";
import AboutUs2 from "../assets/images/aboutUs2.svg";
import Img from "../assets/images/about7.jpg";
import { useLocation } from "react-router-dom";
import Img2 from "../assets/images/about11.avif";

const About = () => {
  const { pathname } = useLocation();

  return (
    <div id="about">
      {pathname !== "/" && (
        <div className="about__bg">
          <img src={Img2} className="about__bg--img" alt="img" />
          <h1 className="about__bg--title">
            Добро пожаловать в наш <br /> кулинарный уголок!
          </h1>
        </div>
      )}
      <div className="container">
        <div className="about">
          <div className="about__content">
            <div className="about__content--img">
              <img src={Img} alt="img" />
            </div>
            <div className="about__content--title">
              <h2>🍽️ Кто мы такие?</h2>
              <h1>
                Наша цель — вдохновлять
                <br />
                вас готовить вкусно и с любовью
              </h1>
              <p>
                Здесь мы делимся вкусными, простыми и вдохновляющими рецептами
                для каждого дня.
                <br />
                Наша цель — помочь вам готовить с удовольствием, <br />
                открывать новые вкусы и делать каждое блюдо особенным.
              </p>
              <div className="about__content--title__card">
                <div className="about__content--title__card--img">
                  <img src={AboutUs1} alt="" />
                </div>
                <div className="about__content--title__card--text">
                  <h3>Натуральные ингредиенты</h3>
                  <span>
                    Мы верим, что вкус начинается с качества.
                    <br />
                    Все наши рецепты основаны на простых и доступных продуктах.
                  </span>
                </div>
              </div>
              <div className="about__content--title__card">
                <div className="about__content--title__card--img">
                  <img src={AboutUs2} alt="" />
                </div>
                <div className="about__content--title__card--text">
                  <h3>Пошаговые инструкции</h3>
                  <span>
                    Здесь мы делимся пошаговыми инструкциями, чтобы вы могли
                    легко следовать рецептам и готовить с удовольствием.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
