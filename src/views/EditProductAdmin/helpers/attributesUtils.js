export const attributesUtils = (details) => {
  const oldAttributes = [];
  const newAttributes = [];

  // const addAttributes = [];
  // const removeProductAttributes = [];

  // Set Old Attributes
  responseDetail.data.data.details
    .filter(
      (item) =>
        item.items.filter(
          (item) => item.type === 'label-value' || item.type === 'table',
        ).length > 0,
    )
    .forEach((item) => {
      item.items.forEach((item) => {
        if (item.type === 'label-value') {
          item.data.forEach((item) => {
            oldAttributesData.push({
              id: item.id,
              name: item.label,
              values: [item.value],
            });
          });
        } else if (item.type === 'table') {
          item.headers.forEach((header) => {
            oldAttributesData.push({
              name: header.label,
              values: item.contents.map((content) => content[header.field]),
            });
          });
        }
      });
    });
  // details
  //   .filter(
  //     (item) =>
  //       item.items.filter(
  //         (item) => item.type === 'label-value' || item.type === 'table',
  //       ).length > 0,
  //   )
  //   .map((item) =>
  //     item.items.map((item) => {
  //       if (item.type === 'label-value') {
  //         item.data.map((item) => {
  //           attributes.push({
  //             name: item.label,
  //             values: [item.value],
  //           });
  //         });
  //       } else if (item.type === 'table') {
  //         item.headers.map((header) => {
  //           attributes.push({
  //             name: header.label,
  //             values: item.contents.map((content) => content[header.field]),
  //           });
  //         });
  //       }
  //     }),
  //   );
  // attributes.map((attribute, index) => {
  //   formData.append(`attributes[${index}][name]`, attribute.name);
  //   attribute.values.map((value, valueIndex) => {
  //     formData.append(`attributes[${index}][values][${valueIndex}]`, value);
  //   });
  // });
};
