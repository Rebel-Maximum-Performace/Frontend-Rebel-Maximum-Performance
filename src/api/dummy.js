export default {
  serviceGetMainBanners: {
    status: 200,
    data: [
      {
        text: 'Bearing 3/4 Inchi Harley Davidson',
        image: 'https://dummyimage.com/1024x456/ac2525/ffffff&text=Main+Banner',
        url: '#',
      },
      {
        text: 'Bearing 3/4 Inchi Harley Davidson',
        image: 'https://dummyimage.com/1024x456/fff700/000000&text=Main+Banner',
        url: '#',
      },
      {
        text: 'Bearing 3/4 Inchi Harley Davidson',
        image: 'https://dummyimage.com/1024x456/00ff0d/000000&text=Main+Banner',
        url: '#',
      },
      {
        text: 'Bearing 3/4 Inchi Harley Davidson',
        image: 'https://dummyimage.com/1024x456/0009ff/ffffff&text=Main+Banner',
        url: '#',
      },
    ],
  },
  serviceGetCategories: {
    status: 200,
    data: [
      {
        id: 1,
        name: 'Harley Davidson',
      },
      {
        id: 2,
        name: 'Honda Beat Street',
      },
      {
        id: 3,
        name: 'Vespa Matic',
      },
      {
        id: 4,
        name: 'Yamaha Gear',
      },
    ],
  },
  serviceGetProducts: {
    status: 200,
    data: [
      {
        id: '1111-0001',
        name: 'Sportser Brake Master Cover',
        price: 308.0,
        categories: ['Harley Davidson', 'Sportser Brake'],
        image: 'https://dummyimage.com/200x200/d4d4d4/000000&text=Product',
      },
      {
        id: '1122-0022',
        name: 'Spake Board Moge',
        price: 215.43,
        categories: ['Harley Davidson', 'Spake Board'],
        image: 'https://dummyimage.com/200x200/d4d4d4/000000&text=Product',
      },
      {
        id: '1121-0021',
        name: 'Baut Jok Bangku All Type Harley Davidson',
        price: 20.24,
        categories: ['Harley Davidson', 'Baut Jok'],
        image: 'https://dummyimage.com/200x200/d4d4d4/000000&text=Product',
      },
      {
        id: '1112-0002',
        name: 'Bearing 3/4 Inch Harley Davidson',
        price: 20.11,
        categories: ['Harley Davidson', 'Bearing 3/4'],
        image: 'https://dummyimage.com/200x200/d4d4d4/000000&text=Product',
      },
    ],
  },
  serviceGetHorizontalList: {
    status: 200,
    data: [
      {
        title: 'Shop By Model',
        linkViewAll: '#',
        list: [
          {
            name: 'Harley Davidson',
            image:
              'https://dummyimage.com/200x200/ffffff/000000&text=Horizontal+List',
            link: '#',
          },
          {
            name: 'Harley Davidson',
            image:
              'https://dummyimage.com/200x200/ffffff/000000&text=Horizontal+List',
            link: '#',
          },
          {
            name: 'Harley Davidson',
            image:
              'https://dummyimage.com/200x200/ffffff/000000&text=Horizontal+List',
            link: '#',
          },
          {
            name: 'Harley Davidson',
            image:
              'https://dummyimage.com/200x200/ffffff/000000&text=Horizontal+List',
            link: '#',
          },
          {
            name: 'Harley Davidson',
            image:
              'https://dummyimage.com/200x200/ffffff/000000&text=Horizontal+List',
            link: '#',
          },
          {
            name: 'Harley Davidson',
            image:
              'https://dummyimage.com/200x200/ffffff/000000&text=Horizontal+List',
            link: '#',
          },
          {
            name: 'Harley Davidson',
            image:
              'https://dummyimage.com/200x200/ffffff/000000&text=Horizontal+List',
            link: '#',
          },
          {
            name: 'Harley Davidson',
            image:
              'https://dummyimage.com/200x200/ffffff/000000&text=Horizontal+List',
            link: '#',
          },
        ],
      },
      {
        title: 'Shop By Brand',
        linkViewAll: '#',
        list: [
          {
            name: 'Brand 1',
            image:
              'https://dummyimage.com/200x200/ffffff/000000&text=Horizontal+List',
            link: '#',
          },
          {
            name: 'Brand 2',
            image:
              'https://dummyimage.com/200x200/ffffff/000000&text=Horizontal+List',
            link: '#',
          },
          {
            name: 'Brand 3',
            image:
              'https://dummyimage.com/200x200/ffffff/000000&text=Horizontal+List',
            link: '#',
          },
          {
            name: 'Brand 4',
            image:
              'https://dummyimage.com/200x200/ffffff/000000&text=Horizontal+List',
            link: '#',
          },
          {
            name: 'Brand 5',
            image:
              'https://dummyimage.com/200x200/ffffff/000000&text=Horizontal+List',
            link: '#',
          },
          {
            name: 'Brand 6',
            image:
              'https://dummyimage.com/200x200/ffffff/000000&text=Horizontal+List',
            link: '#',
          },
          {
            name: 'Brand 7',
            image:
              'https://dummyimage.com/200x200/ffffff/000000&text=Horizontal+List',
            link: '#',
          },
          {
            name: 'Brand 8',
            image:
              'https://dummyimage.com/200x200/ffffff/000000&text=Horizontal+List',
            link: '#',
          },
        ],
      },
    ],
  },
  serviceGetPromoBanner: {
    status: 200,
    data: {
      text: 'Bearing 3/4 Inchi Harley Davidson',
      image: 'https://dummyimage.com/1024x302/d1d1d1/000000&text=Promo+Banner',
      link: '#',
    },
  },
  serviceGetProductBanner: {
    status: 200,
    data: [
      {
        image: 'https://dummyimage.com/980x100/a31b1b/fff&text=Product+Banner',
        link: '#',
      },
      {
        image: 'https://dummyimage.com/980x100/b84c4c/fff&text=Product+Banner',
        link: '#',
      },
      {
        image: 'https://dummyimage.com/980x100/d97b7b/fff&text=Product+Banner',
        link: '#',
      },
    ],
  },
  serviceGetAttributes: {
    status: 200,
    data: [
      {
        key: 'Model',
        values: ['Harley Davidson', 'Suzuki Ertiga', 'Vespa Matic', 'Honda'],
      },
      {
        key: 'Brand',
        values: [
          'Harley Davidson',
          'Suzuki',
          'Honda',
          'Toyota',
          'Yamaha',
          'Daihatsu',
          'Innova',
        ],
      },
      {
        key: 'Colors',
        values: ['Black', 'White', 'Red', 'Grey', 'Navy', 'Coal'],
      },
    ],
  },
  serviceGetProductDetail: {
    status: 200,
    data: {
      id: '1111-0001',
      name: 'Sportser Brake Master Cover',
      price: 308.0,
      categories: ['Harley Davidson', 'Sportser Brake'],
      images: [
        'https://dummyimage.com/400x400/c92424/ffffff&text=Product+Image',
        'https://dummyimage.com/400x400/c92444/ffffff&text=Product+Image',
        'https://dummyimage.com/400x400/c92464/ffffff&text=Product+Image',
        'https://dummyimage.com/400x400/c92484/ffffff&text=Product+Image',
      ],
      linkAmazon: 'https://www.amazon.com/',
      linkAlibaba: 'https://www.alibaba.com/',
      details: [
        {
          columns: 1,
          items: [
            {
              title: 'Description',
              type: 'text',
              content:
                'The Screaming Eagle air filter is specifically designed to improve the performance of Touring type Harley Davidson engines. With a design that allows more optimal air flow, this filter is able to produce greater power, faster throttle response and a more characteristic engine sound. In addition, the high-quality materials used ensure that this filter is durable and effectively filters dirt, thus keeping the engine long-lasting. For Harley fans who want maximum motorbike performance, the Screaming Eagle air filter is the right choice to provide a more enjoyable riding sensation.',
            },
          ],
        },
        {
          columns: 2,
          items: [
            {
              title: 'Features',
              type: 'list',
              list: [
                'Boost Power: Free air flow, engine power increased',
                'Sound More Sharp: Harley Davidson engine sound becomes more sharp.',
                'High Quality Material: Long-lasting material, dirt filter more effective.',
                'Easy Installation: Plug-and-play design, easy to install.',
              ],
            },
            {
              title: 'Specification',
              type: 'label-value',
              data: [
                { label: 'TYPE', value: 'TOURING' },
                { label: 'MODEL', value: 'SCREAMING EAGLE' },
                { label: 'COLOR', value: 'BLACK' },
              ],
            },
          ],
        },
        {
          columns: 1,
          items: [
            {
              title: 'Fitments',
              type: 'table',
              headers: [
                {
                  label: 'Year',
                  field: 'year',
                  position: 'left',
                },
                {
                  label: 'Brand',
                  field: 'brand',
                  position: 'left',
                },
                {
                  label: 'Model',
                  field: 'model',
                  position: 'left',
                },
              ],
              contents: [
                {
                  year: '2018 - 2022',
                  brand: 'Harley Davidson',
                  model: 'Model 1',
                },
                {
                  year: '2021 - 2022',
                  brand: 'Harley Davidson',
                  model: 'Model 2',
                },
                {
                  year: '2021 - 2022',
                  brand: 'Harley Davidson',
                  model: 'Model 3',
                },
                { year: '2022', brand: 'Harley Davidson', model: 'Model 4' },
                { year: '2023', brand: 'Harley Davidson', model: 'Model 5' },
              ],
            },
          ],
        },
      ],
    },
  },
  serviceGetFAQProduct: {
    status: 200,
    data: [
      {
        questionId:
          'Apa perbedaan antara filter udara Screaming Eagle dan filter udara standar?',
        questionEn:
          'What is the difference between a Screaming Eagle air filter and a standard air filter?',
        answerId:
          'Filter udara Screaming Eagle dirancang khusus untuk meningkatkan performa sepeda motor Harley Davidson. Desainnya yang lebih terbuka memungkinkan aliran udara lebih besar dibandingkan filter standar, sehingga menghasilkan peningkatan tenaga kuda dan torsi. Selain itu, bahan yang digunakan berkualitas lebih tinggi membuatnya lebih efektif dalam menyaring kotoran dan menjaga kebersihan ruang bakar.',
        answerEn:
          'A Screaming Eagle air filter is designed specifically to enhance the performance of Harley Davidson motorcycles. Its more open design allows for greater airflow compared to standard filters, resulting in increased horsepower and torque. Additionally, the higher quality materials used make it more effective at filtering impurities and keeping the combustion chamber clean.',
      },
    ],
  },
  serviceGetMostPopularProducts: {
    status: 200,
    data: [
      {
        id: '1111-0001',
        name: 'Sportser Brake Master Cover',
        searchCount: 10,
      },
      {
        id: '1122-0022',
        name: 'Spake Board Moge',
        searchCount: 10,
      },
      {
        id: '1121-0021',
        name: 'Baut Jok Bangku All Type Harley Davidson',
        searchCount: 10,
      },
      {
        id: '1112-0002',
        name: 'Bearing 3/4 Inch Harley Davidson',
        searchCount: 10,
      },
      {
        id: '1112-0003',
        name: 'Bearing 3/4 Inch Harley Davidson',
        searchCount: 9,
      },
    ],
  },
  serviceGetMostPopularProducts: {
    status: 200,
    data: [
      {
        action: 'Add',
        feature: 'Products',
        createdDate: '20-03-2023 17:22:00',
      },
      {
        action: 'Delete',
        feature: 'Products',
        createdDate: '20-03-2023 17:19:00',
      },
      {
        action: 'Edit',
        feature: 'HomePage Banner',
        createdDate: '20-03-2023 15:10:00',
      },
      {
        action: 'Delete',
        feature: 'Category',
        createdDate: '18-03-2023 07:30:00',
      },
      {
        action: 'Add',
        feature: 'Category',
        createdDate: '18-03-2023 07:28:00',
      },
    ],
  },
  serviceGetCategoriesAdmin: {
    status: 200,
    data: [
      {
        id: 1,
        name: 'Harley Davidson',
      },
      {
        id: 2,
        name: 'Honda Beat Street',
      },
      {
        id: 3,
        name: 'Vespa Matic',
      },
      {
        id: 4,
        name: 'Yamaha Gear',
      },
    ],
  },
  serviceGetHistoriesAdmin: {
    status: 200,
    data: [
      {
        id: 1,
        action: 'Add',
        feature: 'Products',
        createdDate: '20-03-2023 17:22:00',
      },
      {
        id: 2,
        action: 'Delete',
        feature: 'Products',
        createdDate: '20-03-2023 17:19:00',
      },
      {
        id: 3,
        action: 'Edit',
        feature: 'HomePage Banner',
        createdDate: '20-03-2023 15:10:00',
      },
      {
        id: 4,
        action: 'Delete',
        feature: 'Category',
        createdDate: '18-03-2023 07:30:00',
      },
      {
        id: 5,
        action: 'Add',
        feature: 'Category',
        createdDate: '18-03-2023 07:28:00',
      },
    ],
  },
  serviceGetDetailCategoriesAdmin: {
    status: 200,
    data: {
      id: 1,
      createdDate: '20-04-2025 17:22:00',
      action: 'Edit',
      feature: 'Category',
      oldData: {
        id: 1,
        categoryName: 'Harley Davidson',
      },
      newData: {
        id: 1,
        categoryName: 'Harley Touring',
      },
    },
  },
};
