import { SearchIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
const Search: React.FC = () => {
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
  return (
    <div
      className="md:w-[50%] w-full mt-7 md:m-0 flex justify-center"
      onClick={() => {
        setIsSearch(true);
      }}
    >
      {!isSearch ? (
        <div className="input w-full flex gap-4 items-center rounded-full">
          <SearchIcon />
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
          className="input rounded-full w-full"
          autoFocus
          placeholder="search for a resource"
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default Search;
