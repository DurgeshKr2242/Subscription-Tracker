import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

import { addFriend } from "../../functions/auth";
import { useGlobalAuthContext } from "../../AuthContext";

import { FaUserEdit } from "react-icons/fa";
import { MdOutlineDownloadDone } from "react-icons/md";

const TopSection = () => {
  // const [durationActive, setDurationActive] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [friendId, setFriendId] = useState("");
  const { token, user } = useGlobalAuthContext();

  const [editedName, setEditedName] = useState("");
  const [editedImgUrl, setEditedImgUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  useEffect(() => {
    setEditedName(user?.name);
    setEditedImgUrl(user?.picture);
  }, [user]);

  const addFriendHandler = async (e) => {
    try {
      const res = await addFriend(token, friendId);
      // console.log(res);
      toast.success("Friend Added", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err.response.data);
      // console.log(err.response.status);
      // console.log(err.response.headers);
      // console.log(err.response.message);
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleImgInput = (e) => {
    // console.log(e);
    // setEditedImgUrl(e.target.value);

    let pickedFile;
    if (e.target.files && e.target.files.length === 1) {
      setEditedImgUrl(URL.createObjectURL(e.target.files[0]));
      console.log(editedImgUrl);
      pickedFile = e.target.files[0];
      setSelectedImage(pickedFile);
    }
    console.log("Your selected cover img is: ", selectedImage);
  };

  return (
    <div className="flex relative flex-col items-center w-full mt-28 tablet-s:max-w-[380px] max-w-[300px]">
      <button
        onClick={() => setEditMode(!editMode)}
        className="absolute z-10 p-2 text-2xl rounded-full -top-1 -right-1 bg-bgyellow text-bgblack"
      >
        {editMode ? <MdOutlineDownloadDone /> : <FaUserEdit />}
      </button>
      {!editMode && (
        <div className="relative flex flex-col items-center w-full gap-8 px-3 py-6 tracking-wider transition-all duration-200 border-2 hover:shadow-lg hover:dark:shadow-gray-800 hover:shadow-gray-300 tablet-s:p-8 rounded-xl border-bgyellow">
          <div className="flex flex-col items-center gap-2 pt-10 ">
            <img
              src={user?.picture}
              alt="profilePic"
              className="absolute border-8 rounded-full -top-14 border-bgblack"
            />
            <p className="text-2xl font-bold tracking-wide text-center ">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500">User id : {user?._id}</p>
          </div>

          <div className="flex justify-between w-full">
            <div className="flex flex-col items-center w-full">
              <h1 className="mt-4 text-3xl font-bold">
                {user?.friends?.length}
              </h1>
              <p className="text-sm font-bold text-left text-gray-400 ">
                Friends
              </p>
            </div>
            <div className="flex flex-col items-center w-full">
              <h1 className="mt-4 text-3xl font-bold">{user?.posts?.length}</h1>
              <p className="text-sm font-bold text-left text-gray-400 ">Subs</p>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <h1 className="mt-2 text-3xl font-bold">
              ₹ {user?.spent?.toFixed(2)}
            </h1>
            <p className="text-sm font-bold text-left text-gray-400 ">Spent</p>
          </div>

          <div className="flex flex-wrap justify-center">
            <input
              type="text"
              id="addPeople"
              className="inputBox"
              placeholder="Ender your Friend's id"
              value={friendId}
              onChange={(e) => setFriendId(e.target.value)}
            />
            <button
              onClick={addFriendHandler}
              className="px-4 py-1 mt-2 text-sm tracking-wide bg-gray-800 rounded-md text-bgWhiteSec"
            >
              Add Friend
            </button>
          </div>
        </div>
      )}

      {editMode && (
        <div className="relative flex flex-col items-center w-full gap-8 px-3 py-6 tracking-wider transition-all duration-200 border-2 hover:shadow-lg hover:dark:shadow-gray-800 hover:shadow-gray-300 tablet-s:p-8 rounded-xl border-bgyellow">
          <div className="flex flex-col items-center gap-2 pt-10 ">
            <label
              className="absolute z-10 p-8 text-xl rounded-full bg-black/50 -top-12"
              htmlFor="profilepicInput"
            >
              {/* <button
                onClick={() => console.log("IMAGEEE")}
                className="absolute z-10 p-5 rounded-full bg-yellow-600/50 -top-10 "
              > */}
              <FaUserEdit className="text-3xl text-white rounded-full tablet-s:text-4xl" />
              {/* </button> */}
            </label>
            <input
              input
              type="file"
              accept="image/*"
              onChange={handleImgInput}
              id="profilepicInput"
              className="hidden"
            />
            {/* <FaUserEdit className="absolute z-10 p-8 text-3xl bg-gray-500/30" /> */}
            <img
              src={editedImgUrl}
              alt="profilePic"
              className="absolute  border-8  -top-14 border-bgblack inline object-cover w-[110px] h-[110px] rounded-full"
            />
            <input
              type="text"
              className="text-2xl font-bold tracking-wide text-center inputBox"
              value={editedName}
            />
            {/* <p className="text-2xl font-bold tracking-wide text-center ">
                {user?.name}
              </p> */}
            <p className="text-xs text-gray-500">User id : {user?._id}</p>
          </div>

          <div className="flex justify-between w-full">
            <div className="flex flex-col items-center w-full">
              <h1 className="mt-4 text-3xl font-bold">
                {user?.friends?.length}
              </h1>
              <p className="text-sm font-bold text-left text-gray-400 ">
                Friends
              </p>
            </div>
            <div className="flex flex-col items-center w-full">
              <h1 className="mt-4 text-3xl font-bold">{user?.posts?.length}</h1>
              <p className="text-sm font-bold text-left text-gray-400 ">Subs</p>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <h1 className="mt-2 text-3xl font-bold">
              ₹ {user?.spent?.toFixed(2)}
            </h1>
            <p className="text-sm font-bold text-left text-gray-400 ">Spent</p>
          </div>

          <div className="flex flex-wrap justify-center">
            <input
              type="text"
              id="addPeople"
              className="inputBox"
              placeholder="Ender your Friend's id"
              value={friendId}
              onChange={(e) => setFriendId(e.target.value)}
            />
            <button
              onClick={addFriendHandler}
              className="px-4 py-1 mt-2 text-sm tracking-wide bg-gray-800 rounded-md text-bgWhiteSec"
            >
              Add Friend
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopSection;
