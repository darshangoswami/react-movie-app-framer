import { useState } from "react";
import { useEffect } from "react";

const Search = ({ filtered, setSearched }) => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const searched = filtered.filter((movie) =>
      movie.title.includes(searchInput)
    );
    setSearched(searched);
  }, [searchInput]);

  const searchOnChangeHandler = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
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
