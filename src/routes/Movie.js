import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { RxStarFilled } from "react-icons/rx";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      rating
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: white;
`;
const Info = styled.div`
  margin-left: 10px;
  width: 40%;
`;
const Title = styled.div`
  font-size: 50px;
  font-weight: 600;
  margin-bottom: 15px;
`;
const Subtitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  display: flex;
`;
const StarIcon = styled(RxStarFilled)`
  color: #ffe11b;
`;
const Rating = styled.div`
  margin-left: 7px;
`;
const Image = styled.div`
  width: 40%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center center;
  border-radius: 20px;
  box-shadow: 4px 12px 20px 6px rgba(0, 0, 0, 0.3);
`;

const Movie = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });
  return (
    <Container>
      <Info>
        <Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title>
        <Subtitle>
          <StarIcon />
          <Rating>{data?.movie?.rating}</Rating>
        </Subtitle>
      </Info>
      <Image image={data?.movie?.medium_cover_image} />
    </Container>
  );
};

export default Movie;
