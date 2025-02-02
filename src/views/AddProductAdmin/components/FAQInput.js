import Button from '@/components/Button';
import TextInput from '@/components/Form/TextInput';
import { useProductContext } from '@/context/ProductContext';
import { useWebContext } from '@/context/WebContext';
import { Textarea } from '@headlessui/react';
import { useState } from 'react';
import FAQList from './FAQList';
import { useTranslation } from '@/app/i18n/client';

const FAQInput = () => {
  const { t } = useWebContext();
  const { faqs, setFaqs } = useProductContext();
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

  const handleSaveQuestion = () => {
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
      setFaqs((prev) => [...prev, dataFAQ]);
      setDataFAQ({
        questionId: '',
        questionEn: '',
        answerId: '',
        answerEn: '',
      });
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

  return (
    <div className="w-full mb-[20px] lg:mb-[40px]">
      <h3 className="font-helvetica_bold text-bodyMd lg:text-h3 mb-[5px]">
        FAQ ( Optional )
      </h3>
      <hr className="border-t-2 lg:border-t-4 border-primary-50 rounded-[15px]" />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-[5px] lg:mt-[10px] gap-[20px]">
        <div className="space-y-[10px] lg:space-y-[20px]">
          <FAQList faqs={faqs} lang={'id'} />
        </div>
        <div className="space-y-[10px] lg:space-y-[20px]">
          <FAQList faqs={faqs} lang={'en'} />
        </div>
      </div>
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
        <Button
          color="primary"
          variant="contained"
          onClick={handleSaveQuestion}
          className="mb-[15px] lg:mb-[20px] justify-center"
        >
          {t(`ADD_PRODUCT.Tambah Pertanyaan`)}
        </Button>
      </div>
    </div>
  );
};

export default FAQInput;
