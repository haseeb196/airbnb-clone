import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";
const PlacesPage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const { action } = useParams();

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="bg-primary inline-flex gap-1 text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
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
      {action === "new" && (
        <div>
          {" "}
          <form>
            {preInput(
              "Title",
              "Title for your place. should be short & catchy as in advertisement"
            )}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title, for example: My lovely apt"
            />
            {preInput("Address", "Address to this place")}

            <input
              type="text"
              placeholder="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
            {preInput("Photos", "more = better")}
            <div className="flex gap-2">
              <input
                type="text"
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                placeholder="Add using a link ..jpg"
              />
              <button className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;Photos
              </button>
            </div>
            <div className="grid  grid-cols-3 lg:grid-cols-6 md:grid-cols-4 mt-2">
              <button className="flex justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </button>
            </div>
            {preInput("Description", "description of the place")}
            <textarea />
            {preInput("Perks", "select all the perks of your place")}
            <Perks selected={perks} onChange={setPerks} />
            {preInput("Extra info", "house rules, etc")}
            <textarea />
            {preInput(
              "Check in&out times",
              "add check in and out times, remember to have some time window forcleaning the room between guests"
            )}
            <div className="grid sm:grid-cols-3 gap-2">
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input type="text" placeholder="14:00" />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input type="text" />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input type="text" />
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
