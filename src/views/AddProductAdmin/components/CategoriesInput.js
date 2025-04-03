import Select from '@/components/Form/Select';
import { IoMdCloseCircle } from 'react-icons/io';

const CategoriesInput = ({
  dataForm,
  errorFields,
  onChangeDataForm,
  t,
  categories,
  handleRemoveCategory,
}) => (
  <>
    <Select
      options={(categories || [])
        .filter(
          (category) =>
            !dataForm.categories.some((cat) => cat.id === category.id),
        )
        .map((category) => ({
          label: category.name,
          value: category.id,
        }))}
      isError={errorFields.category.isError}
      helperText={errorFields.category.message}
      value={null}
      label={t('PRODUCTS.Kategori')}
      placeholder={t('HOMEPAGE.Pilih Kategori')}
      isSearchable
      onChange={(value) => onChangeDataForm('categories', value)}
    />

    <div
      className={`flex space-x-2 rounded-[10px] lg:rounded-[15px] border p-[10px] my-[15px] lg:my-[30px] min-h-[200px] w-full ${
        errorFields.category.isError ? 'border-primary-30' : 'border-netral-40'
      }`}
    >
      {(dataForm.categories || []).map((cat, index) => (
        <div
          key={index}
          className="font-helvetica_regular w-max h-max mb-2 rounded-[10px] lg:rounded-[15px] space-x-[10px] bg-secondary-10 p-[7px] flex items-center text-netral-90"
        >
          <p className="text-bodySm lg:text-bodyBase">{cat.name}</p>
          <IoMdCloseCircle
            className="text-[18px] lg:text-[24px] cursor-pointer"
            onClick={() => handleRemoveCategory(index)}
          />
        </div>
      ))}
    </div>
  </>
);

export default CategoriesInput;
