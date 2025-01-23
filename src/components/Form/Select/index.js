'use client';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import { LuChevronUp, LuChevronDown } from 'react-icons/lu';
import { findIndexPath, findLabelByValue, transformToObject } from './helpers';
import { FaSearch } from 'react-icons/fa';
import { useTranslation } from '@/app/i18n/client';
import { useParams } from 'next/navigation';

const Select = ({
  width,
  options,
  selected,
  onChange,
  isDisabled,
  isError,
  helperText,
  isSearchable,
  placeholder,
}) => {
  const params = useParams();
  const { t } = useTranslation(params.lng, 'translation');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openMenus, setOpenMenus] = useState({});
  const [selectedLabel, setSelectedLabel] = useState(placeholder);
  const [selectedOpenMenus, setSelectedOpenMenus] = useState({});

  useEffect(() => {
    setSelectedLabel(placeholder);
  }, [placeholder]);

  useEffect(() => {
    if (isSelectOpen) setOpenMenus({ ...selectedOpenMenus });
  }, [isSelectOpen]);

  useEffect(() => {
    if (selected !== null && selected !== undefined) {
      const label = findLabelByValue(options, selected);
      const indexPath = findIndexPath(options, selected);
      const currentOpenMenus = transformToObject(indexPath);
      setSelectedOpenMenus(currentOpenMenus);
      setSelectedLabel(label);
    }
  }, [selected, options]);

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
    setSearchQuery('');
  };

  const toggleMenu = (path) => {
    setOpenMenus((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const handleClick = (item, currentPath) => {
    if (item.children) {
      toggleMenu(currentPath);
    } else {
      const currentOpenMenus = transformToObject(currentPath);
      setSelectedOpenMenus(currentOpenMenus);
      setSelectedLabel(item.label);
      onChange(item.value);
      setIsSelectOpen(false);
    }
  };

  const renderMenu = (items, path = '') => {
    const filterMenu = (menu) =>
      menu.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (menu.children && menu.children.some(filterMenu));

    const filteredItems = items?.filter(filterMenu);

    return (
      <ul className="font-helvetica_regular">
        {filteredItems?.map((item, index) => {
          const currentPath = path ? `${path}-${index}` : `${index}`;
          const isOpen = openMenus[currentPath];
          return (
            <li
              key={currentPath}
              className="relative group font-helvetica_regular"
            >
              <div
                className={`flex font-helvetica-regular justify-between items-center cursor-pointer px-[7px] py-[5px] text-bodySm md:text-bodyBase md:px-[10px] md:py-[7px] hover:bg-primary-50 hover:text-netral-10 ${
                  (selected === item.value || selectedLabel === item.value) &&
                  !item.children
                    ? 'bg-primary-50 text-netral-10'
                    : 'bg-netral-10 text-netral-90'
                }`}
                onClick={() => handleClick(item, currentPath)}
              >
                <p className="font-helvetica_regular">{item.label}</p>
                {item.children &&
                  (isOpen ? (
                    <LuChevronUp className="text-[18px] md:text-[24px]" />
                  ) : (
                    <LuChevronDown className="text-[18px] md:text-[24px]" />
                  ))}
              </div>
              {item.children && isOpen && (
                <div>{renderMenu(item.children, currentPath)}</div>
              )}
            </li>
          );
        })}
        {filteredItems?.length === 0 && (
          <p className="text-center py-[5px]">
            {t('COMPONENT.Tidak Ada Data')}
          </p>
        )}
      </ul>
    );
  };

  return (
    <div className="relative inline-block text-left w-full">
      <button
        onClick={toggleSelect}
        disabled={isDisabled}
        className={`font-helvetica-regular flex items-center justify-between bg-netral-10 border px-[7px] md:px-[10px] py-[5px] md:py-[7px] rounded-[10px] md:rounded-[15px] text-bodySm md:text-bodyBase w-full ${
          isError
            ? 'border-primary-30 text-primary-30'
            : 'border-netral-40 text-netral-90'
        }`}
        style={{ maxWidth: width }}
      >
        <div
          className={`flex items-center justify-between w-full ${
            isDisabled && 'cursor-not-allowed text-netral-40'
          }`}
        >
          <p>{selectedLabel}</p>
          {isSelectOpen ? (
            <LuChevronUp className="text-[18px] md:text-[24px]" />
          ) : (
            <LuChevronDown className="text-[18px] md:text-[24px]" />
          )}
        </div>
      </button>
      {isSelectOpen && (
        <div
          className="absolute left-0 mt-0 shadow-md border rounded-[10px] md:rounded-[15px] w-full z-50 overflow-hidden bg-netral-10"
          style={{ maxWidth: width }}
        >
          {isSearchable && (
            <div className="p-2">
              <TextInput
                placeholder={`${t('COMPONENT.Cari')}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                iconRight={
                  <FaSearch className="text-[18px] md:text-[24px] text-primary-50" />
                }
              />
            </div>
          )}
          <div>{renderMenu(options)}</div>
        </div>
      )}
      {helperText && (
        <p className="text-bodySm md:text-bodyBase text-primary-30">
          {helperText}
        </p>
      )}
    </div>
  );
};

Select.propTypes = {
  width: PropTypes.string,
  options: PropTypes.array.isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func,
  isDisabled: PropTypes.bool,
  isError: PropTypes.bool,
  placeholder: PropTypes.string,
  isSearchable: PropTypes.bool,
};

Select.defaultProps = {
  selected: null,
  onChange: () => {},
  isDisabled: false,
  isError: false,
  placeholder: 'Select',
  isSearchable: false,
};

export default Select;
