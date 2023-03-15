import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddressLink from './AddressLink';
import BookingDates from './BookingDates';
import PlaceGallery from './PlaceGallery';
const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBookings] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get('/bookings').then((res) => {
        const foundBooking = res.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBookings(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return '';
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="my-6 flex justify-between rounded-2xl bg-gray-200 p-6 items-center">
        <div>
          {' '}
          <h2 className="mb-4 text-2xl">Your booking Information</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="rounded-2xl bg-primary p-6 text-white">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
};

export default BookingPage;
