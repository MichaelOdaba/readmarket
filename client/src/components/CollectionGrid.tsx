import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";

interface Collection {
  _id: string;
  name: string;
  image: string;
  description: string;
  createdAt?: string;
}

interface CollectionGridProps {
  collections: Collection[];
  showAll?: boolean;
}

const CollectionGrid = ({ collections, showAll = false }: CollectionGridProps) => {
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
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              Explore Collections
            </h2>
            <p className="text-secondary-text">
              Browse our curated collection of ebooks and PDFs
            </p>
          </div>
          {!showAll && collections.length > 8 && (
            <button
              type="button"
              onClick={() => navigate("/app/collections")}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary transition-colors self-start sm:self-auto"
            >
              View all <ArrowRight size={16} />
            </button>
          )}
        </div>

        {/* Collections Grid */}
        <div
          className={
            showAll
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory sm:gap-6"
          }
        >
          {(showAll ? collections : collections.slice(0, 8)).map((collection) => (
            <article
              key={collection._id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/app/collection/${collection._id}`)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  navigate(`/app/collection/${collection._id}`);
                }
              }}
              className="group min-w-[calc(50%_-_0.75rem)] snap-start cursor-pointer bg-surface rounded-lg overflow-hidden shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 sm:min-w-[calc(33.333%_-_1rem)]"
            >
              {/* Collection Image */}
              <div className="relative h-32 sm:h-48 bg-border overflow-hidden">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionGrid;
