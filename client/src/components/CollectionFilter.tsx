import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface Collection {
  _id: string;
  name: string;
  image: string;
  description: string;
}

interface CollectionFilterProps {
  collections: Collection[];
  selectedCollection: string | null;
  onCollectionChange: (collectionId: string | null) => void;
}

const CollectionFilter = ({
  collections,
  selectedCollection,
  onCollectionChange,
}: CollectionFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!collections || collections.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface rounded-lg shadow-md p-4 mb-6">
      {/* Filter Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-primary">Collections</h3>
        <button className="text-secondary-text hover:text-primary transition-colors">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Filter Options */}
      {isExpanded && (
        <div className="mt-4 space-y-3">
          {/* Clear Filter Option */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="collection"
              checked={selectedCollection === null}
              onChange={() => onCollectionChange(null)}
              className="w-4 h-4 cursor-pointer accent-accent rounded"
            />
            <span className="text-secondary-text group-hover:text-primary-text transition-colors">
              All Collections
            </span>
          </label>

          {/* Collection Options */}
          {collections.map((collection) => (
            <label
              key={collection._id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="collection"
                checked={selectedCollection === collection._id}
                onChange={() => onCollectionChange(collection._id)}
                className="w-4 h-4 cursor-pointer accent-accent rounded"
              />
              <span className="text-secondary-text group-hover:text-primary-text transition-colors truncate">
                {collection.name}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollectionFilter;
