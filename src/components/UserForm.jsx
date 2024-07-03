import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../redux/feature/usersSlice';

const UserForm = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    city: '',
    district: '',
    province: '',
    country: 'Nepal',
    profilePicture: null,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{7,}$/.test(formData.phone)) newErrors.phone = 'Phone number is invalid';
    if (formData.profilePicture && formData.profilePicture.type !== 'image/png') newErrors.profilePicture = 'Only PNG files are allowed';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture') {
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
        name: '',
        email: '',
        phone: '',
        dob: '',
        city: '',
        district: '',
        province: '',
        country: 'Nepal',
        profilePicture: null,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block">Name *</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded w-full" />
        {errors.name && <span className="text-red-500">{errors.name}</span>}
      </div>
      <div>
        <label className="block">Email *</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 rounded w-full" />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>
      <div>
        <label className="block">Phone *</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border p-2 rounded w-full" />
        {errors.phone && <span className="text-red-500">{errors.phone}</span>}
      </div>
      <div>
        <label className="block">DOB</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-2 rounded w-full" />
      </div>
      <div>
        <label className="block">City</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} className="border p-2 rounded w-full" />
      </div>
      <div>
        <label className="block">District</label>
        <input type="text" name="district" value={formData.district} onChange={handleChange} className="border p-2 rounded w-full" />
      </div>
      <div>
        <label className="block">Province</label>
        <select name="province" value={formData.province} onChange={handleChange} className="border p-2 rounded w-full">
          <option value="">Select Province</option>
          <option value="1">Province 1</option>
          <option value="2">Province 2</option>
          <option value="3">Province 3</option>
          <option value="4">Province 4</option>
          <option value="5">Province 5</option>
          <option value="6">Province 6</option>
          <option value="7">Province 7</option>
        </select>
      </div>
      <div>
        <label className="block">Country</label>
        <select name="country" value={formData.country} onChange={handleChange} className="border p-2 rounded w-full">
          {countries.map((country) => (
            <option key={country.cca3} value={country.name.common}>{country.name.common}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block">Profile Picture</label>
        <input type="file" name="profilePicture" onChange={handleChange} accept="image/png" className="border p-2 rounded w-full" />
        {errors.profilePicture && <span className="text-red-500">{errors.profilePicture}</span>}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add User</button>
    </form>
  );
};

export default UserForm;
