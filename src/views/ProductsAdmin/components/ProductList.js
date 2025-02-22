import Button from '@/components/Button';
import { arrayCategoryToString } from '@/helpers';
import { formatMoney } from '@/helpers/formatting';
import { FaInfoCircle } from 'react-icons/fa';
import { RiEditCircleFill } from 'react-icons/ri';

const ProductList = ({ data, isLoading, t, onDetail, onEdit, onRemove }) => {
  return (
    <div className="w-full min-h-screen overflow-scroll my-[15px] lg:my-[30px]">
      <div className="w-full flex flex-wrap">
        {isLoading ? (
          [1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="w-[calc(50%-10px)] md:w-[calc(100%/3-10px)] mb-[10px] lg:mb-[20px] animate-pulse overflow-hidden border border-netral-20 rounded-[10px] lg:rounded-[15px] flex justify-start flex-col mr-[10px]"
            >
              <div className="pt-[100%] w-full bg-netral-20" />
              <div className="w-full p-[5px] mb-[60px] md:mb-[70px]">
                <div className="animate-pulse">
                  <div className="w-full h-[28px] lg:h-[28px] bg-netral-20" />
                  <div className="w-full h-[29px] mt-[10px] lg:h-[38px] bg-netral-20" />
                </div>
              </div>
            </div>
          ))
        ) : data?.length > 0 ? (
          data.map((product, index) => (
            <div
              key={index}
              className="w-[calc(50%-10px)] md:w-[calc(100%/3-10px)] lg:w-[calc(100%/4-10px)] mb-[10px] lg:mb-[20px] overflow-hidden border border-netral-20 hover:border-primary-50 hover:shadow-xl hover:shadow-primary-50/25 rounded-[10px] lg:rounded-[15px] flex justify-start flex-col mr-[10px]"
            >
              <div
                className="pt-[100%] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${product.images[0]})` }}
              ></div>
              <div className="w-full flex space-x-7 justify-center items-center px-[5px] lg:px-[10px]">
                <FaInfoCircle
                  className="text-[60px] text-primary-50 hover:border-netral-90 border-2 border-netral-10 rounded-full box-border cursor-pointer"
                  onClick={() => onDetail(product)}
                />
                <RiEditCircleFill
                  className="text-[60px] text-third-50 hover:border-primary-50 border-2 border-netral-10 rounded-full box-border cursor-pointer"
                  onClick={() => onEdit(product)}
                />
              </div>
              <div className="w-full p-[5px] lg:p-[10px]">
                <div className="w-full space-y-[1px]">
                  <h3 className="font-helvetica_regular h-[39px] lg:h-[48px] text-bodySm lg:text-bodyBase text-netral-90 text-ellipsis overflow-hidden whitespace-pre-line line-clamp-2 w-full">
                    {product.name}
                  </h3>
                  <h4 className="font-helvetica_bold text-bodySm lg:text-bodyBase text-netral-90">
                    {product.sku}
                  </h4>
                  <h4 className="font-helvetica_regular h-[30px] lg:h-[42px] text-bodyXs lg:text-bodyMd text-secondary-80 text-ellipsis overflow-hidden whitespace-pre-line line-clamp-2 w-full">
                    {arrayCategoryToString(product.categories)}
                  </h4>
                </div>
                <h4 className="font-helvetica_bold text-bodySm lg:text-bodyBase text-primary-50 mt-[10px]">
                  {formatMoney(product.price, '$')}
                </h4>
                <div className="flex justify-between my-2">
                  <Button
                    color="primary"
                    variant="contained"
                    className="w-full justify-center"
                    onClick={() => onRemove(product)}
                  >
                    Delete
                  </Button>
                  {/* <Button
                    color="primary"
                    variant="contained"
                    className="w-1/2 justify-center"
                    onClick={() => (product)}
                  >
                    Deactive
                  </Button> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center text-bodySm lg:text-h4 font-helvetica_regular text-netral-90">
            {t(`HOMEPAGE.Produk Tidak Ditemukan`)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
