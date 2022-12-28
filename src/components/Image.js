const Image = (props) => {

  const breed = props.breed;

  return <div className="js_img" key={breed}>{breed}</div>;
}

export default Image;