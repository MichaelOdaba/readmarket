import { useEffect, useState } from "react";
import { ShoppingCart, Star, User, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import customAxios from "../utils/customAxios";
import summaryApi from "../services/SummaryAPI";
import { toast } from "sonner";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  seller: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  collection: {
    _id: string;
    name: string;
  }[];
  createdAt: string;
}

interface ProductsGridProps {
  limit?: number;
  featured?: boolean;
}

/**
 * ProductsGrid Component
 * Displays products in a responsive grid layout
 * Can be used on home page or dedicated products page
 *
 * Props:
 * - limit: Number of products to display (default: all)
 * - featured: If true, shows only featured products
 */
const ProductsGrid: React.FC<ProductsGridProps> = ({ limit, featured }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await customAxios({
          ...summaryApi.getAllProducts,
        });

        if (response.data.success) {
          let productsData = response.data.data;

          // Filter by limit if provided
          if (limit) {
            productsData = productsData.slice(0, limit);
          }

          setProducts(productsData);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [limit]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-96 bg-red-50 rounded-lg">
        <div className="text-center">
          <p className="text-red-600 font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 btn-primary text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-96 bg-neutral-100 rounded-lg">
        <div className="text-center">
          <p className="text-secondary font-semibold">No products found</p>
          <p className="text-sm text-secondary mt-1">
            Products will appear here soon
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Grid Container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

/**
 * Individual Product Card Component
 * Displays product information in a card format
 */
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };
  console.log(product._id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Added to cart!");
    // TODO: Implement add to cart functionality
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
    >
      {/* Image Container */}
      <div className="relative w-full overflow-hidden bg-neutral-100 h-48 md:h-56">
        {product.image && product.image.length > 0 && (
          <img
            src={product.image[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        )}

        {/* Overlay Actions - Visible on Hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3">
            <button
              onClick={handleAddToCart}
              className="bg-accent text-white p-3 rounded-full hover:bg-opacity-90 transition transform hover:scale-110"
              title="Add to cart"
            >
              <ShoppingCart size={20} />
            </button>
            <button
              onClick={() => navigate(`/product/${product._id}`)}
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition text-sm font-semibold"
            >
              View Details
            </button>
          </div>
        )}

        {/* Badge - Number of Images */}
        {product.image && product.image.length > 1 && (
          <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-bold">
            +{product.image.length - 1}
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col gap-3">
        {/* Product Name */}
        <div>
          <p className="text-sm font-semibold text-secondary mb-1">
            {product.collection && product.collection.length > 0
              ? product.collection[0].name
              : "Uncategorized"}
          </p>
          <h3 className="font-bold text-primary line-clamp-2 group-hover:text-secondary transition">
            {product.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-secondary line-clamp-2">
          {product.description}
        </p>

        {/* Seller Info */}
        <div className="flex items-center gap-2 pt-2 border-t border-neutral-200">
          <div className="w-6 h-6 bg-neutral-300 rounded-full flex items-center justify-center">
            <User size={14} className="text-neutral-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-secondary">
              {product.seller.firstName} {product.seller.lastName}
            </p>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
          <div>
            <p className="text-xs text-secondary">Starting at</p>
            <p className="text-lg font-bold text-primary">
              ₦{Number(product.price).toFixed(2)}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="hidden lg:flex bg-accent text-white p-2 rounded-lg hover:bg-opacity-90 transition"
            title="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;
