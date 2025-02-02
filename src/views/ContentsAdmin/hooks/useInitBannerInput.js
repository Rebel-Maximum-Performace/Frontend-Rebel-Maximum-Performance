import { useWebContext } from '@/context/WebContext';
import { useEffect, useRef, useState } from 'react';

const useInitBannerInput = ({
  type,
  setDataForm,
  dataForm,
  banners,
  defaultActiveBanner,
  setRemoveImages,
}) => {
  const { t } = useWebContext();
  const swiperRef = useRef(null);
  const [activeBanner, setActiveBanner] = useState({ isInput: true });
  const [popupDeleteConfirmation, setPopupDeleteConfirmation] = useState(false);

  const handleChangeActiveBanner = (swiper) => {
    const selectedData = banners.find(
      (_, index) => index === swiper.activeIndex,
    );
    if (selectedData) {
      setActiveBanner({ ...selectedData, index: swiper.activeIndex });
    } else {
      setActiveBanner({ isInput: true });
    }
  };

  const validateImage = (files = []) => {
    const validFormats = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    let result = {
      invalidFormats: [],
      tooLarge: [],
      valid: [],
    };

    files.map((file) => {
      if (!validFormats.includes(file.type)) {
        result.invalidFormats.push(file.name);
      } else if (file.size > maxSize) {
        result.tooLarge.push(file.name);
      } else {
        result.valid.push(file);
      }
    });

    if (result.invalidFormats.length > 0) {
      return {
        isError: true,
        message: `${t(
          `BANNER.Terdapat file dengan format yang tidak valid`,
        )}. File: ${result.invalidFormats.join(', ')}`,
      };
    }

    if (result.tooLarge.length > 0) {
      return {
        isError: true,
        message: `${t(
          `BANNER.Terdapat file yang melebihi ukuran maksimal`,
        )}. File: ${result.tooLarge.join(', ')}`,
      };
    }

    return {
      isError: false,
      data: result.valid,
    };
  };

  const onChangeImage = async (event) => {
    const files = event.target.files;
    const resultValidate = validateImage([...files]);
    event.target.value = '';

    if (resultValidate.isError) {
      setActiveBanner({ ...activeBanner, ...resultValidate });
      return;
    }

    const datas = resultValidate.data;

    if (type === 'promotionBanner') {
      const dataBanner = {
        link: '',
        order: 1,
        image: datas[0],
      };

      setDataForm((prev) => ({
        ...prev,
        promotionBanner: [dataBanner],
      }));

      setActiveBanner(dataBanner);
    } else {
      const withoutInput = dataForm[type].filter((data) => !data.isInput);
      const newData = datas.map((data, idx) => ({
        link: '',
        order: withoutInput.length + (idx + 1),
        image: data,
      }));
      await new Promise((resolve) => {
        resolve(
          setDataForm((prev) => {
            return {
              ...prev,
              [type]: [...withoutInput, ...newData],
            };
          }),
        );
      });

      const finalData = [...withoutInput, ...newData];

      setActiveBanner(finalData[finalData.length - 1]);
      swiperRef.current?.slideTo(finalData.length - 1);
    }
  };

  const onChangeDetail = (field, value) => {
    setActiveBanner((prev) => ({ ...prev, [field]: value }));
    setDataForm((prev) => ({
      ...prev,
      [type]: prev[type].map((data) =>
        data.order === activeBanner.order ? { ...data, [field]: value } : data,
      ),
    }));
  };

  const onDeleteBanner = () => {
    setPopupDeleteConfirmation(true);
  };

  const onChangeOrder = (newOrder) => {
    let updatedBanners = [...banners?.filter((b) => !b.isInput)];
    const currentBanner = updatedBanners.find(
      (b) => b.order === activeBanner.order,
    );
    const previousOrder = currentBanner.order;

    updatedBanners = updatedBanners.map((b) => {
      if (b.order == previousOrder) {
        return { ...b, order: Number(newOrder) };
      } else if (b.order == newOrder) {
        return { ...b, order: previousOrder };
      }
      return b;
    });

    updatedBanners.sort((a, b) => a.order - b.order);
    setDataForm((prev) => ({
      ...prev,
      [type]: updatedBanners,
    }));
    setActiveBanner({ ...currentBanner, order: newOrder });
    swiperRef.current?.slideTo(newOrder - 1);
  };

  const getWidthBanner = (type) => {
    switch (type) {
      case 'mainBanner':
        return 'pt-[42.22%]';
      case 'promotionBanner':
        return 'pt-[27.96%]';
      case 'productPageBanner':
        return 'pt-[10.20%]';
      default:
        return '';
    }
  };

  const onClosePopup = () => {
    setPopupDeleteConfirmation(false);
  };

  const handleDeleteBanner = () => {
    if (activeBanner.filename) {
      setRemoveImages((prev) => [...prev, activeBanner.filename]);
    }

    let updatedBanners = banners.filter(
      (b) => b.order !== activeBanner.order && !b.isInput,
    );
    updatedBanners = updatedBanners.map((b, index) => ({
      ...b,
      order: index + 1,
    }));
    setDataForm((prev) => ({
      ...prev,
      [type]: updatedBanners,
    }));
    if (activeBanner.index > 0) {
      swiperRef.current?.slidePrev();
    }

    setPopupDeleteConfirmation(false);
  };

  useEffect(() => {
    if (defaultActiveBanner) {
      setActiveBanner(defaultActiveBanner);
    }
  }, [defaultActiveBanner]);

  return {
    t,
    swiperRef,
    activeBanner,
    handleChangeActiveBanner,
    onChangeImage,
    onChangeDetail,
    onDeleteBanner,
    onChangeOrder,
    getWidthBanner,
    popupDeleteConfirmation,
    onClosePopup,
    handleDeleteBanner,
  };
};

export default useInitBannerInput;
