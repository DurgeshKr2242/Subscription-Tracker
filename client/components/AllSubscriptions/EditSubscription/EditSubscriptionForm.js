import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

import { useGlobalAuthContext } from "../../../AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Multiselect from "multiselect-react-dropdown";
import { getPostById } from "../../../functions/auth";

const EditSubscriptionForm = () => {
  const { user, userId } = useGlobalAuthContext();
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [friendsDropdown, setFriendsDropdown] = useState([]);

  // console.log(router.pathname);

  const [selected, setSelected] = useState([]);
  const [serviceInput, setServiceInput] = useState("");
  const [costInput, setCostInput] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [dateInput, setDateInput] = useState([]);
  const [sharedWithInput, setSharedWithInput] = useState([]);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDatePicker, endDatePicker] = dateRange;
  const [personName, setPersonName] = React.useState([]);

  const getNoOfDays = (date1, date2) => {
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  };

  useEffect(() => {
    const friends = user?.friends;
    let friendListForDropdown = friends?.map((friend) => {
      return {
        key: friend.name,
        friend: friend,
      };
    });
    setFriendsDropdown(friendListForDropdown);
  }, [user]);

  useEffect(() => {
    const { pid } = router.query;
    // console.log(pid);
    if (pid) {
      const postById = async () => {
        const post = await getPostById(pid);

        // setAllPost(allPost.data.posts);
        console.log(post.data.post);
        setServiceInput(post.data.post.service);
        setCostInput(post.data.post.cost);
        setDateRange([
          new Date(post.data.post.startedOn),
          new Date(post.data.post.endsOn),
        ]);
        setDateInput([
          new Date(post.data.post.startedOn),
          new Date(post.data.post.endsOn),
        ]);
        setImageUrlInput(post.data.post.imageUrl);
      };
      postById();
    }
  }, [router]);

  const submitHandler = async () => {
    const duration = getNoOfDays(dateInput[0], dateInput[1]);
    let sharedWith = sharedWithInput.map((share) => {
      return share.friend;
    });
    const updatedPost = {
      service: serviceInput,
      cost: costInput,
      imageUrl: imageUrlInput,
      startedOn: dateInput[0],
      endsOn: dateInput[1],
      duration: duration,
      sharedWith: sharedWith,
    };
    const { pid } = router.query;

    const res = await axios.patch(
      `http://localhost:8000/api/posts/${pid}`,
      updatedPost
      // {
      //   headers: {
      //     authtoken,
      //   },
      // }
    );
    console.log(res);
    // console.log(pid);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //! ************TO GET THE IMAGE FROM API*************

  useEffect(() => {
    let config = {
      headers: {
        Authorization: "Bearer sk_3140594751fa058b886b338c26272f7b",
      },
    };

    const timeOut = setTimeout(() => {
      const getServices = async () => {
        try {
          const res = await axios.get(
            `https://autocomplete.clearbit.com/v1/companies/suggest?query=${serviceInput}`,
            config
          );
          setServices(res.data);
          setImageUrlInput(res.data[0].logo);
          // console.log(res);
        } catch (err) {
          console.log(err);
        }
      };
      getServices();
    }, 500);
    return () => clearTimeout(timeOut);
  }, [serviceInput]);

  // ! ************TO GET THE IMAGE FROM API*************
  // const datePickHandler = (e) => {
  //   console.log(dateRange);
  // };

  return (
    <div className="flex flex-col items-center w-full p-5 rounded-lg tablet-s:max-w-[400px] max-w-[300px] dark:bg-bgBlackSec bg-bgWhiteSec">
      <h1 className="mt-6 mb-8 text-xl font-bold tracking-wide text-center underline uppercase decoration-4 decoration-bgyellow underline-offset-4 ">
        Edit Subscription
      </h1>
      <div className="flex flex-col items-center gap-4 tablet-s:flex-row">
        {services[0] && (
          <img
            className="max-w-24 max-h-24"
            src={services[0].logo}
            alt="Flipkart Logo"
          />
        )}
        <div className="flex flex-col items-center justify-center w-full py-8">
          <input
            list="services"
            placeholder="Select a service"
            className=" inputBox peer bg-bgblack"
            id="ServiceProvider"
            type="text"
            value={serviceInput}
            onChange={(e) => {
              setServiceInput(e.target.value);
            }}
          />
          <datalist id="services">
            {services.map((s) => {
              return <option key={s.domain} value={s.name} />;
            })}
          </datalist>

          <div className="relative mt-8">
            <input
              placeholder="Cost"
              className="inputBox peer bg-bgblack"
              id="Cost"
              type="number"
              value={costInput}
              onChange={(e) => {
                setCostInput(e.target.value);
              }}
            />
          </div>

          <div className="mt-8 ">
            <DatePicker
              selectsRange={true}
              startDate={startDatePicker}
              endDate={endDatePicker}
              onChange={(update) => {
                setDateRange(update);
                setDateInput(update);
              }}
              withPortal
              placeholderText="Select Date"
              className="inputBox bg-bgblack"
            />
          </div>
          <div className="w-full mt-6 mb-2">
            <Multiselect
              isObject={true}
              onRemove={(e) => setSharedWithInput(e)}
              onSelect={(e) => setSharedWithInput(e)}
              options={friendsDropdown}
              displayValue="key"
              showCheckbox
              placeholder="Select People"
              className=" inputBox bg-bgblack"
              id="css_custom"
              style={{
                chips: { background: "#141921" },
                searchBox: {
                  border: "none",
                  outline: "none",
                  // "border-bottom": "1px solid blue",
                  // "border-radius": "0px",
                },
                option: {
                  // To change css for dropdown options
                  color: "white",
                },
                optionContainer: {
                  // To change css for option container
                  // border: "2px solid",
                  background: "#0D1117",
                  outline: "none",
                },
              }}
            ></Multiselect>
          </div>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 mt-6 font-bold uppercase bg-yellow-200 rounded-md text-bgblack"
              onClick={() => router.push(`/${userId}/all-subscriptions`)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 mt-6 font-bold uppercase rounded-md bg-bgyellow text-bgblack"
              onClick={submitHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSubscriptionForm;
