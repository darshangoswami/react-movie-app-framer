import { useEffect, useState, useCallback } from "react";
import "./App.css";
import Filter from "./Filter";
import Movie from "./Movie";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPopular = useCallback(async () => {
    setIsLoading(true);

    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=05aa490e85167baf705cb34e0602f814&language=en-US&page=1"
    );
    const movies = await data.json();
    setPopular(movies.results);
    setFiltered(movies.results);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPopular();
  }, [fetchPopular]);

  return (
    <div className="App">
      <Filter
        popular={popular}
        setFiltered={setFiltered}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
      />
      <motion.div layout className="popular-movies">
        <AnimatePresence>
          {!isLoading && filtered.length > 0} &&
          {filtered.map((movie) => {
            return <Movie key={movie.id} movie={movie} />;
          })}
          {!isLoading && filtered.length === 0 && <p>No movies found.</p>}
          {isLoading && <p>Loading...</p>}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
