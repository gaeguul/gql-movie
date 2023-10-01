import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { RxStarFilled, RxHome } from "react-icons/rx";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";
import { AiOutlineHome } from "react-icons/ai";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      rating
      medium_cover_image
      isLiked @client
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
const HomeIcon = styled(AiOutlineHome)`
  position: fixed;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 30px;
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
  flex-direction: row;
  align-items: flex-start;
`;
const StarIcon = styled(RxStarFilled)`
  color: #ffe11b;
`;
const Rating = styled.div`
  margin-left: 7px;
`;
const Image = styled.div`
  width: 40%;
  aspect-ratio: 2/3;
  background-color: transparent;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center center;
  border-radius: 20px;
  box-shadow: 4px 12px 20px 6px rgba(0, 0, 0, 0.3);
`;
const HeartButton = styled.div`
  margin-left: 20px;
`;
const EmptyHeartButton = styled(PiHeartBold)`
  font-size: 28px;
  cursor: pointer;
`;
const FilledHeartButton = styled(PiHeartFill)`
  font-size: 28px;
  cursor: pointer;

  animation: liked 0.4s ease;
  @keyframes liked {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Movie = () => {
  const { id } = useParams();
  const {
    data,
    loading,
    client: { cache },
  } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });
  const onClick = () => {
    console.log("like ", data.movie.isLiked);
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: !data.movie.isLiked,
      },
    });
  };
  return (
    <Container>
      <Link to={`/`}>
        <HomeIcon />
      </Link>
      <Info>
        <Title>{loading ? "Loading..." : `${data.movie?.title}`}</Title>
        <Subtitle>
          <StarIcon />
          <Rating>{data?.movie?.rating}</Rating>
          <HeartButton onClick={onClick}>
            {data?.movie?.isLiked === true ? (
              <FilledHeartButton />
            ) : (
              <EmptyHeartButton />
            )}
          </HeartButton>
        </Subtitle>
      </Info>
      <Image image={data?.movie?.medium_cover_image} />
    </Container>
  );
};

export default Movie;
