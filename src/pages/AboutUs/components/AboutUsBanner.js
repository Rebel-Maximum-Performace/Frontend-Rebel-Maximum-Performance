import LogoRebel from '@/assets/img/logo rebel.webp';
import Image from 'next/image';
import { IoDiamondSharp } from 'react-icons/io5';
import { RiCoinsLine } from 'react-icons/ri';
import { TbChecklist } from 'react-icons/tb';

const AboutUsBanner = () => {
  return (
    <div
      className="bg-cover bg-center w-full"
      style={{
        backgroundImage: 'url(About-Us-Banner.png)',
      }}
    >
      <div className="p-[30px] lg:p-[50px] flex flex-col lg:flex-row lg:items-center justify-between bg-netral-100/50">
        <div className="lg:w-[80%] mb-[30px]">
          <Image
            src={LogoRebel}
            alt="Logo Rebell Maximum Performance"
            width={115}
            height={50}
            className="w-auto h-[50px] lg:h-[92px] object-cover"
          />
          <h1 className="lg:text-display text-netral-10 font-helvetica_bold lg:my-[20px]">
            REBELL MAXIMUM PERFORMANCE
          </h1>
          <p className="lg:text-bodyBase text-netral-10 font-helvetica_light">
            Want your motorcycle to be more powerful and have more character?
            REBELL MAXIMUM PERFORMANCE is the answer! We provide a variety of
            premium quality spare parts that will take your riding experience to
            the next level. Visit us and experience the true sensation of
            riding!
          </p>
        </div>
        <div className="text-netral-10 lg:px-[30px] lg:py-[40px] space-y-[15px] lg:space-y-[30px]">
          <h1 className="lg:text-h3 text-h5 font-helvetica_bold mb-[15px] lg:mb-0">
            Our Advantages
          </h1>
          <div className="flex w-full lg:space-x-[15px] items-start">
            <IoDiamondSharp className="text-[25px] lg:text-[70px] h-max lg:mt-[5px] m-0 p-0" />
            <div>
              <h5 className="lg:text-h5 font-helvetica_bold">
                Premium Quality
              </h5>
              <p className="lg:text-bodyBase font-helvetica_light">
                High-quality spare parts from world-renowned brands.
              </p>
            </div>
          </div>
          <div className="flex w-full lg:space-x-[10px] items-start">
            <RiCoinsLine className="text-[25px] lg:text-[70px] h-max lg:mt-[5px] m-0 p-0" />
            <div>
              <h5 className="lg:text-h5 font-helvetica_bold">
                Competitive Price
              </h5>
              <p className="lg:text-bodyBase font-helvetica_light">
                Affordable prices for premium quality products.
              </p>
            </div>
          </div>
          <div className="flex w-full lg:space-x-[10px] items-start">
            <TbChecklist className="text-[25px] lg:text-[80px] h-max lg:mt-[5px] m-0 p-0" />
            <div>
              <h5 className="lg:text-h5 font-helvetica_bold">
                Everything you need, all in one place
              </h5>
              <p className="lg:text-bodyBase font-helvetica_light">
                We have everything you need to keep your motorcycle running
                smoothly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsBanner;
