import {useState} from 'react';

const Image = (props) => {

  const breed = props.breed;
  const handleImageLoaded = props.loadedFunc;
  const index = props.index;
  const imageSrc = props.imageSrc;

  const [isTooltipShown, setIsTooltipShown] = useState(false);
  
  const breedNameHandleHover = () => {
    setIsTooltipShown(true);
  };

  const breedNameHandleNoHover = () => {
    setIsTooltipShown(false);
  };

  return (
    <div className="image_container" key={index}>
      <>
        <img
          className="js_img"
          key={`img${index}`}
          src={imageSrc}
          alt={breed}
          onLoad={() => {
            handleImageLoaded(imageSrc);
          }}
          onMouseEnter={(e) => breedNameHandleHover(e)}
          onMouseLeave={breedNameHandleNoHover}
        />
        <span
          className="js_name"
          key={`_${index}`}
          style={{ display: isTooltipShown ? "block" : "none" }}
        >
          &nbsp;{breed}
        </span>
      </>
    </div>
  );
};

export default Image;
