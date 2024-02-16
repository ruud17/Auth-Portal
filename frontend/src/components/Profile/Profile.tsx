import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setLoading, setUser, setError } from '../../redux/loggedUser';
import { getUserInfo } from '../../services/apiService';
import { Carousel } from 'react-responsive-carousel';
import { Container } from 'react-bootstrap';

const Profile: FC = () => {
    const dispatch = useDispatch();
    const { loggedUser, loading, error } = useSelector((state: RootState) => state.user);

    const settings = {
        dots: true,
        // infinite: true,
        speed: 500,
        // slidesToShow: 1,
        slidesToScroll: 1
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // dispatch(setLoading(true));
                const userInfo = await getUserInfo();
                dispatch(setUser(userInfo));
            } catch (err: unknown) {
                dispatch(setError(err));
            }
        };

        fetchUserProfile();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container className="userProfileContainer">
            <h1>User Profile</h1>
            {loggedUser && (
                <Carousel
                    showArrows={true} // Show left/right arrow controls
                    autoPlay={true} // Enable auto play
                    interval={3000} // Set auto play interval (3 seconds)
                    infiniteLoop={true} // Enable infinite loop
                    showThumbs={false} // Hide thumbnail images
                    showStatus={false} // Hide the status of the current slide
                    useKeyboardArrows={true} // Allow arrow key navigation
                    // dynamicHeight={true} // Adjust the height dynamically
                    swipeable={true} // Enable swipe actions for touch devices
                    stopOnHover={true}
                >
                    {loggedUser.photos.map((photo, index) => (
                        <div key={index}>
                            <img src={photo.url} alt={`${photo.name}`} style={{ width: '100%' }} />
                        </div>
                    ))}
                </Carousel>
            )
            }
        </Container >
    );
};

export default Profile;