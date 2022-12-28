import React, { useState, useEffect  } from "react";

//endpoints
// 'https://dog.ceo/api/breed/affenpinscher/images/random'
//const breedsEndPoint = 'https://dog.ceo/api/breeds/list/all';
// "https://jsonplaceholder.typicode.com/users"

const Gallery = () => {

  const [breeds, setBreeds] = useState([]);

  const fetchBreeds = async () => {

    let breeds = ["Beagle", "Doberman", "Retriever"];;
    //breeds = Object.keys(breeds.message);

    setBreeds(breeds);
  }

  useEffect(() => {
    fetchBreeds();
  }, []);

  return (
    <>
    <div className="get-breeds">Get Breeds</div>
    <div className="breed-names">
        {breeds.map((breed) => (
          <div key={breed}>{breed}</div>
        ))}
    </div>
    </>
  )
}

export default Gallery;