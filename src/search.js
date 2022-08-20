import { useState } from "react";
import { useEffect } from "react";

const Search = ({ filtered, setSearched }) => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (searchInput === "") {
      setSearched(filtered);
      return;
    }

    const searched = filtered.filter((movie) =>
      movie.title.toLowerCase().includes(searchInput)
    );
    setSearched(searched);
  }, [searchInput]);

  const searchOnChangeHandler = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <form action="">
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="name"
        name="search"
        onChange={searchOnChangeHandler}
      />
    </form>
  );
};

export default Search;
