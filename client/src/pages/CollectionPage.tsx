import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Loader } from "lucide-react";
import customAxios from "../utils/customAxios";
import summaryApi from "../services/SummaryAPI";

interface Collection {
  _id: string;
  name: string;
  image: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Product {
  _id: string;
  name: string;
  image: string[];
  price: string;
  discount?: number;
  description: string;
  collection: Collection[];
}

interface PaginationInfo {
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}

const CollectionPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch collection products
        const response = await customAxios({
          ...summaryApi.getCollectionProducts(id!, currentPage, 12),
        });

        if (response.data.success) {
          setCollection(response.data.collection);
          setProducts(response.data.data);
          setPagination(response.data.pagination);
        } else {
          setError(response.data.message || "Failed to fetch collection");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCollectionData();
    }
  }, [id, currentPage]);

  if (isLoading) {
    return (
      <section className="container section flex justify-center items-center min-h-screen">
        <Loader size={40} className="animate-spin text-primary" />
      </section>
    );
  }

  if (error || !collection) {
    return (
      <section className="container section">
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <p className="text-lg text-secondary-text">
            {error || "Collection not found"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
          >
            Back to Home
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container section">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-primary hover:text-secondary mb-6 transition-colors"
      >
        <ChevronLeft size={20} />
        Back
      </button>

      {/* Collection Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
          {/* Collection Image */}
          <div className="flex justify-center items-center">
            <img
              src={collection.image}
              alt={collection.name}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>

          {/* Collection Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-primary mb-4">
              {collection.name}
            </h1>
            <p className="text-lg text-secondary-text mb-6">
              {collection.description}
            </p>
            <div className="text-secondary-text text-sm">
              <p>
                {pagination?.totalProducts || 0} book
                {pagination?.totalProducts !== 1 ? "s" : ""} in collection
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">
              Books in {collection.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {/* Product Image */}
                  <div className="h-48 bg-border overflow-hidden">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-primary-text truncate mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-secondary-text line-clamp-2 mb-4">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-accent">
                        ₹{product.price}
                      </span>
                      {product.discount && (
                        <span className="text-sm bg-accent/10 text-accent px-2 py-1 rounded">
                          {product.discount}% off
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-primary text-white rounded-lg disabled:bg-border disabled:text-secondary-text cursor-not-allowed hover:bg-secondary transition-colors"
              >
                Previous
              </button>

              <div className="flex gap-1">
                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 rounded-lg transition-colors ${
                      currentPage === page
                        ? "bg-accent text-white"
                        : "bg-border text-primary-text hover:bg-secondary-text/20"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === pagination.totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-primary text-white rounded-lg disabled:bg-border disabled:text-secondary-text cursor-not-allowed hover:bg-secondary transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-secondary-text">
            No books found in this collection yet.
          </p>
        </div>
      )}
    </section>
  );
};

export default CollectionPage;
