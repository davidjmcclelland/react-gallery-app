import {useState} from 'react';

const Image = (props) => {

  const breed = props.breed;
  const handleImageLoaded = props.loadedFunc;
  const index = props.index;
  const imageSrc = props.imageSrc;

  const [isTooltipShown, setIsTooltipShown] = useState([false]);
  
  const productNameHandleHover = () => {
    setIsTooltipShown(true);
  };

  const productNameHandleNoHover = () => {
    setIsTooltipShown(false);
  };

  return (
    <div className="js_img" key={index}>
      <img
        className="js_img"
        src={imageSrc}
        alt={breed}
        onLoad={() => {
          handleImageLoaded(imageSrc);
        }}
        onMouseEnter={(e) => productNameHandleHover(e)}
        onMouseLeave={productNameHandleNoHover}
      />
    </div>
  );
};

export default Image;
