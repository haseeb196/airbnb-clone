import axios from 'axios';
import { differenceInCalendarDays } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [number, setNumber] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }
  const bookThisPlace = async () => {
    const data = {
      checkIn,
      checkOut,
      numberOfGuests: number,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    };
    const response = await axios.post('/bookings', data);
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
    if (redirect !== '') {
      return navigate(redirect);
    }
  }, [redirect, user]);

  return (
    <div className="rounded-2xl bg-white p-4 shadow">
      <div className="text-center text-2xl">Price: ${place.price} / per night</div>
      <div className="mt-4 rounded-2xl border">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="border-l py-3 px-4">
            <label>Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="border-t py-3 px-4">
            <label>Number of guests:</label>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          {numberOfNights > 0 && (
            <div className="border-t py-3 px-4">
              <label>Your full name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Phone number:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <button
        className="primary mt-4"
        onClick={bookThisPlace}
      >
        Book this place
        {numberOfNights > 0 && <span>${numberOfNights * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
