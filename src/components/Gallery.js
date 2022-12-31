import React, { useState, useEffect } from "react";
import Image from "./Image";

const breedsEndPoint = "https://dog.ceo/api/breeds/list/all";

const Gallery = () => {
  const [breeds, setBreeds] = useState([]);
  
  const fetchBreeds = async () => {
    const response = await fetch(breedsEndPoint);
    let breedList = await response.json();
    breedList = Object.keys(breedList.message);
    setBreeds(breedList);
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  return (
    <>
      <div className="js_gallery">
        {breeds.map((breed, index) => (
          <Image breed={breed} key={index} />
        ))}
      </div>
    </>
  );
};

export default Gallery;
