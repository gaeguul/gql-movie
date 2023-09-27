import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";

const GET_ALL_MOVIES = gql`
  {
    allMovies {
      id
      title
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Header = styled.div`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 200px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Title = styled.div`
  font-size: 50px;
  font-weight: 600;
`;
const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 25px;
  width: 90%;
  position: relative;
  top: -20px;
`;
const PosterContainer = styled.div`
  height: 400px;
  border-radius: 20px;
  width: 100%;
  background-color: transparent;
  transition: transform 0.16s ease-out;
  box-shadow: 4px 12px 20px 6px rgba(0, 0, 0, 0.2);
  &:hover {
    transform: scale(1.007);
  }
`;
const PosterImage = styled.div`
  background-image: url(${(props) => props.image});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 20px;
`;
const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 30px;
`;
const Error = styled.div``;

const Movies = () => {
  const { data, loading, error } = useQuery(GET_ALL_MOVIES);
  return (
    <Container>
      <Header>
        <Title>Apollo Movies</Title>
      </Header>
      <MoviesGrid>
        {data?.allMovies?.map((movie) => (
          <PosterContainer key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <PosterImage image={movie.medium_cover_image} />
            </Link>
          </PosterContainer>
        ))}
      </MoviesGrid>
      {loading && <Loading>Loading...</Loading>}
      {error && <Error>Could not Fetch !</Error>}
    </Container>
  );
};

export default Movies;
