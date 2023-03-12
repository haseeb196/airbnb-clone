import axios from 'axios';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from './Perks';
import PhotosUploader from './PhotosUploader';
const PlacesPage = () => {
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const { action } = useParams();

  function inputHeader(text) {
    return <h2 className="mt-4 text-2xl">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-sm text-gray-500">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  const addNewPlace = (e) => {
    e.preventDefault();
  axios.post('/places', data);

  }

  return (
    <div>
      {action !== 'new' && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 rounded-full bg-primary py-2 px-6 text-white"
            to={'/account/places/new'}
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new places
          </Link>
        </div>
      )}
      {action === 'new' && (
        <div>
          {' '}
          <form onSubmit={addNewPlace}>
            {preInput('Title', 'Title for your place. should be short & catchy as in advertisement')}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title, for example: My lovely apt"
            />
            {preInput('Address', 'Address to this place')}

            <input
              type="text"
              placeholder="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            {preInput('Photos', 'more = better')}
            <PhotosUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />
            {preInput('Description', 'description of the place')}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {preInput('Perks', 'select all the perks of your place')}
            <Perks
              selected={perks}
              onChange={setPerks}
            />
            {preInput('Extra info', 'house rules, etc')}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            {preInput(
              'Check in&out times',
              'add check in and out times, remember to have some time window forcleaning the room between guests',
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input
                  type="text"
                  placeholder="14"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input
                  type="text"
                  placeholder="11"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input
                  type="text"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div>
      )}
      myplaces
    </div>
  );
};

export default PlacesPage;
