import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../redux/feature/usersSlice';

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
      <table className="min-w-full bg-white">
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
                <option value="1">Province 1</option>
                <option value="2">Province 2</option>
                <option value="3">Province 3</option>
                <option value="4">Province 4</option>
                <option value="5">Province 5</option>
                <option value="6">Province 6</option>
                <option value="7">Province 7</option>
              </select> : user.province}</td>
              <td className="border px-4 py-2">{editingIndex === index ? <select name="country" value={editingUser.country} onChange={handleChange} className="border p-2 rounded w-full">
                {countries.map((country) => (
                  <option key={country.cca3} value={country.name.common}>{country.name.common}</option>
                ))}
              </select> : user.country}</td>
              <td className="border px-4 py-2">
                {editingIndex === index ? <button onClick={handleUpdate} className="bg-green-500 text-white p-1 mt-10 ml-3 rounded">Save</button> : <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white p-2 rounded">Edit</button>}
                <button onClick={() => handleDelete(index)} className="bg-red-500 text-white ml-2 p-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className="bg-blue-500 text-white p-2 rounded mx-1">
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default UserTable;
