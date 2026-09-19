import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Download,
  ShoppingCart,
  ArrowLeft,
  Loader,
  User,
  Edit,
} from "lucide-react";
import { toast } from "sonner";
import customAxios from "../utils/customAxios";
import summaryApi from "../services/SummaryAPI";
import { useSelector } from "react-redux";

interface Product {
  _id: string;
  name: string;
  description: string;
  more_details: string;
  price: number;
  coverImageUrl: string;
  fileUrl: string;
  seller: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  collection: {
    _id: string;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const user = useSelector((state: any) => state?.user);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Product ID not found");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await customAxios(summaryApi.getProductById(id));

        if (response.data.success) {
          setProduct(response.data.data);
          console.log("Product data:", response.data.data);
          setError(null);
        } else {
          setError("Product not found");
        }
      } catch (err: any) {
        console.error("Error fetching product:", err);
        setError(err.response?.data?.message || "Failed to load product");
        toast.error("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDownload = async () => {
    if (!product?._id) {
      toast.error("Product ID not available");
      return;
    }

    try {
      setIsDownloading(true);

      // Call the server download endpoint
      const response = await customAxios(
        summaryApi.endpoints.downloadProduct(product._id),
      );

      if (response.data.success && response.data.fileUrl) {
        // Open the file URL in a new tab for download
        const link = document.createElement("a");
        link.href = response.data.fileUrl;
        link.download = `${product.name}.pdf`;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Download started!");
      } else {
        toast.error(response.data.message || "Failed to get download link");
      }
    } catch (err: any) {
      console.error("Download error:", err);
      const errorMessage =
        err.response?.data?.message || "Failed to download file";
      toast.error(errorMessage);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleAddToCart = () => {
    toast.success("Added to cart!");
    // TODO: Implement add to cart functionality
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral">
        <div className="flex flex-col items-center gap-4">
          <Loader size={40} className="animate-spin text-primary" />
          <p className="text-secondary">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral p-3">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-4">
            {error || "Product not found"}
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn-primary flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-0">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:text-secondary transition mb-6"
        >
          <ArrowLeft size={20} />
          <span>Go Back</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative w-full bg-neutral-100 rounded-lg overflow-hidden">
              {product.coverImageUrl ? (
                <img
                  src={product.coverImageUrl}
                  alt={product.name}
                  className="w-full h-96 md:h-[500px] object-cover"
                />
              ) : (
                <div className="w-full h-96 md:h-[500px] flex items-center justify-center text-secondary">
                  No image available
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col gap-6">
            {/* Collection Badge */}
            {product.collection && product.collection.length > 0 && (
              <div className="inline-flex w-fit">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {product.collection[0].name}
                </span>
              </div>
            )}
            {/* Product Title */}
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-secondary">
                Updated {new Date(product.updatedAt).toLocaleDateString()}
              </p>
            </div>
            {/* Price */}
            <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
              <p className="text-secondary text-sm mb-1">Price</p>
              <p className="text-3xl font-bold text-accent">
                ₦{Number(product.price).toFixed(2)}
              </p>
            </div>
            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-primary mb-2">
                Overview
              </h2>
              <p className="text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>
            {/* More Details */}
            {product.more_details && (
              <div>
                <h2 className="text-lg font-semibold text-primary mb-2">
                  What's Included
                </h2>
                <p className="text-secondary leading-relaxed whitespace-pre-wrap">
                  {product.more_details}
                </p>
              </div>
            )}
            {/* Download Button */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 mb-3">
                <strong>Ready to access?</strong> Download this product to start
                using it immediately.
              </p>
              <button
                onClick={handleDownload}
                disabled={isDownloading}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    Download Product
                  </>
                )}
              </button>
            </div>
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-neutral-200 hover:bg-neutral-300 text-primary font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            {/* Edit Product Button (only for seller) */}
            {product.seller._id === user?._id && (
              <button
                onClick={() =>
                  navigate(`/dashboard/product/${product._id}/edit`)
                }
                className="w-full bg-yellow-100 hover:bg-green-200 text-green-800 font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                //style the button to fit the current design, maybe make it smaller and less prominent than the download and add to cart buttons
              >
                <Edit size={20} />
                Edit Product
              </button>
            )}
            {/* Seller Info  */}
            <div className="bg-surface-raised rounded-lg p-4 border border-neutral-200 flex flex-col gap-3">
              <p className="text-xs text-secondary mb-3">Sold by</p>
              <div className="flex flex-col md:flex-row items-center md:justify-between gap-3">
                <div className="w-18 h-18 bg-neutral-300 rounded-full flex items-center justify-center">
                  {/* if seller has an avatar */}
                  {product.seller.avatar ? (
                    <img
                      src={product.seller.avatar}
                      alt={`${product.seller.firstName} ${product.seller.lastName}`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User size={24} className="text-neutral-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-primary">
                    {product.seller.firstName} {product.seller.lastName}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-primary">
                    {product.seller.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface rounded-lg p-4 border border-neutral-200 text-center">
            <p className="text-sm text-secondary">Preview Images</p>
          </div>
          <div className="bg-surface rounded-lg p-4 border border-neutral-200 text-center">
            <p className="text-2xl font-bold text-primary">1</p>
            <p className="text-sm text-secondary">Product File</p>
          </div>
          <div className="bg-surface rounded-lg p-4 border border-neutral-200 text-center">
            <p className="text-2xl font-bold text-primary">
              {Math.floor(Math.random() * 500) + 10}
            </p>
            <p className="text-sm text-secondary">Downloads</p>
          </div>
          <div className="bg-surface rounded-lg p-4 border border-neutral-200 text-center">
            <p className="text-2xl font-bold text-primary">
              {(Math.random() * 2 + 3).toFixed(1)}★
            </p>
            <p className="text-sm text-secondary">Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
