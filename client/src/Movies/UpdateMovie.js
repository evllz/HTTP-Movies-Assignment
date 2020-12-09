import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  title: "",
  director: "",
  metascore: 0,
};

const UpdateMovie = (props) => {
  const { push } = useHistory();
  const { id } = useParams();
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${id}`, movie).then((res) => {
      props.setMovieList(
        props.movieList.map((item) => {
          if (item.id === res.data.id) {
            return res.data;
          }
          return item;
        })
      );
      push(`/movies/${res.data.id}`);
    });
  };

  const handleChange = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    setMovie({ ...movie, [e.target.name]: value });
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
          value={movie.title}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="director">Director:</label>
        <input
          style={{ margin: "5px" }}
          type="text"
          id="director"
          name="director"
          value={movie.director}
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="metascore">Metascore:</label>
        <input
          style={{ margin: "5px" }}
          type="text"
          id="metascore"
          name="metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
        <br></br>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
