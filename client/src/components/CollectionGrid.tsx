import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || showAll) return;

    const updateScrollState = () => {
      setCanScrollBack(track.scrollLeft > 4);
      setCanScrollForward(
        track.scrollLeft + track.clientWidth < track.scrollWidth - 4
      );
    };

    updateScrollState();
    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [collections.length, showAll]);

  const scrollCollections = (direction: "back" | "forward") => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({
      left: direction === "forward" ? track.clientWidth * 0.85 : -track.clientWidth * 0.85,
      behavior: "smooth",
    });
  };

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
            <p className="text-sm md:text-md text-primary">
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
          ref={trackRef}
          className={
            showAll
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "collection-track flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory sm:gap-6"
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
              className="collection-card group min-w-[calc(100vw-3.5rem)] snap-start cursor-pointer bg-surface rounded-lg overflow-hidden shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 sm:min-w-[calc(33.333%_-_1rem)]"
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

        {!showAll && collections.length > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-secondary-text sm:hidden">
              Swipe or use the arrows to explore
            </p>
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollCollections("back")}
                disabled={!canScrollBack}
                className="rounded-full border border-border p-2 text-primary transition hover:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous collection"
                title="Previous collection"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollCollections("forward")}
                disabled={!canScrollForward}
                className="rounded-full border border-border p-2 text-primary transition hover:bg-surface-raised disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next collection"
                title="Next collection"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CollectionGrid;
