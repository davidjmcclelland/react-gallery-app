import React, { useState, useEffect } from "react";
import Image from "./Image";
import getURIs from "../helpers/getURIs";

const breedsEndPoint = "https://dog.ceo/api/breeds/list/all";

  const requestRandomPics = async (_imageRequests) => {
    const links = await Promise.all(
      _imageRequests.map(async (url) => {
        const resp = await fetch(url);
        return resp.json();
      })
    );
    const imageURLs = links.map((link) => {
      return link.message;
    });
    return imageURLs;
};

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
