import { FC, useEffect } from 'react';
import { Container, Nav, NavDropdown, Navbar, Image } from 'react-bootstrap';
import { LOGIN_ENDPOINT } from '../../services/apiEndpoints';
import { useNavigate } from 'react-router-dom';
import UserPhotosCarousel from './UserPhotosCarousel';
import NavbarTop from '../Common/NavbarTop';
import ErrorBox from 'components/Common/ErrorBox';
import { UNAUTHORIZED_ERROR_CODE } from 'constants/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserProfleThunk } from '../../redux/slices/userSlice';
import { removeToken } from 'utils/localStorageHelper';

const Profile: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserProfleThunk()).then((actionResult) => {
      if (getUserProfleThunk.rejected.match(actionResult)) {
        if (actionResult.payload && typeof actionResult.payload !== 'string') {
          // if token expired; go to login page
          if (actionResult.payload.statusCode === UNAUTHORIZED_ERROR_CODE) {
            navigate(LOGIN_ENDPOINT);
          }
        }
      }
    });
  }, [dispatch, navigate]);

  const signOut = () => {
    removeToken();
    navigate(LOGIN_ENDPOINT);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <ErrorBox errorMsg={error.message} />
      ) : (
        <>
          {data ? (
            <>
              <NavbarTop userFullName={data?.fullName} avatar={data.avatar} signOut={signOut} />

              <Container className='text-center welcome-message'>
                <h2>WELCOME {data?.fullName}</h2>
              </Container>

              <Container className='carousel-container'>
                <UserPhotosCarousel photos={data!.photos} />
              </Container>
            </>
          ) : (
            <Container>No data available.</Container>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
