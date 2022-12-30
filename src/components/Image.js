const Image = (props) => {

  const src = props.src;
  const breed = props.breed;

  return (
    <div
      className="js_img"
      key={breed}>
      {breed}
      <br />
      {src}
      <br />
      <img src={src} alt={breed} />
    </div>
  )
}

export default Image;