import React from "react";
import { menu_list } from "../../assets/assets";
import "./ExploreMenu.css";

function ExploreMenu({ category, setCategory }) {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Discover a seamless dining experience with our food order website, where
        you can explore and order your favorite dishes from local restaurants
        with just a few clicks. Enjoy fast delivery and a variety of cuisines
        right at your doorstep.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((menu, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === menu.menu_name ? "All" : menu.menu_name
                )
              }
              key={index}
              className="explore-menu-list-items"
            >
              <img
                className={category === menu.menu_name ? "active" : " "}
                src={menu.menu_image}
                alt=""
              />
              <p>{menu.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
