import { useEffect, useState } from "react";
import { ArrowLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CollectionGrid from "../components/CollectionGrid";
import customAxios from "../utils/customAxios";
import summaryApi from "../services/SummaryAPI";

interface Collection {
  _id: string;
  name: string;
  image: string;
  description: string;
  createdAt?: string;
}

const CollectionsPage = () => {
  const navigate = useNavigate();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await customAxios(summaryApi.getCollections);
        if (response.data.success) {
          setCollections(response.data.data);
        } else {
          setError(response.data.message || "Failed to load collections");
        }
      } catch (requestError) {
        console.error("Error fetching collections:", requestError);
        setError("Failed to load collections. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <section className="container section">
      <button
        type="button"
        onClick={() => navigate("/app")}
        className="mb-6 inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors"
      >
        <ArrowLeft size={18} />
        Back to home
      </button>

      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader size={40} className="animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="card p-8 text-center">
          <p className="text-primary font-semibold">{error}</p>
        </div>
      ) : (
        <CollectionGrid collections={collections} showAll />
      )}
    </section>
  );
};

export default CollectionsPage;
