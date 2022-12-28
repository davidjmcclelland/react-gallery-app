import React, { useState, useEffect } from "react";
import Image from './Image';

//endpoints
// 'https://dog.ceo/api/breed/affenpinscher/images/random'
//const breedsEndPoint = 'https://dog.ceo/api/breeds/list/all';
// "https://jsonplaceholder.typicode.com/users"

const Gallery = () => {

  const [breeds, setBreeds] = useState([]);

  const fetchBreeds = async () => {

    let breeds = ["African", "Airdale", "Beagle", "Coondog", "Doberman", "Labrador", "Pointer", "Retriever", "Setter"];;

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