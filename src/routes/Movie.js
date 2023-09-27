import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
    }
  }
`;

const Movie = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Could not Fetch !</div>;
  return (
    <div>
      <h1>{data.movie.title}</h1>
      <h2>{data.movie.id}</h2>
    </div>
  );
};

export default Movie;
