import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddressLink from './AddressLink';
import BookingWidget from './BookingWidget';
import PlaceGallery from './PlaceGallery';
const PlacePage = () => {
  const [place, setPlace] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);
  if (!place) return '';

  return (
    <div className="-mx-8 mt-4 bg-gray-100 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>
      <PlaceGallery place={place} />

      <div className="mt-8 mb-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="text-2xl font-semibold">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="-mx-8 border-t bg-white px-8 py-8">
        <div>
          <h2 className="text-2xl font-semibold">Extra info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm leading-5 text-gray-700">{place.extraInfo}</div>
      </div>
    </div>
  );
};

export default PlacePage;
