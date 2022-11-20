import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { useRef, useState } from 'react';
import { Movie } from '../typings';
import Thumbnail from './Thumbnail';

interface Props {
  title: String;
  movies: Movie[];
}

function Row({ title, movies }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (side: String) => () => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = side === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2  group relative md:ml-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200  hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group">
        <ChevronLeftIcon
          className={`${
            !isMoved && 'hidden'
          } absolute top-0 bottom-0 left-2 z-40 m-auto h-9 cursor-pointer transition hover:scale-125 opacity-0 group-hover:opacity-100`}
          onClick={handleClick('left')}
        />
        <div className="flex items-center space-x-0.5 overflow-x-scroll  md:space-x-2.5 scrollbar-hide" ref={rowRef}>
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 cursor-pointer hover:scale-125 opacity-0 group-hover:opacity-100"
          onClick={handleClick('right')}
        />
      </div>
    </div>
  );
}

export default Row;
