import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';
import ProfilesPage from './components/ProfilesPage';
import { fetchCountries } from './redux/feature/countriesSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <Router>
      <div className=" mx-auto p-4">
        <Routes>
          <Route path="/" element={
            <>
              <UserForm />
              <UserTable />
              <Link className='flex justify-end'  to="/profiles">
                <button className="bg-[#483EFF] text-white p-2 px-12 rounded mt-4">Go to Profiles</button>
              </Link>
            </>
          } />
          <Route path="/profiles" element={<ProfilesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
