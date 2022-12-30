import {useState} from 'react';

const Image = (props) => {

  const breed = props.breed;
  const handleImageLoaded = props.loadedFunc;
  const index = props.index;
  const imageSrc = props.imageSrc;

  const [isTooltipShown, setIsTooltipShown] = useState(false);
  
  const productNameHandleHover = () => {
    setIsTooltipShown(true);
  };

  const productNameHandleNoHover = () => {
    setIsTooltipShown(false);
  };

  return (
    <div className="image_container" key={index}>
      <div>
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
        <span
          className="js_name"
          key={`_${index}`}
          style={{ display: isTooltipShown ? "block" : "none" }}
        >
          &nbsp;{breed}
        </span>
      </div>
    </div>
  );
};

export default Image;
