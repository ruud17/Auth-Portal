import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getUserInfo } from '../../services/apiService';
import { Container } from 'react-bootstrap';
import { LOGIN_ENDPOINT } from '../../services/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import UserPhotosCarousel from './UserPhotosCarousel';
import NavbarTop from '../Common/NavbarTop';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // const fetchUserProfile = async () => {
    //   try {
    //     dispatch(setLoading(true));
    //     const userInfo = await getUserInfo();
    //     dispatch(setUser(userInfo));
    //   } catch (err: any) {
    //     dispatch(setError(err.response.data));
    //     if (err.response.status === 401) {
    //       navigate(LOGIN_ENDPOINT); // Unauthorized or token expired
    //     }
    //   }
    // };
    // fetchUserProfile();
  }, [dispatch]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <>
      {/* {loggedUser && (
        <>
          <NavbarTop loggedUserFullName={loggedUser?.fullName} avatar={loggedUser?.avatar} />
          <Container className='userProfileContainer'>
            <h1>Welcome {loggedUser?.fullName} </h1>
            <UserPhotosCarousel photos={loggedUser!.photos} />
          </Container>
        </>
      )} */}
    </>
  );
};

export default Profile;
