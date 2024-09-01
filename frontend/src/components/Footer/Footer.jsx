import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.app_logo} alt="" />
          <p>
            Discover a seamless dining experience with our food order website,
            where you can explore and order your favorite dishes from local
            restaurants with just a few clicks. Enjoy fast delivery and a
            variety of cuisines right at your doorstep.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 8660013727</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copy 2024 Tomator.com - All Rights Reserved
      </p>
    </div>
  );
}

export default Footer;
