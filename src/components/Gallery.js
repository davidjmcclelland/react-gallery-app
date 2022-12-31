import React, { useEffect, useState } from "react";
import getURIs from "../helpers/getURIs";
import Image from './Image';

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
    return imageURLs
};

// ImageLoadResults contains the gallery of images so that
// the entire gallery visibility can be controlled once loaded.
const ImageLoadResults = ({ images }) => {
  const [loadedImages, setLoadedImages] = useState({});
  const [ready, setReady] = useState(false);

  //Image component is handled withing ImageLoadResults, so the callback function
  // triggered by completed image loads is in this scope.
  // src is the same url 
  function handleImageLoaded(src) {
    
    const newLoadedImages = {
      ...loadedImages,
      [src]: true,
    };

    // Check if all images is loaded
    const newLoadedImagesArr = Object.keys(newLoadedImages);
    if (
      newLoadedImagesArr.length === images.results.length &&
      images.results.every((v) => newLoadedImagesArr.includes(v))
    ) {
      console.log("All images loaded");
      setReady(true);
    }
    setLoadedImages(newLoadedImages);
  }

  //TODO: load images from component or handle hover
  
  return (
    <>
    <div
      id="js_loading"
      style = {{ display: ready ? "none" : "flex" }}
    >
      <h1>Loading...</h1>
    </div>
    <div
      id="js_gallery"
      style={{ visibility: ready ? "visible" : "hidden" }}
    >
      {images.results.map((imageURL, index) => {
        return (
          <Image
            breed={breeds[index]}
            loadedFunc={handleImageLoaded}
            index={index}
            imageSrc={imageURL}
          />
        );
      })}
      </div>
      </>
  );
}

let breeds;

const Gallery = () => {
  const [images, setImages] = useState([]);
  const fetchBreeds = async () => {
    const response = await fetch(breedsEndPoint);
    breeds = await response.json();
    breeds = Object.keys(breeds.message);
    return breeds;
  };

  //daisychain multiple async requests
  useEffect(() => {
    fetchBreeds().then((data) => {
      requestRandomPics(getURIs(data)).then((data) => {
        fetchImages(data).then((data) => {
          setImages(data);
        });
      });
    })
  }, []);

  // fetch image data from API
  async function fetchImages(imageList) {
    return new Promise((resolve) => {
        resolve(imageList);
    });
  }

  return (
    <div>
      {images && <ImageLoadResults images={{ results: images }} />}
    </div>
  );
}

export default Gallery