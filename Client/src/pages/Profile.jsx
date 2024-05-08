import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async () => {
    try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      }),
        (error) => {
          setImageError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            setFormData({ ...formData, profilePicture: downloadUrl })
          );
        };
    } catch (error) {}
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-4xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={currentUser.profilePicture}
          alt="profile"
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2 border-4 border-slate-700"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-m self-center">
          {imageError ? (
            <span className="text-red-700">Error uploading image</span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">
              {`uploading: ${imagePercent} %`}{" "}
            </span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.userName}
          type="text"
          id="Username"
          placeholder="Username"
          className="bg-slate-200 rounded-lg p-3"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="email"
          className="bg-slate-200 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="bg-slate-200 rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-75">
          Update
        </button>
        <div>
          <span className="text-red-700 font-semibold cursor-pointer">
            Sign out
          </span>
        </div>
      </form>
    </div>
  );
}

export default Profile;
