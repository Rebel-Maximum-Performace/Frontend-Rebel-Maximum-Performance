import { useWebContext } from '@/context/WebContext';
import { decryptData, encryptData } from '@/helpers/encryption';
import { useEffect, useState } from 'react';

const useInitStepUp = () => {
  const { setLoading } = useWebContext();
  const [doneStep, setDoneStep] = useState({
    categories: false,
    products: false,
    contents: false,
    horizontalList: false,
  });

  useEffect(() => {
    const doneStepStorage = localStorage.getItem('doneStep');
    if (!doneStepStorage) {
      localStorage.setItem('doneStep', encryptData(doneStep));
    } else {
      setDoneStep(decryptData(doneStepStorage));
    }
  }, []);

  const onClickStep = (step) => {
    localStorage.setItem(
      'doneStep',
      encryptData({ ...doneStep, [step]: true }),
    );
  };

  return { doneStep, onClickStep, setLoading };
};

export default useInitStepUp;
