import {
  useAddBanner,
  useEditBanner,
  useGetAllBanners,
} from '@/api/contents/useMutation';
import { useWebContext } from '@/context/WebContext';
import { useEffect, useState } from 'react';

const useFormInputBanner = () => {
  const { t, setLoading, onErrorMutation } = useWebContext();
  const rulesBanners = {
    mainBanner: [
      `*${t(`CONTENTS.Resolusi`)} 1080 x 456 px`,
      `*${t(`CONTENTS.Maks. ukuran file 5mb`)}`,
    ],
    promotionBanner: [
      `*${t(`CONTENTS.Resolusi`)} 1080 x 302 px`,
      `*${t(`CONTENTS.Maks. ukuran file 5mb`)}`,
    ],
    productPageBanner: [
      `*${t(`CONTENTS.Resolusi`)} 980 x 100 px`,
      `*${t(`CONTENTS.Maks. ukuran file 5mb`)}`,
    ],
  };

  const [dataForm, setDataForm] = useState({
    mainBanner: [],
    promotionBanner: [],
    productPageBanner: [],
  });
  const [removeImages, setRemoveImages] = useState([]);
  const [popupContents, setPopupContents] = useState({
    isOpen: false,
    type: '',
    message: '',
  });
  const [defaultActiveBanner, setDefaultActiveBanner] = useState({
    mainBanner: null,
    promotionBanner: null,
    productPageBanner: null,
  });

  const { mutate: getAllBanners } = useGetAllBanners();

  const { mutate: addBanner } = useAddBanner({
    onError: onErrorMutation,
    onSuccess: () => {
      setPopupContents({
        isOpen: true,
        type: 'success',
        message: t(`COMPONENT.Berhasil Disimpan`),
      });
      setLoading(false);
    },
  });

  const { mutate: editBanner } = useEditBanner({
    onError: onErrorMutation,
    onSuccess: () => {
      setPopupContents({
        isOpen: true,
        type: 'success',
        message: t(`COMPONENT.Berhasil Disimpan`),
      });
      setLoading(false);
    },
  });

  const onClickAddBanner = () => {
    // Validasi Main Banner
    if (dataForm.mainBanner && Array.isArray(dataForm.mainBanner)) {
      const isNotValid = dataForm.mainBanner.some(
        (banner) => !banner.text || !banner.link,
      );

      if (isNotValid) {
        setPopupContents({
          isOpen: true,
          type: 'warning',
          message: t(`BANNER.Data Spanduk Utama tidak lengkap`),
        });
        return;
      }
    }

    // Validasi Promotion Banner
    if (dataForm.promotionBanner && Array.isArray(dataForm.promotionBanner)) {
      const isNotValid = dataForm.promotionBanner.some(
        (banner) => !banner.text || !banner.link,
      );

      if (isNotValid) {
        setPopupContents({
          isOpen: true,
          type: 'warning',
          message: t(
            `BANNER.Data Spanduk Produk Baru / Spanduk Promo tidak lengkap`,
          ),
        });
        return;
      }
    }

    setPopupContents({
      isOpen: true,
      type: 'confirmation',
      message: t(`BANNER.Apa anda yakin ingin menyimpan spanduk`),
    });
  };

  const onClosePopup = () => {
    if (popupContents.type === 'success') {
      window.location.reload();
    }

    setPopupContents({
      isOpen: false,
      type: '',
      message: '',
    });
  };

  const handleSaveBanner = () => {
    setPopupContents({
      isOpen: false,
      type: '',
      message: '',
    });
    setLoading(true);

    const payload = new FormData();

    if (dataForm.mainBanner?.length > 0) {
      dataForm.mainBanner.forEach((banner, idx) => {
        if (banner.id) {
          payload.append(`mainBanner[${idx}][id]`, banner.id);
          payload.append(`mainBanner[${idx}][filename]`, banner.filename);
        }
        payload.append(`mainBanner[${idx}][image]`, banner.image);
        payload.append(`mainBanner[${idx}][text]`, banner.text);
        payload.append(`mainBanner[${idx}][link]`, banner.link);
        payload.append(`mainBanner[${idx}][order]`, banner.order);
      });
    } else {
      payload.append(`mainBanner`, []);
    }

    if (dataForm.productPageBanner?.length > 0) {
      dataForm.productPageBanner.forEach((banner, idx) => {
        if (banner.id) {
          payload.append(`productPageBanner[${idx}][id]`, banner.id);
          payload.append(
            `productPageBanner[${idx}][filename]`,
            banner.filename,
          );
        }
        payload.append(`productPageBanner[${idx}][image]`, banner.image);
        payload.append(`productPageBanner[${idx}][order]`, banner.order);
      });
    } else {
      payload.append(`productPageBanner`, []);
    }

    if (dataForm.promotionBanner?.[0]) {
      if (dataForm.promotionBanner?.[0]?.id) {
        payload.append(
          `promotionBanner[id]`,
          dataForm.promotionBanner?.[0]?.id,
        );
        payload.append(
          `promotionBanner[filename]`,
          dataForm.promotionBanner?.[0]?.filename,
        );
      }

      payload.append(
        `promotionBanner[image]`,
        dataForm.promotionBanner?.[0]?.image,
      );
      payload.append(
        `promotionBanner[text]`,
        dataForm.promotionBanner?.[0]?.text,
      );
      payload.append(
        `promotionBanner[link]`,
        dataForm.promotionBanner?.[0]?.link,
      );
    } else {
      payload.append(`promotionBanner`, null);
    }

    if (
      defaultActiveBanner.mainBanner ||
      defaultActiveBanner.productPageBanner ||
      defaultActiveBanner.promotionBanner
    ) {
      removeImages.forEach((filename, idx) => {
        payload.append(`removeImages[${idx}]`, filename);
      });
      payload.append(`isEdit`, true);
      editBanner(payload);
    } else {
      addBanner(payload);
    }
  };

  useEffect(() => {
    getAllBanners(null, {
      onError: onErrorMutation,
      onSuccess: (data) => {
        setDataForm({
          mainBanner: data?.data?.data?.mainBanner || [],
          promotionBanner: data?.data?.data?.promotionBanner
            ? [data?.data?.data?.promotionBanner]
            : [],
          productPageBanner: data?.data?.data?.productPageBanner || [],
        });
        setDefaultActiveBanner({
          mainBanner: data?.data?.data?.mainBanner[0]
            ? { ...data?.data?.data?.mainBanner[0], index: 0 }
            : null,
          promotionBanner: data?.data?.data?.promotionBanner
            ? {
                ...data?.data?.data?.promotionBanner,
                index: 0,
              }
            : null,
          productPageBanner: data?.data?.data?.productPageBanner[0]
            ? {
                ...data?.data?.data?.productPageBanner[0],
                index: 0,
              }
            : null,
        });
      },
    });
  }, []);

  return {
    t,
    rulesBanners,
    dataForm,
    setDataForm,
    popupContents,
    onClickAddBanner,
    onClosePopup,
    handleSaveBanner,
    defaultActiveBanner,
    setRemoveImages,
  };
};

export default useFormInputBanner;
