import { useWebContext } from '@/context/WebContext';
import CustomInputText from './CustomInput';
import { RxTable, RxText } from 'react-icons/rx';
import { FaList, FaPlus, FaTrash } from 'react-icons/fa';
import { TbTable } from 'react-icons/tb';
import RenderContentColumn from '../helpers/RenderContentColumn';
import { useProductContext } from '@/context/ProductContext';

const inputDetailsType = [
  {
    label: 'Text',
    icon: (
      <RxText className="text-primary-50 text-[18px] lg:text-[24px] mr-[15px]" />
    ),
  },
  {
    label: 'List',
    icon: (
      <FaList className="text-primary-50 text-[18px] lg:text-[24px] mr-[15px]" />
    ),
  },
  {
    label: 'Label & Value',
    icon: (
      <RxTable className="text-primary-50 text-[18px] lg:text-[24px] mr-[15px]" />
    ),
  },
  {
    label: 'Table',
    icon: (
      <TbTable className="text-primary-50 text-[18px] lg:text-[24px] mr-[15px]" />
    ),
  },
];

const DetailsInput = () => {
  const { t } = useWebContext();
  const { details, setDetails, errorFields } = useProductContext();
  const onChangeDetailItems = (detailIndex, itemIndex, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[detailIndex].items[itemIndex][field] = value;
    setDetails(updatedDetails);
  };

  const handleRemoveColumnDetails = (indexDetail, indexItem) => {
    const updatedDetails = [...details];
    if (updatedDetails[indexDetail].items.length === 1) {
      updatedDetails.splice(indexDetail, 1);
    } else {
      updatedDetails[indexDetail].columns -= 1;
      updatedDetails[indexDetail].items.splice(indexItem, 1);
    }
    setDetails(updatedDetails);
  };

  const onClickTypeItems = (type, detailIndex, itemIndex) => {
    if (type === 'Text') {
      onChangeDetailItems(detailIndex, itemIndex, 'type', 'text');
      onChangeDetailItems(detailIndex, itemIndex, 'content', 'Text');
    } else if (type === 'List') {
      onChangeDetailItems(detailIndex, itemIndex, 'type', 'list');
      onChangeDetailItems(detailIndex, itemIndex, 'content', undefined);
      onChangeDetailItems(detailIndex, itemIndex, 'list', ['']);
    } else if (type === 'Label & Value') {
      onChangeDetailItems(detailIndex, itemIndex, 'type', 'label-value');
      onChangeDetailItems(detailIndex, itemIndex, 'content', undefined);
      onChangeDetailItems(detailIndex, itemIndex, 'data', [
        { label: '', value: '' },
      ]);
    } else if (type === 'Table') {
      onChangeDetailItems(detailIndex, itemIndex, 'type', 'table');
      onChangeDetailItems(detailIndex, itemIndex, 'content', undefined);
      onChangeDetailItems(detailIndex, itemIndex, 'headers', [
        { label: '', field: '', position: 'left' },
      ]);
      onChangeDetailItems(detailIndex, itemIndex, 'contents', [
        { id: 0, '': '' },
      ]);
    }
  };

  const handleAddColumnDetails = (indexDetail) => {
    const updatedDetails = [...details];
    updatedDetails[indexDetail].columns += 1;
    updatedDetails[indexDetail].items.push({
      title: '',
      type: 'text',
      contents: '',
    });
    setDetails(updatedDetails);
  };

  return (
    <div className="w-full mt-[10px] lg:mt-[20px]">
      {details?.map((detail, index) => (
        <div
          key={index}
          className={`grid grid-cols-1 ${
            detail.columns === 2 ? `lg:grid-cols-2` : 'lg:grid-cols-1'
          } gap-[20px]`}
        >
          {detail.items.map((item, i) => (
            <div className="flex space-x-[5px] lg:space-x-[10px]" key={i}>
              <div className="space-y-[15px] lg:space-y-[20px] w-full mb-[15px] lg:mb-[30px]">
                <CustomInputText
                  name={`Detail-${index}-${item.title}`}
                  placeholder={t(`CONTENTS.Masukkan Judul`)}
                  onChange={(e) =>
                    item.title === 'Description'
                      ? () => {}
                      : onChangeDetailItems(index, i, 'title', e.target.value)
                  }
                  value={item.title}
                  isError={errorFields.details?.[index]?.items[i]?.isError}
                  helperText={errorFields.details?.[index]?.items[i]?.message}
                  isRequired
                  className="mb-[5px] p-0 border-2 border-dashed border-secondary-50"
                />
                <div className="flex space-x-[15px] items-center">
                  <hr
                    className={`${
                      item.title === 'Description' ? 'w-full' : 'w-[95%]'
                    } border-t-2 lg:border-t-4 border-primary-50 rounded-[15px]`}
                  />
                  {item.title !== 'Description' && (
                    <FaTrash
                      className="text-primary-50 text-[18px] lg:text-[24px] cursor-pointer"
                      onClick={() => handleRemoveColumnDetails(index, i)}
                    />
                  )}
                </div>
                <div>
                  {
                    <RenderContentColumn
                      columnData={item}
                      detailIndex={index}
                      itemIndex={i}
                      onChangeDetailItems={onChangeDetailItems}
                    />
                  }
                  {item.content &&
                    item.content === '/' &&
                    item.title !== 'Description' &&
                    inputDetailsType.map((input, id) => (
                      <div
                        key={id}
                        className={`flex cursor-pointer border-2 border-netral-20 rounded-[10px] lg:rounded-[15px] p-[10px] lg:p-[15px] hover:bg-netral-20 font-helvetica_regular ${
                          input.label === 'Table' && detail.columns === 2
                            ? 'hidden'
                            : ''
                        }`}
                        onClick={() => onClickTypeItems(input.label, index, i)}
                      >
                        {input.icon}
                        {input.label}
                      </div>
                    ))}
                </div>
              </div>
              {detail.columns === 1 && item.title !== 'Description' && (
                <div
                  className="lg:px-[5px] flex items-center justify-center rounded-full border border-primary-50 cursor-pointer"
                  onClick={() => handleAddColumnDetails(index)}
                >
                  <FaPlus className="text-h5 text-primary-50" />
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DetailsInput;
