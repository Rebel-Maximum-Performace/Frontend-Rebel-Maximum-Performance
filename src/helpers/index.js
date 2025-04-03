export const mappingErrorFieldHorizontalList = (t, type) => {
  switch (type) {
    case 'title':
      return t(`CONTENTS.Judul harus diisi`);
    case 'link':
      return t(`CONTENTS.Link harus diisi`);
    case 'invalid-link':
      return t(`CONTENTS.Link tidak valid`);
    case 'name':
      return t(`CONTENTS.Nama harus diisi`);
    case 'images':
      return t(`CONTENTS.Daftar Horisontal setidaknya harus memilki 1 gambar`);
    case 'invalid-size':
      return t(`CONTENTS.File melebihi batas ukuran`);
    case 'invalid-format':
      return t(`CONTENTS.Format file tidak valid`);
    default:
      return '';
  }
};

export const mappingErrorFieldProduct = (t, type) => {
  switch (type) {
    case 'productName':
      return t(`ADD_PRODUCT.Nama Produk harus diisi`);
    case 'sku':
      return t(`ADD_PRODUCT.Kode Produk harus diisi`);
    case 'amazonLink':
      return t(`ADD_PRODUCT.Link Amazon harus diisi`);
    case 'alibabaLink':
      return t(`ADD_PRODUCT.Link Alibaba harus diisi`);
    case 'invalid-link':
      return t(`CONTENTS.Link tidak valid`);
    case 'price':
      return t(`ADD_PRODUCT.Harga harus diisi`);
    case 'category':
      return t(`ADD_PRODUCT.Kategori harus diisi`);
    case 'images':
      return t(`ADD_PRODUCT.Produk setidaknya harus memilki 1 gambar`);
    case 'invalid-size':
      return t(`CONTENTS.File melebihi batas ukuran`);
    case 'invalid-format':
      return t(`CONTENTS.Format file tidak valid`);
    case 'title':
      return t(`CONTENTS.Judul harus diisi`);
    case 'description':
      return t(`ADD_PRODUCT.Deskripsi harus diisi`);
    case 'label':
      return t(`ADD_PRODUCT.Label harus diisi`);
    case 'value':
      return t(`ADD_PRODUCT.Value harus diisi`);
    case 'header':
      return t(`ADD_PRODUCT.Header harus diisi`);
    case 'question':
      return t(`ADD_PRODUCT.Pertanyaan harus diisi`);
    case 'answer':
      return t(`ADD_PRODUCT.Jawaban harus diisi`);
    default:
      return '';
  }
};

export const arrayCategoryToString = (array) => {
  return array.map((item) => item).join(', ');
};

export const getSortFilter = (value) => {
  switch (value) {
    case 'lowest-price':
    case 'highest-price':
      return 'Price';
    case 'best-seller':
      return 'Best-Seller';
    default:
      return 'Popular';
  }
};

export const getOrderFilter = (value) => {
  switch (value) {
    case 'lowest-price':
      return 'asc';
    case 'highest-price':
      return 'desc';
    default:
      return 'desc';
  }
};
