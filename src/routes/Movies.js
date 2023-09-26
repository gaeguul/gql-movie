import { gql, useQuery } from "@apollo/client";

const GET_ALL_MOVIES = gql`
  {
    allMovies {
      id
      title
    }
  }
`;

const Movies = () => {
  const { data, loading, error } = useQuery(GET_ALL_MOVIES);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Could not Fetch !</div>;
  return (
    <div>
      {data.allMovies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </div>
  );
};

export default Movies;
