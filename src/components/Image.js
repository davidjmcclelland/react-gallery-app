const Image = (props) => {
  const breed = props.breed;
  const handleImageLoaded = props.loadedFunc;
  const index = props.index;
  const imageSrc = props.imageSrc;

  return (
    <div className="js_img" key={index}>
      <img
        className="js_img"
        src={imageSrc}
        alt={breed}
        onLoad={() => {
          handleImageLoaded(imageSrc);
        }}
      />
    </div>
  );
};

export default Image;
