import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

const LayoutAdmin = ({ children, selectedMenu }) => (
  <>
    <TopBar role="Admin" selectedMenu={selectedMenu} />
    <div className="px-[10px] lg:px-[50px] py-[15px] lg:py-[30px] lg:flex lg:h-[calc(100vh-120px)] justify-between mb-[50px] lg:mb-0">
      <div className="w-[calc(25%-50px)] hidden lg:block relative">
        <Sidebar selectedMenu={selectedMenu} />
      </div>
      <div className="w-full lg:w-[75%] lg:h-full lg:overflow-y-scroll">
        {children}
      </div>
    </div>
    <Footer role="Admin" />
  </>
);

export default LayoutAdmin;
