import ProductsGrid from "../components/ProductsGrid";

const SearchPage = () => {
  return (
    <div className="w-full container">
      {/*insert the products grid here*/}
      <div className="mt-10">
        {/* Product cards will go here */}

        <ProductsGrid />
      </div>
    </div>
  );
};

export default SearchPage;
