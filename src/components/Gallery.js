import React, { useState, useEffect } from "react";
import Image from "./Image";
import getURIs from "../helpers/getURIs";
//endpoints
// 'https://dog.ceo/api/breed/affenpinscher/images/random'
const breedsEndPoint = "https://dog.ceo/api/breeds/list/all";
// "https://jsonplaceholder.typicode.com/users"

const Gallery = () => {
  const [breeds, setBreeds] = useState([]);
  const [imageRequests, setImageRequests] = useState([]);
  const [imageList, setImageList] = useState([]);

  const fetchBreeds = async () => {
    const response = await fetch(breedsEndPoint);
    let breeds = await response.json();
    breeds = Object.keys(breeds.message);
    setBreeds(breeds);
    setImageRequests(getURIs(breeds));
    requestRandomPics();
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  const requestRandomPics = async () => {
    const links = await Promise.all(
      imageRequests.map(async (url) => {
        const resp = await fetch(url);
        return resp.json();
      })
    );
    const imageURLs = links.map((link) => {
      return link.message;
    });
    setImageList(imageURLs);
  };

  return (
    <>
      <div className="js_gallery">
        {breeds.map((breed, index) => (
          <Image breed={breed} imageRequest={imageList[index]} />
        ))}
      </div>
    </>
  );
};

export default Gallery;
