import React, { useState, useEffect } from "react";
import Image from './Image';
import getURIs from '../helpers/getURIs';
//endpoints
// 'https://dog.ceo/api/breed/affenpinscher/images/random'
const breedsEndPoint = 'https://dog.ceo/api/breeds/list/all';
// "https://jsonplaceholder.typicode.com/users"

const Gallery = () => {

  const [breeds, setBreeds] = useState([]);

  const fetchBreeds = async () => {
    const response = await fetch(breedsEndPoint);
    let breeds = await response.json();
    breeds = Object.keys(breeds.message);
    setBreeds(breeds);
  }

  useEffect(() => {
    fetchBreeds();
  }, []);

  return (
    <>
    <div className="js_gallery">
        {breeds.map((breed) => (
          <Image breed={breed} />
        ))}
    </div>
    </>
  )
}

export default Gallery;