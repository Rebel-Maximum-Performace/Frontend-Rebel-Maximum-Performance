import { useEffect } from 'react';

const Loader = ({ isLoading, zIndex }) => {
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  return isLoading ? (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 bg-netral-10/70 flex justify-center items-center`}
      style={{ zIndex: zIndex || '9999' }}
    >
      <div className="animate-spin w-[40px] h-[40px] border-4 border-b-secondary-20 border-l-secondary-20 border-primary-50 rounded-full" />
    </div>
  ) : null;
};

export default Loader;
