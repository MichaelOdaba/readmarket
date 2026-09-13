import { SearchIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
interface SearchProps {
  compact?: boolean;
}

const Search: React.FC<SearchProps> = ({ compact = false }) => {
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [backspaceButton, setBackspaceButton] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        setBackspaceButton(true);
      }
    });
    const { value } = e.target;
    setSearchInput(value);
    if (searchInput !== "") {
      navigate("/app/search");
    }

    if (searchInput !== "" && backspaceButton) {
      return null;
    }
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => navigate("/app/search")}
        className="search-surface flex min-w-0 flex-1 items-center gap-2 rounded-full px-3 py-2 text-left text-sm text-secondary hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="Search resources"
      >
        <SearchIcon className="search-icon shrink-0" size={18} />
        <span className="min-w-0 truncate">
          <TypeAnimation
            sequence={[
              'Search "Game Of Thrones"',
              1000,
              'Search "The Pragmatic Programmer"',
              1000,
              'Search "Woman Down"',
              1000,
              'Search "Anatomy Of an Alibi"',
              1000,
            ]}
            wrapper="span"
            speed={45}
            repeat={Infinity}
          />
        </span>
      </button>
    );
  }

  return (
    <div
      className="md:w-[40%] w-full mt-7 md:m-0 flex justify-center"
      onClick={() => {
        setIsSearch(true);
      }}
    >
      {!isSearch ? (
        <div className="search-surface input w-full flex gap-4 items-center rounded-full">
          <SearchIcon className="search-icon" />
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              'Search "Game Of Thrones"',
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              'Search "The Pragmatic Programmer"',
              1000,
              'Search "Woman Down"',
              1000,
              'Search "Anatomy Of an Alibi"',
              1000,
              'Search "Dear Debbie"',
              1000,
              'Search "Anatomy Of The Heart"',
              1000,
              'Search "Crime and Punishment"',
              1000,
              'Search "The Idea Of a University"',
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
      ) : (
        <input
          type="text"
          className="search-surface input rounded-full w-full"
          autoFocus
          placeholder="search for a resource"
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default Search;
