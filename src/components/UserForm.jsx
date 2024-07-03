import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/feature/usersSlice";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const UserForm = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    city: "",
    district: "",
    province: "",
    country: "Nepal",
    profilePicture: null,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{7,}$/.test(formData.phone))
      newErrors.phone = "Phone number is invalid";
    if (formData.profilePicture && formData.profilePicture.type !== "image/png")
      newErrors.profilePicture = "Only PNG files are allowed";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePicture") {
      setFormData({ ...formData, profilePicture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(addUser(formData));
      setFormData({
        name: "",
        email: "",
        phone: "",
        dob: "",
        city: "",
        district: "",
        province: "",
        country: "Nepal",
        profilePicture: null,
      });
    }
  };

  return (
    <div className="container flex p-5 gap-8 border border-gray-300 shadow-md rounded-md lg:w-[80%] mb-14">
      <div className="w-[35%] hidden md:block">
        <img src="/images/img1.png" className="h-full" />
      </div>
      <div className="md:w-[65%]">
        <h2 className="font-medium text-2xl pt-5">Add New Entry!</h2>
        <form onSubmit={handleSubmit} className=" p-4 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </div>
          <div className="col-span-2">
            <label className="block">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </div>
          <div className="col-span-2">
            <label className="block">Phone *</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone}</span>
            )}
          </div>
          <div>
            <label className="block">DOB</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block">District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block">Province</label>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value="">Select Province</option>
              <option value="Koshi">Koshi Province</option>
              <option value="Madesh"> Madesh Province </option>
              <option value="Bagmati">Bagmati Province </option>
              <option value="Gandaki"> Gandaki Province </option>
              <option value="Lumbini"> Lumbini Province </option>
              <option value="Karnali"> Karnali Province </option>
              <option value="Sudurpaschim"> Sudurpaschim Province </option>
            </select>
          </div>
          <div>
            <label className="block">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              {countries.map((country) => (
                <option key={country.cca3} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block">Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleChange}
              accept="image/png"
              className="border p-2 rounded w-full"
            />
            {errors.profilePicture && (
              <span className="text-red-500">{errors.profilePicture}</span>
            )}
          </div>
          {/* <div className='col-span-2 mt-5 '> */}
          <button
            type="submit"
            className="bg-[#483EFF] justify-center text-white p-2 rounded  flex items-center gap-2 mt-4"
          >
            Add User <FaRegArrowAltCircleRight />
          </button>
          {/* </div> */}
        </form>
      </div>
      
    </div>
  );
};

export default UserForm;