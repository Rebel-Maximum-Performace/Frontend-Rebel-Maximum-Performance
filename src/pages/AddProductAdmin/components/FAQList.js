import { useParams } from 'next/navigation';
import { useState } from 'react';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';

const FAQList = ({ faqs }) => {
  const [openList, setOpenList] = useState([]);
  const { lng } = useParams();

  const handleToggle = (index) => {
    if (openList.includes(index)) {
      setOpenList(openList.filter((item) => item !== index));
    } else {
      setOpenList([...openList, index]);
    }
  };

  return faqs?.map((faq, index) => (
    <div
      className="w-full rounded-[10px] lg:rounded-[15px] px-[15px] py-[10px] border-[1.5px] border-netral-20 mb-[10px] lg:mb-[20px]"
      key={index}
    >
      <div
        className="flex w-full items-center justify-between"
        onClick={() => handleToggle(index)}
      >
        <p className="font-helvetica_bold text-bodyXs md:text-bodySm lg:text-bodyBase">
          {lng === 'id' ? faq.questionId : faq.questionEn}
        </p>
        <div>
          {openList.includes(index) ? (
            <LuChevronUp className="text-[18px] md:text-[24px]" />
          ) : (
            <LuChevronDown className="text-[18px] md:text-[24px]" />
          )}
        </div>
      </div>
      {openList.includes(index) && (
        <p className="font-helvetica_regular text-bodyXs md:text-bodySm lg:text-bodyBase mt-[5px] lg:mt-[10px]">
          {lng === 'id' ? faq.answerId : faq.answerEn}
        </p>
      )}
    </div>
  ));
};

export default FAQList;
