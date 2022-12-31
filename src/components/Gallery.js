import React, { useState, useEffect } from "react";
import Image from "./Image";
import getURIs from "../helpers/getURIs";

const breedsEndPoint = "https://dog.ceo/api/breeds/list/all";

const requestRandomPicURLs = async (_imageRequests) => {
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
    const [images, setImages] = useState([]);

    const fetchBreeds = async () => {
      const response = await fetch(breedsEndPoint);
      let breedList = await response.json();
      breedList = Object.keys(breedList.message);
      setBreeds(breedList);
      return breedList;
    };

    useEffect(() => {
      fetchBreeds().then((data) => {
        requestRandomPicURLs(getURIs(data)).then((data) => {
          fetchImages(data).then((data) => {
            setImages(data);
          });
        });
      });
    }, []);

    // fetch image data from API
    async function fetchImages(imageList) {
      return new Promise((resolve) => {
        resolve(imageList);
      });
    }

    return (
      <>
        <div className="js_gallery">
          {images.map((src, index) => (
            <Image src={src} breed={breeds[index]} key={index} />
          ))}
        </div>
      </>
    );
  };

export default Gallery;
