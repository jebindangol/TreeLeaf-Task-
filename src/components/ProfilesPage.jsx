import React from 'react';
import { useSelector } from 'react-redux';

const ProfilesPage = () => {
  const users = useSelector((state) => state.users);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profiles</h1>
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
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phone}</td>
              <td className="border px-4 py-2">{user.dob}</td>
              <td className="border px-4 py-2">{user.city}</td>
              <td className="border px-4 py-2">{user.district}</td>
              <td className="border px-4 py-2">{user.province}</td>
              <td className="border px-4 py-2">{user.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProfilesPage;
