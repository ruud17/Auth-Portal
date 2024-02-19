import { FC, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserPhotosCarousel from './UserPhotosCarousel';
import NavbarTop from '../Common/NavbarTop';
import ErrorBox from 'components/Common/ErrorBox';
import { ENDPOINT, ROUTE, UNAUTHORIZED_ERROR_CODE } from 'constants/constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getUserProfleThunk } from '../../store/slices/userSlice';
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
            navigate(ROUTE.LOGIN);
          }
        }
      }
    });
  }, [dispatch, navigate]);

  const signOut = () => {
    removeToken();
    navigate(ROUTE.LOGIN);
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
