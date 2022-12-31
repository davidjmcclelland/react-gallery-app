const Image = (props) => {
  const breed = props.breed;
  const handleImageLoaded = props.loadedFunc;
  const index = props.index;
  const imageSrc = props.imageSrc;

  // handleImageLoaded is a callback function passed into Image via props
  // when image has finished loading it triggers the callback and returns the
  // image src url to handleImageLoaded within ImageLoadResults
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
