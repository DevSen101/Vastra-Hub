import React from "react";
import "./custom-button.styles.scss";

const CustomButton = ({ children, ...otheraProps }) => (
  <button className="custom-button" {...otheraProps}>
    {children}
  </button>
);

export default CustomButton;