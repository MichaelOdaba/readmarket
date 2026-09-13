import { SearchIcon, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  return (
    <section className="container section">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-primary hover:text-secondary"
      >
        <ArrowLeft size={18} />
        Back
      </button>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-3xl font-bold text-primary">Search resources</h1>
        <p className="mb-6 text-secondary-text">Find ebooks, PDFs, and study materials.</p>
        <label className="search-surface input flex w-full items-center gap-3 rounded-full">
          <SearchIcon className="search-icon shrink-0" />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for a resource"
            className="w-full bg-transparent outline-none"
            aria-label="Search resources"
          />
        </label>
        {query && (
          <p className="mt-6 text-sm text-secondary-text">
            Searching for <span className="font-semibold text-primary">{query}</span>
          </p>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
