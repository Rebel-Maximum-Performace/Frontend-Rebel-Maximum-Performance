import React from "react";
import PropTypes from "prop-types";

const Button = ({
  state,
  variant,
  color,
  iconLeft,
  iconRight,
  children,
  onClick,
  className,
}) => {
  const isOutlined = variant == "outlined";
  const isDisabled = state == "disabled";

  const mappingBackgroundBorderColor = () => {
    switch (color) {
      case "primary":
        return isDisabled && isOutlined
          ? "text-primary-10 border-2 border-primary-10"
          : isOutlined
          ? "text-primary-50 border-2 border-primary-50 hover:bg-primary-50 hover:text-netral-10 hover:shadow-lg hover:shadow-primary-50/50"
          : isDisabled
          ? "bg-primary-70 text-netral-40"
          : "bg-primary-50 text-netral-10 hover:bg-primary-60 shadow-lg shadow-primary-50/50";
      case "secondary":
        return isDisabled && isOutlined
          ? "text-secondary-10 border-2 border-secondary-10"
          : isOutlined
          ? "text-secondary-50 border-2 border-secondary-50 hover:bg-secondary-50 hover:text-netral-90 hover:shadow-lg hover:shadow-netral-90/30"
          : isDisabled
          ? "bg-secondary-70 text-netral-70"
          : "bg-secondary-50 text-netral-90 hover:bg-secondary-60 shadow-lg shadow-netral-90/30";
      case "third":
        return isDisabled && isOutlined
          ? "text-third-10 border-2 border-third-10"
          : isOutlined
          ? "text-third-90 border-2 border-third-90 hover:bg-third-90 hover:text-netral-10 hover:shadow-lg hover:shadow-netral-90/50"
          : isDisabled
          ? "bg-third-100 text-netral-70"
          : "bg-third-90 text-netral-10 hover:bg-third-60 shadow-lg shadow-netral-90/50";
    }
  };

  return (
    <div
      className={`flex cursor-pointer min-w-max font-helvetica_regular space-x-[5px] items-center ${
        isOutlined
          ? "py-[5px] md:py-[7px] lg:py-[8px] px-[10px]"
          : "py-[7px] md:py-[9px] lg:py-[10px] px-[12px]"
      } rounded-[10px] text-bodySm md:rounded-[15px] md:text-bodyBase lg:rounded-[15px] lg:text-h5 ${mappingBackgroundBorderColor()} ${className}`}
      onClick={onClick}
    >
      {iconLeft}
      {children}
      {iconRight}
    </div>
  );
};

Button.propTypes = {
  state: PropTypes.oneOf(["default", "disabled"]),
  variant: PropTypes.oneOf(["contained", "outlined"]).isRequired,
  color: PropTypes.oneOf(["primary", "secondary", "third"]).isRequired,
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  state: "default",
  iconLeft: null,
  iconRight: null,
  children: "Button",
  onClick: () => {},
  className: "",
};

export default Button;
