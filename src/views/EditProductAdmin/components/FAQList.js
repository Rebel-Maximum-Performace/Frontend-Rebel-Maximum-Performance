import Button from '@/components/Button';
import TextInput from '@/components/Form/TextInput';
import Popup from '@/components/Popup';
import { useProductContext } from '@/context/ProductContext';
import { useWebContext } from '@/context/WebContext';
import { Textarea } from '@headlessui/react';
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';

const FAQList = ({ faqs, lang }) => {
  const { t } = useWebContext();
  const { setFaqs, setRemovedFaqs } = useProductContext();
  const [openList, setOpenList] = useState([]);
  const [popupEdit, setPopupEdit] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [dataFAQ, setDataFAQ] = useState({
    questionId: '',
    questionEn: '',
    answerId: '',
    answerEn: '',
  });
  const [errorFields, setErrorFields] = useState({
    questionId: { isError: false, message: '' },
    questionEn: { isError: false, message: '' },
    answerId: { isError: false, message: '' },
    answerEn: { isError: false, message: '' },
  });

  const handleToggle = (index) => {
    if (openList.includes(index)) {
      setOpenList(openList.filter((item) => item !== index));
    } else {
      setOpenList([...openList, index]);
    }
  };

  const onChangeDataFAQ = (field, value) => {
    setDataFAQ({
      ...dataFAQ,
      [field]: value,
    });

    setErrorFields((prev) => ({
      ...prev,
      [field]: {
        isError: false,
        message: '',
      },
    }));
  };

  const onClosePopup = () => {
    setPopupEdit(false);
    setSelectedFaq(null);
  };

  const handleUpdateQuestion = () => {
    let isError = false;
    if (dataFAQ.questionId === '') {
      setErrorFields((prev) => ({
        ...prev,
        questionId: {
          isError: true,
          message: t(`ADD_PRODUCT.Pertanyaan (ID) harus diisi`),
        },
      }));
      isError = true;
    }

    if (dataFAQ.answerId === '') {
      setErrorFields((prev) => ({
        ...prev,
        answerId: {
          isError: true,
          message: t(`ADD_PRODUCT.Jawaban (ID) harus diisi`),
        },
      }));
      isError = true;
    }

    if (dataFAQ.questionEn === '') {
      setErrorFields((prev) => ({
        ...prev,
        questionEn: {
          isError: true,
          message: t(`ADD_PRODUCT.Pertanyaan (EN) harus diisi`),
        },
      }));
      isError = true;
    }

    if (dataFAQ.answerEn === '') {
      setErrorFields((prev) => ({
        ...prev,
        answerEn: {
          isError: true,
          message: t(`ADD_PRODUCT.Jawaban (EN) harus diisi`),
        },
      }));
      isError = true;
    }

    if (!isError) {
      setFaqs((prev) => {
        const newFaqs = [...prev];

        if (faqs[selectedFaq]?.id) {
          newFaqs[selectedFaq].isUpdated = true;
        }

        newFaqs[selectedFaq].questionId = dataFAQ.questionId;
        newFaqs[selectedFaq].questionEn = dataFAQ.questionEn;
        newFaqs[selectedFaq].answerId = dataFAQ.answerId;
        newFaqs[selectedFaq].answerEn = dataFAQ.answerEn;
        return newFaqs;
      });

      onClosePopup();
      setDataFAQ({
        questionId: '',
        questionEn: '',
        answerId: '',
        answerEn: '',
      });
    }
  };

  const onClickEdit = (dataFaq, indexFaq) => {
    setPopupEdit(true);
    setSelectedFaq(indexFaq);
    setDataFAQ(dataFaq);
  };

  const onRemoveQuestion = (faq) => {
    if (faq.id) {
      setRemovedFaqs((prev) => [...prev, faq]);
    }
    setFaqs((prev) =>
      prev.filter((item) => JSON.stringify(item) !== JSON.stringify(faq)),
    );
  };

  return (
    <React.Fragment>
      {faqs?.map((faq, index) => (
        <div
          className="w-full rounded-[10px] lg:rounded-[15px] px-[15px] py-[10px] border-[1.5px] border-netral-20 mb-[10px] lg:mb-[20px]"
          key={index}
        >
          <div
            className="flex w-full items-center justify-between space-x-[10px]"
            onClick={() => handleToggle(index)}
          >
            <p className="font-helvetica_bold text-bodyXs md:text-bodySm lg:text-bodyBase">
              {lang === 'id' ? faq.questionId : faq.questionEn}
            </p>
            <div className="flex space-x-[15px]">
              <FaEdit
                className="text-[18px] md:text-[24px] text-secondary-70"
                onClick={() => onClickEdit(faq, index)}
              />
              <FaTrash
                className="text-[18px] md:text-[24px] text-primary-50"
                onClick={() => onRemoveQuestion(faq)}
              />
              {openList.includes(index) ? (
                <LuChevronUp className="text-[18px] md:text-[24px]" />
              ) : (
                <LuChevronDown className="text-[18px] md:text-[24px]" />
              )}
            </div>
          </div>
          {openList.includes(index) && (
            <p className="font-helvetica_regular text-bodyXs md:text-bodySm lg:text-bodyBase mt-[5px] lg:mt-[10px]">
              {lang === 'id' ? faq.answerId : faq.answerEn}
            </p>
          )}
        </div>
      ))}

      <Popup
        open={popupEdit}
        onClose={onClosePopup}
        className="w-[90%] md:w-[80%] lg:w-[70%]"
      >
        <div className="mt-[5px] lg:mt-[10px] space-y-[10px] lg:space-y-[20px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
            <div className="space-y-[10px] lg:space-y-[20px]">
              <TextInput
                label={t(`ADD_PRODUCT.Pertanyaan (ID)`)}
                name="questionId"
                placeholder={t(`ADD_PRODUCT.Masukkan Pertanyaan (ID)`)}
                onChange={(e) => onChangeDataFAQ('questionId', e.target.value)}
                value={dataFAQ.questionId}
                isError={errorFields.questionId.isError}
                helperText={errorFields.questionId.message}
                isRequired
              />
              <Textarea
                name="answerId"
                id="answerId"
                placeholder={t(`ADD_PRODUCT.Masukkan Jawaban (ID)`)}
                className="w-full h-[129px] rounded-[10px] lg:rounded-[15px] resize-none px-[10px] py-[5px] md:px-[15px] md:py-[10px] overflow-y-auto break-words font-helvetica_reguler text-bodySm lg:text-bodyBase border-2 border-netral-40 focus:border-netral-90 placeholder:font-helvetica_reguler outline-none placeholder:text-netral-50 disabled:bg-transparent inline-block"
                onChange={(e) => onChangeDataFAQ('answerId', e.target.value)}
                value={dataFAQ.answerId}
              ></Textarea>
              {errorFields.answerId.isError && (
                <p className="text-primary-30 text-bodySm lg:text-bodyBase">
                  {errorFields.answerId.message}
                </p>
              )}
            </div>
            <div className="space-y-[10px] lg:space-y-[20px]">
              <TextInput
                label={t(`ADD_PRODUCT.Pertanyaan (EN)`)}
                name="questionEn"
                placeholder={t(`ADD_PRODUCT.Masukkan Pertanyaan (EN)`)}
                onChange={(e) => onChangeDataFAQ('questionEn', e.target.value)}
                value={dataFAQ.questionEn}
                isError={errorFields.questionEn.isError}
                helperText={errorFields.questionEn.message}
                isRequired
              />
              <Textarea
                name="answerEn"
                id="answerEn"
                placeholder={t(`ADD_PRODUCT.Masukkan Jawaban (EN)`)}
                className="w-full h-[129px] rounded-[10px] lg:rounded-[15px] resize-none px-[10px] py-[5px] md:px-[15px] md:py-[10px] overflow-y-auto break-words font-helvetica_reguler text-bodySm lg:text-bodyBase border-2 border-netral-40 focus:border-netral-90 placeholder:font-helvetica_reguler outline-none placeholder:text-netral-50 disabled:bg-transparent inline-block"
                onChange={(e) => onChangeDataFAQ('answerEn', e.target.value)}
                value={dataFAQ.answerEn}
              ></Textarea>
              {errorFields.answerEn.isError && (
                <p className="text-primary-30 text-bodySm lg:text-bodyBase">
                  {errorFields.answerEn.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center w-full mt-[15px] lg:mt-[30px]">
            <Button
              color="primary"
              variant="outlined"
              onClick={onClosePopup}
              className="w-[calc(50%-10px)] md:w-[calc(50%-10px)] justify-center"
            >
              {t(`COMPONENT.Batal`)}
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={handleUpdateQuestion}
              className="w-[calc(50%-10px)] md:w-[calc(50%-10px)] justify-center"
            >
              {t(`COMPONENT.Simpan`)}
            </Button>
          </div>
        </div>
      </Popup>
    </React.Fragment>
  );
};

export default FAQList;
