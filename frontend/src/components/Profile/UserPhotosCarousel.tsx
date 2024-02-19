import { FC } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { IPhoto } from '../../interfaces/IPhoto';

interface UserPhotosCarouselProps {
  photos: IPhoto[];
}

const UserPhotosCarousel: FC<UserPhotosCarouselProps> = ({ photos }) => {
  return (
    <>
      {photos ? (
        <Carousel
          showArrows={true}
          autoPlay={true}
          interval={3000}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          useKeyboardArrows={true}
          swipeable={true}
          stopOnHover={true}
        >
          {photos.map((photo, index) => (
            <div key={index}>
              <img src={photo.url} alt={`${photo.name}`} />
            </div>
          ))}
        </Carousel>
      ) : (
        <h3> No photos to display</h3>
      )}
    </>
  );
};

export default UserPhotosCarousel;
