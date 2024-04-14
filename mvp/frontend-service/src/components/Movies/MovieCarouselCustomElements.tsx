import { ButtonGroupProps } from 'react-multi-carousel';

const CustomCarouselButtonGroup = ({ next, previous }: ButtonGroupProps) => {
  return (
    <>
      <button
        className='custom-carousel-button custom-carousel-button__left'
        aria-label='Go to previous slide'
        onClick={() => previous!()}
      >
        Previous slide
      </button>
      <button
        className='custom-carousel-button custom-carousel-button__right'
        aria-label='Go to next slide'
        onClick={() => next!()}
      >
        Next slide
      </button>
    </>
  );
};

export { CustomCarouselButtonGroup };
