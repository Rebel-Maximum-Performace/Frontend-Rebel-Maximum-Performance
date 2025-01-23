import React from 'react';
import PropTypes from 'prop-types';
import { LuChevronUp, LuChevronDown } from 'react-icons/lu';
import Checkbox from '@/components/Form/Checkbox';
import useInitAttributeCheckboxGroup from '../hooks/useInitAttributeCheckboxGroup';

const AttributeCheckboxGroup = ({
  attributes,
  onChangeQueryState,
  filterQuery,
  isLarge,
}) => {
  const { toggleSelect, isSelectOpen, onCheckAttributeValue } =
    useInitAttributeCheckboxGroup({
      filterQuery,
      onChangeQueryState,
      isLarge,
      attributes: attributes?.map((attribute) => attribute.key),
    });

  return attributes?.map((attribute, index) => (
    <div
      className="inline-block text-left w-full mb-[5px] lg:mb-[10px]"
      key={index}
    >
      <button
        onClick={() => toggleSelect(attribute.key)}
        className={`font-helvetica-regular flex items-center justify-between bg-netral-10 border border-netral-40 text-netral-90 px-[7px] md:px-[10px] py-[5px] md:py-[7px] rounded-[10px] md:rounded-[15px] text-bodySm md:text-bodyBase w-full`}
      >
        <div className={`flex items-center justify-between w-full`}>
          <p>{attribute.key || '-'}</p>
          {isSelectOpen.includes(attribute.key) ? (
            <LuChevronUp className="text-[18px] md:text-[24px]" />
          ) : (
            <LuChevronDown className="text-[18px] md:text-[24px]" />
          )}
        </div>
      </button>
      {isSelectOpen.includes(attribute.key) && (
        <div className="w-full">
          {attribute.values.map((value, index) => (
            <div className="px-[10px] py-[10px]" key={index}>
              <Checkbox
                label={value}
                key={index}
                onChange={() => onCheckAttributeValue(attribute.key, value)}
                checked={filterQuery
                  .find((item) => item.key === attribute.key)
                  ?.values.includes(value)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  ));
};

AttributeCheckboxGroup.propTypes = {
  attributes: PropTypes.array,
  onChangeQueryState: PropTypes.func,
  filterQuery: PropTypes.object,
  isLarge: PropTypes.bool,
};

AttributeCheckboxGroup.defaultProps = {
  attributes: [],
  onChangeQueryState: () => {},
  filterQuery: {},
  isLarge: false,
};

export default AttributeCheckboxGroup;
