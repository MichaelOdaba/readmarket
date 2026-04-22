import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Collection {
  _id: string;
  name: string;
  image: string;
  description: string;
  createdAt?: string;
}

interface CollectionGridProps {
  collections: Collection[];
}

const CollectionGrid = ({ collections }: CollectionGridProps) => {
  const navigate = useNavigate();

  if (!collections || collections.length === 0) {
    return (
      <section className="py-12 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            No Collections Available
          </h2>
          <p className="text-secondary-text">Collections will be added soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">
              Explore Collections
            </h2>
            <p className="text-secondary-text">
              Browse our curated collection of ebooks and PDFs
            </p>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-2  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collections.map((collection) => (
            <div
              key={collection._id}
              onClick={() => navigate(`/collection/${collection._id}`)}
              className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {/* Collection Image */}
              <div className="relative h-48 bg-border overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white text-sm font-medium flex items-center gap-2">
                    View Collection <ChevronRight size={16} />
                  </span>
                </div>
              </div>

              {/* Collection Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-primary-text truncate mb-2">
                  {collection.name}
                </h3>
                <p className="text-sm text-secondary-text line-clamp-2">
                  {collection.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionGrid;
