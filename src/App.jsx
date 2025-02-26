import { useState } from "react";
import "./App.css"; // Custom CSS for styling

const accessKey = "EJH6M10MlYKJGhB7twn9N-jvWnuPWS8vtJcnl9MX3Jc";

const ImageSearch = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const searchImages = async (newSearch = false) => {
    if (!query) return;
    setLoading(true);
    const newPage = newSearch ? 1 : page;
    const url = `https://api.unsplash.com/search/photos?page=${newPage}&query=${query}&client_id=${accessKey}&per_page=12`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (newSearch) {
        setImages(data.results);
      } else {
        setImages((prevImages) => [...prevImages, ...data.results]);
      }
      setPage(newPage + 1);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchImages(true);
  };

  return (
    <div className="container">
      <h1 className="title">Image Search Engine</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for images..."
          className="search-box"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="image-grid">
        {images.map((image) => (
          <a key={image.id} href={image.links.html} target="_blank" rel="noopener noreferrer" className="image-container">
            <img src={image.urls.small} alt={image.alt_description} className="image" />
          </a>
        ))}
      </div>

      {images.length > 0 && (
        <button
          onClick={() => searchImages()}
          className="load-more-button"
          disabled={loading}
        >
          {loading ? "Loading..." : "Show More"}
        </button>
      )}
    </div>
  );
};

export default ImageSearch;
