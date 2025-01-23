import React from "react";
import PropTypes from "prop-types";
import FooterUser from "./User";
import FooterAdmin from "./Admin";

const Footer = ({ role }) =>
  role === "User" ? <FooterUser /> : role === "Admin" ? <FooterAdmin /> : null;

Footer.propTypes = {
  role: PropTypes.string,
};

Footer.defaultProps = {
  role: "",
};

export default Footer;
