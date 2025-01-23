const Categopry = ({ data }) => {
  return (
    <div className="flex space-x-[10px] lg:space-x-[15px] items-center">
      <div className="font-helvetica_regular text-bodySm lg:text-bodyBase">
        <p>Id</p>
        <p>Category Name</p>
      </div>
      <div className="font-helvetica_regular text-bodySm lg:text-bodyBase">
        <p>:</p>
        <p>:</p>
      </div>
      <div className="font-helvetica_regular text-bodySm lg:text-bodyBase">
        <p>{data.id || '-'}</p>
        <p>{data.categoryName || '-'}</p>
      </div>
    </div>
  );
};

export default Categopry;
