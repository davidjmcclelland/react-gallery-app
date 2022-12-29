const Image = (props) => {
  const breed = props.breed;
  const imageRequest = props.imageRequest;
  const imageLoaded = props.loadedFunc;

  return (
    <div className="js_img" key={breed}>
      {breed}
      <img
        src={imageRequest}
        index={breed}
        onLoad={() => imageLoaded()}
        alt={breed} />
    </div>
  );
};

export default Image;
