import React from 'react';
import { Movie } from '../typings';
import Image from 'next/image';
import { modalState, movieState } from './../atoms/modalAtoms';
import { useRecoilState } from 'recoil';
import { BASE_URL } from '../constants/movies';

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [modalMovie, setMovalMovie] = useRecoilState(movieState);

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setShowModal(true);
        setMovalMovie(movie);
      }}
    >
      <Image
        src={`${BASE_URL}/${movie.backdrop_path || movie.poster_path}`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        alt="thumbnail"
      />
    </div>
  );
}

export default Thumbnail;
