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
  const [imageURLs, setImageURLs] = useState([]);
  
  const fetchBreeds = async () => {
    const response = await fetch(breedsEndPoint);
    let breedList = await response.json();
    breedList = Object.keys(breedList.message);
    setBreeds(breedList);
    return breedList;
  };

  useEffect(() => {
    fetchBreeds().then((data) => {
      requestRandomPics(getURIs(data)).then((data) => {
        setImageURLs(data);
      });
    });
  }, []);

  return (
    <>
      <div className="js_gallery">
        {imageURLs.map((src, index) => (
          <Image src={src} breed={breeds[index]} key={index} />
        ))}
      </div>
    </>
  );
};

export default Gallery;
