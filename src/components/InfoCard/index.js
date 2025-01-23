import React from "react";
import PropTypes from "prop-types";

const InfoCard = ({ width, title, data }) => (
  <div
    className="flex items-center justify-between p-[10px] text-bodySm bg-primary-50 text-netral-10 rounded-[10px] md:rounded-[15px] wi md:p-[15px] md:text-h4 flex-wrap"
    style={{ width: width || "100%" }}
  >
    <p className="whitespace-pre-wrap text-wrap overflow-x-scroll">{title}</p>
    <p className="whitespace-pre-wrap text-wrap overflow-x-scroll">{data}</p>
  </div>
);

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

InfoCard.defaultProps = {
  title: "Title",
  data: 0,
};

export default InfoCard;
