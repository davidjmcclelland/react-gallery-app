import React, { useState, useEffect } from "react";
import Image from "./Image";
import getURIs from "../helpers/getURIs";
//endpoints
// 'https://dog.ceo/api/breed/affenpinscher/images/random'
const breedsEndPoint = "https://dog.ceo/api/breeds/list/all";
let loadingStage = 0;
let imagesLoaded = 0;

const Gallery = () => {
  const [breeds, setBreeds] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);
  
  const fetchBreeds = async () => {
    const response = await fetch(breedsEndPoint);
    let breeds = await response.json();
    breeds = Object.keys(breeds.message);
    setBreeds(breeds);
    requestRandomPics(getURIs(breeds));
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

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
    setImageList(imageURLs);
  };

  const checkIfLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded == breeds.length) {
        setLoadingImages(false);
    }
  }

  const ShowImages = () => {
    return (
      <>
        <div className="js_gallery" key="0">
          {breeds.map((breed, index) => (
            <Image
              breed={breed}
              imageRequest={imageList[index]}
              key={index}
              loadedFunc={checkIfLoaded} />
          ))}
        </div>
      </>
    );
  }

  const ShowLoading = () => {
    return (
      <>
        <div>Loading...</div>
      </>
    )
  }

  const LoadSwitcher = (props) => {
     if (props.loading) {
       return <ShowLoading />;
    }
    return <ShowImages />;
  }

    return (
      <>
        <LoadSwitcher loading={loadingImages} />
      </>
    );
}

export default Gallery;
