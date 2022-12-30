const Image = (props) => {
  const breed = props.breed;
  const handleImageLoaded = props.loadedFunc;
  const index = props.index;
  const imageSrc = props.imageSrc;

  return (
    <div key={index} className="js_img">
      <div>{breed}</div>
      <div>{imageSrc}</div>
      <img
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
