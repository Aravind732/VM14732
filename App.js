import React, { useState } from "react";
import api from "../src/api";
import '../App.css';

const URLForm = () => {
  const [url, setUrl] = useState("");
  const [shortcode, setshortcode] = useState("");
  const [expiry, setExpiry] = useState("");
  const [result, setresult] = useState(null);

  const hsubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/", { url, shortcode, expiry });
      setresult(res.data);
    } catch (err){
      console.error(err);
    }
  };

  return (
  <div className="container">
    <h2>Create Short URL</h2>
    <form onSubmit={hsubmit}>
      <input
        placeholder="Long URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        required
      />
      <input
        placeholder="Shortcode (optional)"
        value={shortcode}
        onChange={e => setshortcode(e.target.value)}
      />
      <input
        placeholder="Expiry Date"
        value={expiry}
        onChange={e => setExpiry(e.target.value)}
      />
      <button type="submit">Shorten</button>
    </form>
    {result && (
  <div className="result">
    <p>
      <strong>Short URL:</strong>{" "}
      <a href={result.shortUrl} target="_blank" rel="noopener noreferrer">
        {result.shortUrl}
      </a>
    </p>
    <p>
      <strong>Expiry:</strong> {result.expiry}
    </p>
  </div>
)}

  </div>
);

};

export default URLForm