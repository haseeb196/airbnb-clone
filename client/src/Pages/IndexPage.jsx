import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get('/places').then((res) => {
      setPlaces(res.data);
    });
  }, []);
  return (
    <div className="mt-8 grid  grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place, i) => (
          <Link
            key={i}
            to={'/place/' + place._id}
          >
            <div className="mb-2 flex rounded-2xl bg-gray-500">
              {place.photos?.[0] && (
                <img
                  className="aspect-square rounded-2xl object-cover"
                  src={'http://localhost:3000/uploads/' + place.photos}
                  alt=""
                />
              )}
            </div>
            <h3 className="font-bold">{place.address}</h3>
            <h2 className="text-sm text-gray-500">{place.title}</h2>

            <div className="mt-1">
              <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
