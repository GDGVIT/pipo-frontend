import Identicon from "identicon.js";

// To generate a 32 bit hash for Identicon
const convertHash = (str) => {
  let hash = 0,
    i,
    chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

const generateIdenticon = (str) => {
  const hash = convertHash(str);
  console.log("hash", hash);
  let data = new Identicon(hash, 420).toString();
  const src = "data:image/png;base64," + data;
  return src;
};

const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};

export { stringToColor, generateIdenticon };
