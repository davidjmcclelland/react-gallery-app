import React, { useEffect, useState } from "react";
import getURIs from "../helpers/getURIs";
import Image from "./Image";

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

const ImageLoadResults = ({ images }) => {
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

    let height = {
       display: ready ? "none" : "flex"
  };
  
  let overflow = {
    overflow: ready ? "visible" : 'hidden'
  }

    let display = {
       visibility: ready ? "visible" : "hidden"
    };

  return (
    <>
      <div id="js_loading" style={{ display: ready ? "none" : "flex" }}>
        <h1>Loading...</h1>
      </div>
      <div id="js_gallery" style={{ ...display, ...overflow }}>
        {breeds &&
          breeds.length > 0 &&
          images.results.map((result, index) => {
            return (
              <Image
                breed={breeds[index]}
                loadedFunc={handleImageLoaded}
                index={index}
                imageSrc={result}
              />
            );
          })}
      </div>
    </>
  );
};

let breeds;

export default function Gallery() {
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
    });
  }, []);

  // fetch image data from API
  async function fetchImages(imageList) {
    return new Promise((resolve) => {
      resolve(imageList);
    });
  }

  const ShowLoading = () => {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  };

  return (
    <div>
      {images && images.length && (
        <ImageLoadResults images={{ results: images }} />
      )}
    </div>
  );
}
