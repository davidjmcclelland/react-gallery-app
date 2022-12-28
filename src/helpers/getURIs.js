const getURIs = (names) => {
  // take array and return array
  // 'https://dog.ceo/api/breed/affenpinscher/images/random'

  
  const URIs = names.map((dogBreedName) => {
    return `https://dog.ceo/api/breed/${dogBreedName}/images/random`;
  })
  return URIs;
};

export default getURIs;