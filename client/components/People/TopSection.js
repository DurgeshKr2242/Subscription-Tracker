import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  deleteObject,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth, storage } from "../../firebase";
import axios from "axios";

import { addFriend } from "../../functions/auth";
import { useGlobalAuthContext } from "../../AuthContext";

import { FaUserEdit } from "react-icons/fa";
import { MdOutlineDownloadDone } from "react-icons/md";
import Router from "next/router";

const TopSection = () => {
  // const [durationActive, setDurationActive] = useState(true);
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [friendId, setFriendId] = useState("");
  const { token, user, userId } = useGlobalAuthContext();

  const [editedName, setEditedName] = useState("");
  const [editedImgUrl, setEditedImgUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const [progressRemaining, setProgressRemaining] = useState(null);

  useEffect(() => {
    setEditedName(user?.name);
    setEditedImgUrl(user?.picture);
  }, [user]);

  const onImgInputClick = (e) => {
    e.target.value = "";
  };

  const handleImgInput = (e) => {
    let pickedFile;
    if (e.target.files && e.target.files.length === 1) {
      setEditedImgUrl(URL.createObjectURL(e.target.files[0]));
      console.log(editedImgUrl);
      console.log(e.target);
      pickedFile = e.target.files[0];
      setSelectedImage(pickedFile);
      console.log(selectedImage);
    }
  };

  const addFriendHandler = async (e) => {
    if (friendId) {
      try {
        const res = await addFriend(token, friendId);
        toast.success("Friend Added", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.reload();
      } catch (err) {
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
    } else {
      toast.error("Please enter a user id", {
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

  function uploadTaskPromise(file) {
    return new Promise(function (resolve, reject) {
      if (!file) return;

      const storageRef = ref(storage, `pfp/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgressRemaining(prog);
          console.log(prog);
        },
        (error) => {
          console.log("ERRRRR!!!!!!");
          alert("Error inside upload file function", error);
          reject();
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  }

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      try {
        try {
          await updateProfile(auth.currentUser, {
            displayName: editedName,
          });
        } catch (err) {
          console.log(err);
        }

        const updatedUser = {
          name: editedName,
        };
        const res = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${userId}`,
          updatedUser
        );

        toast.success("PROFILE UPDATED!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setEditMode(false);
        router.reload();
      } catch (err) {
        console.log(err);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      let storageURL;
      try {
        storageURL = await uploadTaskPromise(selectedImage);

        try {
          await updateProfile(auth.currentUser, {
            displayName: editedName,
            photoURL: storageURL,
          });
        } catch (err) {
          console.log(err);
        }

        const updatedUser = {
          name: editedName,
          picture: storageURL,
        };
        const res = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/${userId}`,
          updatedUser
        );
        toast.success("PROFILE UPDATED!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setEditMode(false);
        router.reload();
      } catch (err) {
        console.log(err);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
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
              className="absolute border-8 -top-14 dark:bg-bgblack dark:border-bgblack bg-white border-white  inline object-cover w-[110px] h-[110px] rounded-full"
            />
            <p className="text-2xl font-bold tracking-wide text-center ">
              {user?.name}
            </p>
            <p className="text-xs font-bold text-left text-gray-600 dark:text-gray-400">
              User id : {user?._id}
            </p>
          </div>

          <div className="flex justify-between w-full">
            <div className="flex flex-col items-center w-full">
              <h1 className="mt-4 text-3xl font-bold">
                {user?.friends?.length}
              </h1>
              <p className="text-sm font-bold text-left text-gray-600 dark:text-gray-400 ">
                Friends
              </p>
            </div>
            <div className="flex flex-col items-center w-full">
              <h1 className="mt-4 text-3xl font-bold">{user?.posts?.length}</h1>
              <p className="text-sm font-bold text-left text-gray-600 dark:text-gray-400 ">
                Subs
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center w-full">
            <h1 className="mt-2 text-3xl font-bold">
              ??? {user?.spent?.toFixed(2)}
            </h1>
            <p className="text-sm font-bold text-left text-gray-600 dark:text-gray-400 ">
              Spent
            </p>
          </div>

          <div className="flex flex-wrap justify-center">
            <input
              type="text"
              id="addPeople"
              className="inputBox dark:bg-bgBlackSec bg-bgWhiteSec"
              placeholder="Ender your Friend's id"
              value={friendId}
              onChange={(e) => setFriendId(e.target.value)}
            />
            <motion.button
              onClick={addFriendHandler}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-2 mt-4 text-sm font-bold tracking-wide rounded-lg shadow-md shadow-yellow-800 bg-bgyellow text-bgblack"
              // className="px-6 py-2 mt-4 text-sm font-extrabold tracking-wide rounded-md bg-bgyellow text-bgblack"
            >
              Add Friend
            </motion.button>
          </div>
        </div>
      )}

      {editMode && (
        <div className="relative flex flex-col items-center w-full gap-8 px-3 py-6 tracking-wider transition-all duration-200 border-2 hover:shadow-lg hover:dark:shadow-gray-800 hover:shadow-gray-300 tablet-s:p-8 rounded-xl border-bgyellow">
          <div className="flex flex-col items-center gap-2 pt-10 ">
            <label
              className="absolute z-10 text-xl rounded-full p-7 bg-black/50 -top-12"
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
              onClick={onImgInputClick}
              onChange={handleImgInput}
              id="profilepicInput"
              className="hidden"
            />
            {/* <FaUserEdit className="absolute z-10 p-8 text-3xl bg-gray-500/30" /> */}
            <img
              src={editedImgUrl}
              alt="profilePic"
              className="absolute border-8 -top-14 dark:bg-bgblack dark:border-bgblack bg-white border-white  inline object-cover w-[110px] h-[110px] rounded-full"
            />
            {progressRemaining != null && (
              <div className="relative w-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{
                    width: `${progressRemaining}%`,
                  }}
                ></div>
              </div>
            )}

            <input
              autoFocus
              type="text"
              className="text-2xl font-bold tracking-wide text-center inputBox dark:bg-bgBlackSec bg-bgWhiteSec"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            {/* <p className="text-2xl font-bold tracking-wide text-center ">
                {user?.name}
              </p> */}
            <p className="text-xs font-bold text-left text-gray-600 dark:text-gray-400">
              User id : {user?._id}
            </p>
          </div>

          <div className="flex flex-wrap justify-center">
            <motion.button
              onClick={updateProfileHandler}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-2 mt-4 text-sm font-bold tracking-wide rounded-lg shadow-md shadow-yellow-800 bg-bgyellow text-bgblack"
            >
              Update Profile
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopSection;
