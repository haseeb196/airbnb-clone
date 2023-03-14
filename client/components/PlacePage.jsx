import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingWidget from './BookingWidget';

const PlacePage = () => {
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
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

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 min-h-full  bg-black text-white">
        <div className="grid gap-4 p-8">
          <div>
            <h2 className="text-3xl mr-36">Photos of {place.title}</h2>
          </div>
          <button
            onClick={() => setShowAllPhotos(false)}
            className="fixed right-12 top-8 flex gap-1 rounded-2xl bg-white py-2 px-4 text-black shadow shadow-black"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Close photos
          </button>
          {place?.photos?.length > 0 &&
            place.photos.map((photo, i) => (
              <div key={i}>
                <img
                  src={'http://localhost:3000/uploads/' + photo}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className="-mx-8 mt-4 bg-gray-100 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="my-2 flex gap-1 font-semibold underline"
        href={'https://maps.google.com/?q=' + place.address}
        rel="noreferrer"
        target={'_blank'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        {place.address}
      </a>
      <div className="relative">
        <div className="grid grid-cols-[2fr_1fr] gap-2 overflow-hidden rounded-3xl">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover cursor-pointer"
                  src={'http://localhost:3000/uploads/' + place.photos[0]}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="grid">
            {place.photos?.[1] && (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square object-cover cursor-pointer"
                src={'http://localhost:3000/uploads/' + place.photos[1]}
                alt=""
              />
            )}
            <div className="overflow-hidden">
              {place.photos?.[2] && (
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="relative top-2 aspect-square cursor-pointer object-cover"
                  src={'http://localhost:3000/uploads/' + place.photos[2]}
                  alt=""
                />
              )}
            </div>
            <button
              onClick={() => setShowAllPhotos(true)}
              className="absolute bottom-0 right-0 flex gap-1 rounded-2xl bg-white py-2 px-4 shadow-md shadow-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              Show more photos
            </button>
          </div>
        </div>
      </div>

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
