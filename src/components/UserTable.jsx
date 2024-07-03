import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../redux/feature/usersSlice';
import { FaDeleteLeft } from "react-icons/fa6";

const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const countries = useSelector((state) => state.countries);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingUser, setEditingUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingUser(users[index]);
  };

  const handleDelete = (index) => {
    dispatch(deleteUser(index));
  };

  const handleUpdate = () => {
    dispatch(updateUser({ index: editingIndex, user: editingUser }));
    setEditingIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({ ...editingUser, [name]: value });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <hr className="border border-gray-300 w-full mb-14" />
      <table className="min-w-full bg-gray-300 shadow-md border border-gray-400  rounded-xl">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Phone</th>
            <th className="py-2">DOB</th>
            <th className="py-2">City</th>
            <th className="py-2">District</th>
            <th className="py-2">Province</th>
            <th className="py-2">Country</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{editingIndex === index ? <input type="text" name="name" value={editingUser.name} onChange={handleChange} className="border p-2 rounded w-full" /> : user.name}</td>
              <td className="border px-4 py-2">{editingIndex === index ? <input type="email" name="email" value={editingUser.email} onChange={handleChange} className="border p-2 rounded w-full" /> : user.email}</td>
              <td className="border px-4 py-2">{editingIndex === index ? <input type="text" name="phone" value={editingUser.phone} onChange={handleChange} className="border p-2 rounded w-full" /> : user.phone}</td>
              <td className="border px-4 py-2">{editingIndex === index ? <input type="date" name="dob" value={editingUser.dob} onChange={handleChange} className="border p-2 rounded w-full" /> : user.dob}</td>
              <td className="border px-4 py-2">{editingIndex === index ? <input type="text" name="city" value={editingUser.city} onChange={handleChange} className="border p-2 rounded w-full" /> : user.city}</td>
              <td className="border px-4 py-2">{editingIndex === index ? <input type="text" name="district" value={editingUser.district} onChange={handleChange} className="border p-2 rounded w-full" /> : user.district}</td>
              <td className="border px-4 py-2">{editingIndex === index ? <select name="province" value={editingUser.province} onChange={handleChange} className="border p-2 rounded w-full">
              <option value="">Select Province</option>
              <option value="Koshi">Koshi Province</option>
              <option value="Madesh"> Madesh Province </option>
              <option value="Bagmati">Bagmati Province </option>
              <option value="Gandaki"> Gandaki Province </option>
              <option value="Lumbini"> Lumbini Province </option>
              <option value="Karnali"> Karnali Province </option>
              <option value="Sudurpaschim"> Sudurpaschim Province </option>
              </select> : user.province}</td>
              <td className="border px-4 py-2">{editingIndex === index ? <select name="country" value={editingUser.country} onChange={handleChange} className="border p-2 rounded w-full">
                {countries.map((country) => (
                  <option key={country.cca3} value={country.name.common}>{country.name.common}</option>
                ))}
              </select> : user.country}</td>
              <td className="border px-4 py-2">
              <td className="border px-4 py-2">
  <div className="flex gap-2 space-x-2 items-center">
    {editingIndex === index ? (
      <button
        onClick={handleUpdate}
        className="bg-[#6259ff] text-white p-2 rounded"
      >
        Save
      </button>
    ) : (
      <button
        onClick={() => handleEdit(index)}
        className="bg-white text-black border  p-2  rounded"
      >
        Edit
      </button>
    )}
    <button
      onClick={() => handleDelete(index)}
      className=" text-3xl "
    >
      <FaDeleteLeft /> 
    </button>
  </div>
</td>

</td>

            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className="border border-gray-400  p-1  px-3 rounded-full mx-1">
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default UserTable;