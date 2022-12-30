import React, { useEffect, useState } from "react";
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
    return imageURLs
};
  
function HeaderResults({ images }) {
  const [loadedImages, setLoadedImages] = useState({});
  const [ready, setReady] = useState(false);

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
    <div
      id="js_gallery"
      style={{ visibility: ready ? "visible" : "hidden" }}
    >
      {images.results.map((result, index) => {
        return (
          <div className="result-item" key={index}>
            <img
              className="js_img"
              src={result}
              alt="..."
              onLoad={() => {
                handleImageLoaded(result);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function AltGallery() {
  const [images, setImages] = useState([]);
  const fetchBreeds = async () => {
    const response = await fetch(breedsEndPoint);
    let breeds = await response.json();
    breeds = Object.keys(breeds.message);
    return breeds;
  };

  useEffect(() => {
    fetchBreeds().then((data) => {
      requestRandomPics(getURIs(data)).then((data) => {
        fetchImages(data).then((data) => {
          setImages(data);
        });
      });
    })
  }, []);

  // Simulate fetch data from API
  async function fetchImages(imageList) {
    return new Promise((resolve) => {
      // Delay 2 seconds then return response
      setTimeout(() => {
        resolve(imageList);
      }, 2000);
    });
  }

  //TODO: show loading until images are all loaded
  return (
    <div>
      Hello World
      {images && images.length && <HeaderResults images={{ results: images }} />}
    </div>
  );
}
