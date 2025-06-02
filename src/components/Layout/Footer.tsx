import React from "react";
import logo from "../../assets/images/logo.png";
import Img from "../../assets/images/footerForm.png";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer">
          <div className="footer__form">
            <img src={Img} alt="" />
            <div className="footer__form--card">
              <h1>
                Subscribe to <br />
                our Newsletter
              </h1>
              <div className="footer__form--card__input">
                <input type="text" placeholder="Your Email Address" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>
          <div className="footer__top">
            <div className="footer__top--left">
              <h1>Contact Us</h1>
              <div className="footer__top--left__text">
                <h2>Email</h2>
                <h3>needhelp@Organia.com</h3>
              </div>
              <div className="footer__top--left__text">
                <h2>Phone</h2>
                <h3>+996798989889</h3>
              </div>
              <div className="footer__top--left__text">
                <h2>Address</h2>
                <h3>88 road, borklyn street, USA</h3>
              </div>
            </div>
            <div className="footer__top--line"></div>
            <div className="footer__top--center">
              <div className="footer__top--center__logo">
                <img src={logo} alt="logo" />
                <h1>FoodVibe</h1>
              </div>
              <p>
                Simply dummy text of the printing and typesetting industry.{" "}
                <br />
                Lorem Ipsum simply dummy text of the printing{" "}
              </p>
              <div className="footer__top--center__icons">
                <a href="#">
                  <FaInstagram />
                </a>
                <a href="#">
                  <FaFacebook />
                </a>
                <a href="#">
                  <FaTwitter />
                </a>
                <a href="#">
                  <FaPinterest />
                </a>
              </div>
            </div>
            <div className="footer__top--line"></div>
            <div className="footer__top--right">
              <h1>Utility Pages</h1>
              <h2>Style Guide</h2>
              <h2>404 Not Found</h2> <h2>Password Protected</h2>
              <h2>Licences</h2> <h2>Changelog</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <h2>Copyright © Foodvibe</h2>
      </div>
    </footer>
  );
};

export default Footer;
