'use client';
import { useWebContext } from '@/context/WebContext';
import TableDetails from '../components/TableDetails';
import { useProductContext } from '@/context/ProductContext';

const { Textarea } = require('@headlessui/react');

const RenderContentColumn = ({
  columnData,
  detailIndex,
  itemIndex,
  onChangeDetailItems,
  details,
  setDetails,
}) => {
  const { t } = useWebContext();
  const { errorFields } = useProductContext();
  const adjustHeightTextarea = (el) => {
    el.target.style.height =
      el.target.scrollHeight > el.target.clientHeight
        ? el.target.scrollHeight + 'px'
        : '60px';
  };

  const onChangeHeader = (
    detailIndex,
    itemIndex,
    headerIndex,
    headerValue,
    oldKey,
    headerWidth,
  ) => {
    const updatedDetails = [...details];
    updatedDetails[detailIndex].items[itemIndex].headers[headerIndex].label =
      headerValue;
    updatedDetails[detailIndex].items[itemIndex].headers[headerIndex].field =
      headerValue;
    updatedDetails[detailIndex].items[itemIndex].headers[headerIndex].width =
      headerWidth;
    updatedDetails[detailIndex].items[itemIndex].contents.map((item) => {
      delete Object.assign(item, { [headerValue]: item[oldKey] })[oldKey];
    });

    if (updatedDetails[detailIndex]?.id) {
      updatedDetails[detailIndex].isUpdated = true;
    }

    setDetails(updatedDetails);
  };

  const onChangeContent = (
    detailIndex,
    itemIndex,
    field,
    contentIndex,
    contentValue,
  ) => {
    const updatedDetails = [...details];
    updatedDetails[detailIndex].items[itemIndex].contents[contentIndex][field] =
      contentValue;

    if (updatedDetails[detailIndex]?.id) {
      updatedDetails[detailIndex].isUpdated = true;
    }

    setDetails(updatedDetails);
  };

  const handleAddHeader = (detailIndex, itemIndex) => {
    const updatedDetails = [...details];
    updatedDetails[detailIndex].items[itemIndex].headers.push({
      label: '',
      field: '',
      width: 0,
    });
    if (updatedDetails[detailIndex]?.id) {
      updatedDetails[detailIndex].isUpdated = true;
    }
    setDetails(updatedDetails);
  };

  const handleAddContent = (detailIndex, itemIndex) => {
    const updatedDetails = [...details];
    updatedDetails[detailIndex].items[itemIndex].contents.push({
      id: updatedDetails[detailIndex].items[itemIndex].contents?.length,
      '': '',
    });
    if (updatedDetails[detailIndex]?.id) {
      updatedDetails[detailIndex].isUpdated = true;
    }
    setDetails(updatedDetails);
  };

  const handleRemoveHeader = (indexHeader, detailIndex, itemIndex) => {
    const updatedDetails = [...details];
    const selectedHeader =
      updatedDetails[detailIndex].items[itemIndex].headers[indexHeader];
    if (updatedDetails[detailIndex].items[itemIndex].headers.length > 1) {
      updatedDetails[detailIndex].items[itemIndex].headers.splice(
        indexHeader,
        1,
      );
      updatedDetails[detailIndex].items[itemIndex].contents.map((item) => {
        delete item[selectedHeader.field];
      });
    }
    if (updatedDetails[detailIndex]?.id) {
      updatedDetails[detailIndex].isUpdated = true;
    }
    setDetails(updatedDetails);
  };

  const handleRemoveColumn = (rowIndex, detailIndex, itemIndex) => {
    const updatedDetails = [...details];
    if (updatedDetails[detailIndex].items[itemIndex].contents.length > 1) {
      updatedDetails[detailIndex].items[itemIndex].contents.splice(rowIndex, 1);
    }
    if (updatedDetails[detailIndex]?.id) {
      updatedDetails[detailIndex].isUpdated = true;
    }
    setDetails(updatedDetails);
  };

  const type = columnData.type;
  switch (type) {
    case 'text':
      return (
        <>
          {
            <Textarea
              className={`resize-none overflow-y-auto break-words font-helvetica_reguler text-bodySm lg:text-bodyBase border-2 border-dashed border-secondary-50 placeholder:font-helvetica_reguler outline-none placeholder:text-netral-50 disabled:bg-transparent w-full inline-block`}
              name={`detail-${detailIndex}-${itemIndex}-content`}
              id={`detail-${detailIndex}-${itemIndex}-content`}
              placeholder={t(`ADD_PRODUCT.Masukkan Konten`)}
              value={columnData.content}
              onChange={(e) =>
                onChangeDetailItems(
                  detailIndex,
                  itemIndex,
                  'content',
                  e.target.value,
                )
              }
              onKeyUp={adjustHeightTextarea}
            ></Textarea>
          }
          {errorFields.details?.[detailIndex]?.items?.[itemIndex]?.content
            .isError && (
            <span
              className={`font-helvetica_regular text-labelSm md:text-labelBase text-primary-30`}
            >
              {
                errorFields.details?.[detailIndex]?.items?.[itemIndex]?.content
                  .message
              }
            </span>
          )}
        </>
      );
    case 'list':
      return (
        <ul className="font-helvetica_regular text-netral-90  mt-[5px] lg:mt-[10px] list-disc list-inside">
          {columnData.list?.map((item, index) => (
            <div
              className="text-bodySm lg:text-bodyBase flex mb-[5px] lg:mb-[10px]"
              key={index}
            >
              <input
                type="text"
                name={`detail-${detailIndex}-${itemIndex}-list-${index}`}
                id={`detail-${detailIndex}-${itemIndex}-list-${index}`}
                placeholder={t(`ADD_PRODUCT.Masukkan List`)}
                value={item}
                onChange={(e) => {
                  onChangeDetailItems(
                    detailIndex,
                    itemIndex,
                    'list',
                    columnData.list.map((item, i) =>
                      i === index ? e.target.value : item,
                    ),
                  );
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    onChangeDetailItems(detailIndex, itemIndex, 'list', [
                      ...columnData.list,
                      '',
                    ]);
                  } else if (e.key === 'Backspace') {
                    if (item === '' && columnData.list.length > 1) {
                      onChangeDetailItems(
                        detailIndex,
                        itemIndex,
                        'list',
                        columnData.list.filter((_, i) => i !== index),
                      );
                    }
                  }
                }}
                className={`font-helvetica_reguler text-bodySm lg:text-bodyBase border-2 border-dashed border-secondary-50 placeholder:font-helvetica_reguler outline-none placeholder:text-netral-50 disabled:bg-transparent w-full inline-block`}
              />
            </div>
          ))}
        </ul>
      );
    case 'label-value':
      return (
        <div className="w-full mt-[10px] lg:mt-[15px]">
          {columnData.data.map((item, index) => (
            <div className="flex w-full mb-[2px] lg:mb-[5px]" key={index}>
              <div className="w-[50%] border-[1.5px] border-r-0 border-netral-90 px-[5px] py-[5px] lg:px-[15px] lg:py-[10px] bg-secondary-20 text-bodySm lg:text-bodyBase font-helvetica_bold">
                <input
                  type="text"
                  name={`detail-${detailIndex}-${itemIndex}-data-${index}-label`}
                  id={`detail-${detailIndex}-${itemIndex}-data-${index}-label`}
                  placeholder={t(`ADD_PRODUCT.Masukkan Label`)}
                  value={item.label}
                  onChange={(e) => {
                    onChangeDetailItems(
                      detailIndex,
                      itemIndex,
                      'data',
                      columnData.data.map((item, i) =>
                        i === index ? { ...item, label: e.target.value } : item,
                      ),
                    );
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      onChangeDetailItems(detailIndex, itemIndex, 'data', [
                        ...columnData.data,
                        { label: '', value: '' },
                      ]);
                    } else if (e.key === 'Backspace') {
                      if (item.label === '' && columnData.data.length > 1) {
                        onChangeDetailItems(
                          detailIndex,
                          itemIndex,
                          'data',
                          columnData.data.filter((_, i) => i !== index),
                        );
                      }
                    }
                  }}
                  className={`font-helvetica_reguler bg-secondary-20 text-bodySm lg:text-bodyBase border-2 border-dashed border-netral-10 placeholder:font-helvetica_reguler outline-none placeholder:text-netral-50 disabled:bg-transparent w-full inline-block`}
                />
              </div>
              <div className="w-[50%] border-[1.5px] border-netral-90 px-[5px] py-[5px] lg:px-[15px] lg:py-[10px] bg-netral-10 text-bodySm lg:text-bodyBase font-helvetica_regular">
                <input
                  type="text"
                  name={`detail-${detailIndex}-${itemIndex}-data-${index}-value`}
                  id={`detail-${detailIndex}-${itemIndex}-data-${index}-value`}
                  placeholder={t(`ADD_PRODUCT.Masukkan Nilai`)}
                  value={item.value}
                  onChange={(e) => {
                    onChangeDetailItems(
                      detailIndex,
                      itemIndex,
                      'data',
                      columnData.data.map((item, i) =>
                        i === index ? { ...item, value: e.target.value } : item,
                      ),
                    );
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      onChangeDetailItems(detailIndex, itemIndex, 'data', [
                        ...columnData.data,
                        { label: '', value: '' },
                      ]);
                    }
                  }}
                  className={`font-helvetica_reguler text-bodySm lg:text-bodyBase border-2 border-dashed border-secondary-50 placeholder:font-helvetica_reguler outline-none placeholder:text-netral-50 disabled:bg-transparent w-full inline-block`}
                />
              </div>
            </div>
          ))}
        </div>
      );
    case 'table':
      return (
        <TableDetails
          data={{
            headers: columnData.headers,
            contents: columnData.contents,
          }}
          onChangeHeader={(headerIndex, headerValue, oldKey, headerWidth) =>
            onChangeHeader(
              detailIndex,
              itemIndex,
              headerIndex,
              headerValue,
              oldKey,
              headerWidth,
            )
          }
          onChangeContent={(field, contentIndex, contentValue) =>
            onChangeContent(
              detailIndex,
              itemIndex,
              field,
              contentIndex,
              contentValue,
            )
          }
          handleAddHeader={() => handleAddHeader(detailIndex, itemIndex)}
          handleAddContent={() => handleAddContent(detailIndex, itemIndex)}
          handleRemoveHeader={(indexHeader) =>
            handleRemoveHeader(indexHeader, detailIndex, itemIndex)
          }
          handleRemoveColumn={(rowIndex) =>
            handleRemoveColumn(rowIndex, detailIndex, itemIndex)
          }
        />
      );
    default:
      return <div></div>;
  }
};

export default RenderContentColumn;
