const getHash = () => 
    location.hash.slice(1).toLocaleLowerCase()

export default getHash;