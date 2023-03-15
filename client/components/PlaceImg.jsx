import { useEffect } from 'react';

const PlaceImg = ({ place, index = 0, className = null }) => {
  useEffect(() => {
    if (!place.photo?.length) {
      return;
    }

    if (!className) {
      className = 'object-cover';
    }
  }, [place.photo, className]);

  return (
    <img
      className={className}
      src={'http://localhost:3000/uploads/' + place.photos[index]}
      alt=""
    />
  );
};

export default PlaceImg;
