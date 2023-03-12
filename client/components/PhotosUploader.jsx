import axios from 'axios';
import { useState } from 'react';
const PhotosUploader = ({onChange, addedPhotos}) => {

  const [photoLink, setPhotoLink] = useState('');
  async function checkImage(url) {
    const res = await fetch(url);
    const buff = await res.blob();

    return buff.type.startsWith('image/');
  }

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    if (photoLink === '') return;
    if ((await checkImage(photoLink)) === false) return;
    const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
    onChange((prev) => {
      return [...prev, filename];
    });
    setPhotoLink('');
  };

  const uploadPhoto = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let index = 0; index < files.length; index++) {
      data.append('photos', files[index]);
    }
    axios
      .post('/upload', data, {
        headers: { 'Content-type': 'multipart/formdata' },
      })
      .then((res) => {
        const { data: filenames } = res;
        onChange((prev) => {
          return [...prev, ...filenames];
        });
      });
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          placeholder="Add using a link ..jpg"
        />
        <button
          className="rounded-2xl bg-gray-200 px-4"
          onClick={addPhotoByLink}
        >
          Add&nbsp;Photos
        </button>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link, i) => (
            <div
              key={i}
              className="flex h-32"
            >
              <img
                className="w-full rounded-2xl object-cover"
                src={'http://localhost:3000/uploads/' + link}
                alt=""
              />
            </div>
          ))}
        <label className="flex h-32 cursor-pointer items-center justify-center rounded-2xl border bg-transparent p-2 text-2xl text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
};

export default PhotosUploader;
