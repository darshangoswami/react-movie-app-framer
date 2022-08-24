import { useEffect, useState, useCallback } from "react";
import "./App.css";
import Filter from "./Filter";
import Movie from "./Movie";
import { motion, AnimatePresence } from "framer-motion";
import Search from "./search";

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState([]);

  const fetchPopular = useCallback(async () => {
    setIsLoading(true);

    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    );
    const movies = await data.json();
    setPopular(movies.results);
    setFiltered(movies.results);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPopular();
  }, [fetchPopular]);

  console.log(searched);

  return (
    <div className="App">
      <Search filtered={filtered} setSearched={setSearched} />
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <motion.div layout className="popular-movies">
        <AnimatePresence>
          {!isLoading && searched.length > 0} &&
          {searched.map((movie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
          {!isLoading && searched.length === 0 && <p>No movies found.</p>}
          {isLoading && <p>Loading...</p>}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
