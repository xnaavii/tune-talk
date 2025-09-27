import { IoStar, IoStarOutline, IoStarHalf } from 'react-icons/io5';
import PropTypes from 'prop-types';

export default function Star({
  filled = false,
  half = false,
  size = 'lg',
  color = '#FFFFFF',
}) {
  // Size takes in the tailwind class of a font size (e.g. sm, md, lg..)
  const styleClasses = `absolute top-0 left-0 text-${size} transition-opacity duration-300`;

  return (
    <div className={`relative w-[1em] h-[1em] p-[10px]`}>
      <IoStarOutline
        className={styleClasses}
        style={{ fill: color, opacity: !filled && !half ? 1 : 0 }}
      />
      <IoStarHalf
        className={styleClasses}
        style={{ fill: color, opacity: half ? 1 : 0 }}
      />
      <IoStar
        className={styleClasses}
        style={{ fill: color, opacity: filled ? 1 : 0 }}
      />
    </div>
  );
}

Star.propTypes = {
  filled: PropTypes.bool,
  half: PropTypes.bool,
  size: PropTypes.string,
  color: PropTypes.string,
};
