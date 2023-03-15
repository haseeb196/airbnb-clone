import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AccountNav from './AccountNav';
import Perks from './Perks';
import PhotosUploader from './PhotosUploader';
const PlacesFormPage = () => {
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(100);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (redirect) {
      return navigate('/account/places');
    }

    if (!id) {
      return;
    } else {
      axios.get('/places/' + id).then((res) => {
        const { data } = res;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      });
    }
  }, [redirect, id]);

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

  const savePlace = async (e) => {
    e.preventDefault();
    const placeData = {
      price,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };
    if (id) {
      await axios.put('/places', {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      await axios.post('/places', placeData);

      setRedirect(true);

      setTitle('');
      setAddress('');
      setAddedPhotos([]);
      setDescription('');
      setPerks('');
      setExtraInfo('');
      setCheckIn('');
      setCheckOut('');
      setMaxGuests(1);
    }
  };

  return (
    <div>
      <AccountNav />{' '}
      <form onSubmit={savePlace}>
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
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
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
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type={'number'}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button className="primary my-4">Save</button>
        </div>
      </form>
    </div>
  );
};

export default PlacesFormPage;
