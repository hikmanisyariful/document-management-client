import React from "react";
import backgroundStyle from "./Background.module.css";

export default function Background(props: { children: React.ReactNode }) {
  return (
    <div className={backgroundStyle.appContainer}>
      <div className={backgroundStyle.backgroundCover}>
        <div className={backgroundStyle.cover}>
          <h1>
            <span>Lorem ipsum dolor si amet</span> consectetur
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
      {props.children}
    </div>
  );
}
