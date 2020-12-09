import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function AddMovie(props) {
  const { push } = useHistory();
  const [newMovie, setNewMovie] = useState({
    id: "",
    title: "",
    director: "",
    metascore: 0,
    stars: [],
  });

  const handleChange = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    setNewMovie({ ...newMovie, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewMovie({ ...newMovie, id: Date().now });
    axios.post("http://localhost:5000/api/movies/", newMovie).then((res) => {
      console.log(res.data);
      props.setMovieList(res.data);
    });
    push("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          style={{ margin: "5px" }}
          type="text"
          id="title"
          name="title"
          value={newMovie.title}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="director">Director:</label>
        <input
          style={{ margin: "5px" }}
          type="text"
          id="director"
          name="director"
          value={newMovie.director}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="metascore">Metascore:</label>
        <input
          style={{ margin: "5px" }}
          type="text"
          id="metascore"
          name="metascore"
          value={newMovie.metascore}
          onChange={handleChange}
        />
        <br></br>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
