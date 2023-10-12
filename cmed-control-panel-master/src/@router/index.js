import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../screens/Home/Home';
import Doctors from '../screens/LeftSideBar/Users/Doctors/Doctors';
import Patients from '../screens/LeftSideBar/Users/Patients/Patients';
import Translaters from '../screens/LeftSideBar/Users/Translaters/Translaters';
import Residents from '../screens/LeftSideBar/Users/Residents/Residents';
import Articles from '../screens/LeftSideBar/Posts/Articles/Articles';
import MedicalJournal from '../screens/LeftSideBar/Posts/MedicalJournal/Medicalournal';
import News from '../screens/LeftSideBar/Posts/News/News';
import Admin from '../screens/LeftSideBar/Managers/Admin/Admin';
import Managers from '../screens/LeftSideBar/Managers/Managers/Managers';
import SuperAdmin from '../screens/LeftSideBar/Managers/SuperAdmin/SuperAdmin';
import Forum from '../screens/Forum/Forum';
import Reports from '../screens/LeftSideBar/Reports/Reports';
import Layout from '../screens/Layout/Layout';
import LoginPage from '../screens/Accounting/Login/LoginPage.js';
import { useEffect, useState } from 'react';
import Profile from "../screens/Profile/Profile";
import Roles from "../screens/LeftSideBar/DataSettings/Roles/Roles";




const Router = () => {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      setToken('');
      localStorage.clear();
    } else {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <div style={{ width: '100%' }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users/doctors" element={<Doctors />} />
            <Route path="/users/patients" element={<Patients />} />
            <Route path="/users/translaters" element={<Translaters />} />
            <Route path="/users/residents" element={<Residents />} />
            <Route path="/posts/articles" element={<Articles />} />
            <Route path="/posts/medical-journal" element={<MedicalJournal />} />
            <Route path="/posts/news" element={<News />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/managers/admin" element={<Admin />} />
            <Route path="/managers/managers" element={<Managers />} />
            <Route path="/managers/super-admin" element={<SuperAdmin />} />
            <Route path="/settings/roles" element={<Roles />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Router;
