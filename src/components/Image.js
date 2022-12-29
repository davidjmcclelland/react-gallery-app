const Image = (props) => {

  const breed = props.breed;
  const imageRequest = props.imageRequest;

  return (
    <div className="js_img" key={breed}>
      {breed}
      <img src={imageRequest}></img>
    </div>
  );
}

export default Image;