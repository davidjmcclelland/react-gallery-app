const Image = (props) => {

  const breed = props.breed;
  const imageRequest = props.imageRequest;

  return <div className="js_img" key={breed}>{breed}<br />{imageRequest}</div>;
}

export default Image;