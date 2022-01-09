import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { MultiSelect } from "react-multi-select-component";
import { useGlobalAuthContext } from "../../AuthContext";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

const NewSubscriptionForm = () => {
  const [services, setServices] = useState([]);
  const [servicesInput, setServicesInput] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selected, setSelected] = useState([]);

  const { user } = useGlobalAuthContext();
  // const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  // const addDays = (date, days) => {
  //   var result = new Date(date);
  //   result.setDate(result.getDate() + days);
  //   return result;
  // };

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
            `https://autocomplete.clearbit.com/v1/companies/suggest?query=${servicesInput}`,
            config
          );
          setServices(res.data);
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      };
      getServices();
    }, 500);
    return () => clearTimeout(timeOut);
  }, [servicesInput]);

  const getNoOfDays = (date1, date2) => {
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    console.log(Difference_In_Days);
  };

  const datePickHandler = (e) => {
    setStartDate(e.target.value[0]);
    setEndDate(e.target.value[1]);
  };

  const submitHandler = () => {
    console.log(user);
    // console.log(servicesInput);
    // console.log(startDate);
    // console.log(endDate);

    // getNoOfDays(startDate, endDate);
  };

  return (
    <div className="flex flex-col items-center max-w-[300px]">
      <h1 className="mt-6 mb-2 text-lg font-bold underline decoration-2 decoration-bgyellow underline-offset-4 ">
        Add a new Subscription
      </h1>
      <div className="flex flex-col items-center gap-4 tablet-s:flex-row">
        {services[0] && (
          //   <Image
          //     src={services[0].logo}
          //     alt="Landscape picture"
          //     width={500}
          //     height={500}
          //   />
          <img
            className="max-w-24 max-h-24"
            src={services[0].logo}
            alt="Flipkart Logo"
          />
        )}
        <div className="flex flex-col px-5 py-8 pr-10">
          <div className="relative ">
            <input
              list="services"
              placeholder="Enter your email address"
              className="inputBox peer"
              id="ServiceProvider"
              type="text"
              onChange={(e) => {
                setServicesInput(e.target.value);
              }}
            />
            <datalist id="services">
              {services.map((s) => {
                return <option key={s.domain} value={s.name} />;
              })}
            </datalist>
            <label className="inputLabel" htmlFor="ServiceProvider">
              Service Provider
            </label>
          </div>
          <div className="relative mt-8">
            <input
              placeholder="Enter your email address"
              className="inputBox peer"
              id="Cost"
              type="number"
            />
            <label className="inputLabel" htmlFor="Cost">
              Cost
            </label>
          </div>
          <div className="relative mt-8">
            <input
              placeholder="Enter your email address"
              className="inputBox peer"
              id="Duration"
              type="text"
            />
            <label className="inputLabel" htmlFor="Duration">
              Duration
            </label>
          </div>
          <div className="mt-8 ">
            {/* <p>Select Start and End Date</p> */}
            <DateRangePickerComponent
              // style={{ borderColor: "yellow" }}
              placeholder="Start - End"
              onChange={(e) => datePickHandler(e)}
            />
            {/* <input
              placeholder="Enter your email address"
              className="inputBox peer"
              id="BoughtOn"
              type="date"
              onChange={(e) => {
                setDate(e.target.value);
                console.log(addDays(e.target.value, 12));
              }}
              value={date}
            />
            <label className="inputLabel" htmlFor="BoughtOn">
              Bought on
            </label> */}
          </div>
          <div className="max-w-[200px]">
            <p className="mt-6 mb-2 text-sm text-gray-500">Select Fruits</p>
            {/* <pre>{JSON.stringify(selected)}</pre> */}
            <MultiSelect
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
            />
          </div>
          <button
            className="py-1 mt-6 rounded-md bg-bgyellow"
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewSubscriptionForm;
