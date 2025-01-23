import { Dialog, DialogPanel } from '@headlessui/react';
import PropTypes from 'prop-types';

const Popup = ({ open, onClose, children, width, className = '' }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      as="div"
      className="relative z-50 focus:outline-none"
    >
      <div className="fixed inset-0 flex items-center justify-center px-[10px] lg:px-[50px] bg-netral-90/50">
        <DialogPanel
          className={`${className} bg-white rounded-[10px] lg:rounded-[15px] shadow-lg p-[15px] lg:p-[30px] overflow-scroll max-h-screen font-helvetica_regular text-bodySm lg:text-bodyBase`}
          style={{ width }}
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

Popup.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  width: PropTypes.string,
  className: PropTypes.string,
};

Popup.defaultProps = {
  open: false,
  onClose: () => {},
  children: null,
  width: '100%',
  className: ' ',
};

export default Popup;
