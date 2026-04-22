import { useState, useEffect } from "react";
import banner from "../assets/banner1.jpeg";
import banner2 from "../assets/banner2.jpeg";
import { useMobile } from "../hooks/useMobile";
import CollectionGrid from "../components/CollectionGrid";
import customAxios from "../utils/customAxios";
import summaryApi from "../services/SummaryAPI";
import { Loader } from "lucide-react";

interface Collection {
  _id: string;
  name: string;
  image: string;
  description: string;
}

const Home = () => {
  const [isMobile] = useMobile();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const response = await customAxios(summaryApi.getCollections);
        if (response.data.success) {
          setCollections(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
        setCollections([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div>
      <section className={"container section"}>
        <div className="flex flex-col px-6">
          {isLoading ? (
            <div className="h-[30vh] md:h-[50vh] flex items-center justify-center">
              <Loader size={40} className="animate-spin text-primary" />
            </div>
          ) : (
            <img
              src={isMobile ? banner2 : banner}
              alt="banner"
              className="object-cover card md:h-[50vh] h-[30vh] mt-10 h"
            />
          )}
        </div>
      </section>

      {/* Collections Section */}
      {!isLoading && <CollectionGrid collections={collections} />}
    </div>
  );
};

export default Home;
