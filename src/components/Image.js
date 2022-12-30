const Image = (props) => {
  const breed = props.breed;
  const imageRequest = props.imageRequest;
  const imageLoaded = props.loadedFunc;

  return (
    <div key={breed}>
      {breed}
      <img
        className="js_img"
        src={imageRequest}
        key={breed}
        onLoad={() => imageLoaded()}
        alt={breed}
      />
    </div>
  );
};

export default Image;
