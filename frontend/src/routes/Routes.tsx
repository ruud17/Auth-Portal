import { FC } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Login from 'components/Login/Login';
import Profile from 'components/Profile/Profile';
import Register from 'components/Register/Register';
import { ROUTE } from 'constants/constants';

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE.HOME} element={<Navigate replace to='/register' />} />
        <Route path={ROUTE.REGISTER} element={<Register />} />
        <Route path={ROUTE.LOGIN} element={<Login />} />
        <Route path={ROUTE.PROFILE} element={<Profile />} />
        <Route path={ROUTE.WILD} element={<Navigate replace to='/register' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
