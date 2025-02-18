import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CustomInputText = ({
  label,
  name,
  helperText,
  placeholder,
  isRequired,
  value,
  defaultValue,
  onChange,
  iconLeft,
  iconRight,
  isDisabled,
  isError,
  className,
}) => {
  const mappingColorBorder = () => {
    if (isDisabled) {
      return 'border-netral-40 text-netral-40';
    } else if (isError) {
      return 'border-primary-30 text-primary-30';
    } else {
      return `text-netral-90 ${
        isFocus ? 'border-netral-90' : 'border-netral-40'
      }`;
    }
  };
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className={`flex flex-col space-y-[5px] w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`font-helvetica-regular text-netral-90 text-labelSm md:text-labelBase`}
        >
          {label}
          {isRequired && <span className="text-primary-50">*</span>}
        </label>
      )}
      <div
        className={`flex bg-netral-10 space-x-[5px] items-center justify-center text-bodySm rounded-[10px] md:text-bodyBase md:rounded-[15px] w-full ${mappingColorBorder()}`}
      >
        {iconLeft}
        <input
          type="text"
          name={name}
          id={name}
          placeholder={placeholder}
          value={value || defaultValue || ''}
          onChange={(event) => {
            onChange(event);
          }}
          className={`font-helvetica_bold text-bodyMd lg:text-h3 placeholder:font-helvetica_bold outline-none placeholder:text-netral-50 disabled:bg-transparent w-full inline-block`}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          disabled={isDisabled}
        />
        {iconRight}
      </div>
      {helperText && (
        <span
          className={`font-helvetica_regular text-labelSm md:text-labelBase ${
            isDisabled
              ? 'text-netral-40'
              : isError
              ? 'text-primary-30'
              : 'text-netral-90'
          }`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

CustomInputText.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
  isDisabled: PropTypes.bool,
  isError: PropTypes.bool,
  className: PropTypes.string,
};

CustomInputText.defaultProps = {
  label: '',
  helperText: '',
  placeholder: '',
  isRequired: false,
  value: '',
  defaultValue: '',
  onChange: () => {},
  iconLeft: null,
  iconRight: null,
  isDisabled: false,
  isError: false,
  className: '',
};

export default CustomInputText;
