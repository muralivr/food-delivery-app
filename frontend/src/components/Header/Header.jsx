import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order Your Favoruite Food Here!!!</h2>
        <p>
          Discover a seamless dining experience with our food order website,
          where you can explore and order your favorite dishes from local
          restaurants with just a few clicks. Enjoy fast delivery and a variety
          of cuisines right at your doorstep.
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
}

export default Header;
