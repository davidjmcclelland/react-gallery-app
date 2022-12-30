const Image = (props) => {

  const src = props.src;
  const breed = props.breed;
  const imageRequest = props.imageRequest;

  return <div className="js_img" key={breed}>{breed}<br />{src}</div>;
}

export default Image;