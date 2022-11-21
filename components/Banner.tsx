import { useState, useEffect } from 'react';
import { Movie } from '../typings';
import Image from 'next/image';
import { BASE_URL } from '../constants/movies';
import { FaPlay } from 'react-icons/fa';
import { InformationCircleIcon } from '@heroicons/react/solid';
import { modalState, movieState } from '../atoms/modalAtoms';
import { useRecoilState } from 'recoil';

interface Props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [modalMovie, setMovalMovie] = useRecoilState(movieState);

  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2  md:space-y-4 lg:h-[65vh] py-16 lg:justify-end px-6">
      <div className="absolute top-0 left-0 h-[95vh]  w-full -z-10 ">
        <Image
          src={`${BASE_URL}/${movie?.backdrop_path || movie?.poster_path}`}
          alt="banner"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <h1 className="text-2xl md:text-4xl lg:text-7xl mt-16">{movie?.title || movie?.name || movie?.original_name}</h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl">{movie?.overview}</p>
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button className="bannerButton bg-[gray]/70" onClick={() => setShowModal(true)}>
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
}

export default Banner;
