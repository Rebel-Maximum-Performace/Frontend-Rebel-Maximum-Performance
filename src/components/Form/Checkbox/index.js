import React from 'react';
import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa6';

const Checkbox = ({ checked, label, onChange }) => {
  return (
    <div className="flex items-center space-x-[10px] lg:sapce-x-[15px]">
      {/* Checkbox */}
      <div
        className={`w-[12px] h-[12px] lg:w-[15px] lg:h-[15px] border-[1.5px] lg:border-[2px] border-primary-50 rounded-[2px] cursor-pointer ${
          checked ? 'bg-primary-50' : 'bg-transparent'
        }`}
        onClick={onChange}
      >
        {checked && (
          <FaCheck className="text-[8px] md:text-[12px] text-netral-10" />
        )}
      </div>
      {/* Label */}
      <label
        className="text-gray-800 text-sm cursor-pointer select-none font-helvetica_regular"
        onClick={onChange}
      >
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  checked: false,
  label: '',
  onChange: () => {},
};

export default Checkbox;
