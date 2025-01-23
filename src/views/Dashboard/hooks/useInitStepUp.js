import { useWebContext } from '@/context/WebContext';
import { getLocalStorage, setLocalStorage } from '@/helpers/localStorage';
import { useEffect } from 'react';

const useInitStepUp = () => {
  const doneStep = getLocalStorage('doneStep');
  const { setLoading } = useWebContext();

  useEffect(() => {
    if (!doneStep) {
      setLocalStorage('doneStep', {
        categories: false,
        products: false,
        contents: false,
        horizontalList: false,
      });
    }
  }, []);

  const onClickStep = (step) => {
    setLocalStorage('doneStep', { ...doneStep, [step]: true });
  };

  return { doneStep, onClickStep, setLoading };
};

export default useInitStepUp;
