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

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <ErrorBox errorMsg={error.message} />
      ) : (
        <>
          {data ? (
            <div>
              {/* <NavbarTop loggedUserFullName={data.fullName} avatar={data.avatar} /> */}

              <Navbar bg='light' expand='lg' className='justify-content-between'>
                <Container>
                  <Navbar.Brand href='#home'>Your Brand</Navbar.Brand>
                  <Navbar.Toggle aria-controls='basic-navbar-nav' />
                  <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ml-auto'>
                      <NavDropdown title={data?.fullName} id='basic-nav-dropdown'>
                        <NavDropdown.Item href='#action/3.4'>Sign out</NavDropdown.Item>
                      </NavDropdown>
                      <Navbar.Text>
                        Signed in as: <a href='#login'>{data?.fullName}</a>
                      </Navbar.Text>
                      {data?.avatar && (
                        <Image src={data.avatar} roundedCircle={true} style={{ width: '40px', marginLeft: '10px' }} />
                      )}
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>

              <Container className='text-center mt-4'>
                <h1>Welcome {data?.fullName} </h1>
                <UserPhotosCarousel photos={data!.photos} />
              </Container>
            </div>
          ) : (
            <div>No data available.</div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
