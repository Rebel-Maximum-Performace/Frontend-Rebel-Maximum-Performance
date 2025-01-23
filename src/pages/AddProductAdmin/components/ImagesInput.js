import Image from 'next/image';
import { FaImage } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';

const ImagesInput = ({
  t,
  images,
  handleImageChange,
  imageRef,
  handleRemoveImage,
  errorFields,
}) => (
  <>
    <p className="text-bodySm lg:text-bodyBase font-helvetica_bold text-netral-90">
      {t(`ADD_PRODUCT.Ketentuan Gambar Produk`)}
    </p>
    <ul className="list-disc list-inside font-helvetica_regular">
      <li className="text-bodySm lg:text-bodyBase text-primary-50">
        Resolution 400 x 400 px
      </li>
      <li className="text-bodySm lg:text-bodyBase mb-[15px] lg:mb-[30px] text-primary-50">
        Max. 10mb
      </li>
    </ul>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {images.map((image, index) => (
        <div key={index} className="relative aspect-w-1 aspect-h-1">
          <Image
            src={URL.createObjectURL(image)}
            alt={`Uploaded ${index}`}
            className="w-full object-cover rounded-md shadow"
            width={100}
            height={100}
          />
          <div
            onClick={() => handleRemoveImage(index)}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
          >
            <IoMdCloseCircle className="text-[18px] lg:text-[24px]" />
          </div>
        </div>
      ))}
      <label
        htmlFor="imageInput"
        className="cursor-pointer border-4 text-netral-40 font-helvetica_regular border-netral-40 border-dashed w-full aspect-w-1 aspect-h-1 flex flex-col justify-center items-center rounded-[10px] lg:rounded-[15px] hover:bg-secondary-10/30"
      >
        <div className="flex flex-col justify-center items-center">
          <FaImage className="sm:text-[30px] md:text-[40px] lg:text-[50px]" />
          {errorFields.images.isError ? (
            <p className="text-bodySm lg:text-h5 text-center text-primary-50">
              {errorFields.images.message}
            </p>
          ) : (
            <>
              <p className="text-bodySm lg:text-h5 text-center">
                {t(`CONTENTS.Unggah / Letakkan Di Sini`)}
              </p>
            </>
          )}
        </div>
        <input
          name="imageInput"
          id="imageInput"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          value={''}
          onChange={handleImageChange}
          ref={imageRef}
        />
      </label>
    </div>
  </>
);

export default ImagesInput;
