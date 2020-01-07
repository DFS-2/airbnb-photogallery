const faker = require('faker');
const axios = require('axios');
const convert = require('xml-js');
const db = require('../index.js');
const fs = require(`fs`);
const csvWriter = require(`csv-write-stream`);
var writer = csvWriter();
const imageUrlArray = [];

// const seedListingPhotos = () => {
//   let listingphotos = [];
//   for (let i = 0; i < 400; i += 1) {
//     const listingPhoto = {
//       id: i,
//       imageurl: imageUrlArray[i],
//       imagedescription: faker.random.alphaNumeric(20),
//       views: faker.random.number(20),
//       listing_id: faker.random.number(400)
//     };
//     listingphotos.push(listingPhoto)
//   }
//   // console.log(listingphotos);  
// };
let counter = 8;
userinfoGen = () => {
  writer.pipe(fs.createWriteStream('userinfo.csv', { flags: 'a' }));
  for (var i = 0; i < 20; i++) {
    writer.write({
      id: counter + i,
      username: faker.name.firstName(),
      pass: faker.random.alphaNumeric(20)
    });
  }
  writer.end();
  console.log('done');
};

// const getImageUrls = () => {
//   axios.get('https://gpkhomes.s3-us-west-1.amazonaws.com/')
//     .then((response) => {
//       const options = { ignoreComment: true, alwaysChildren: true };
//       const nodes = convert.xml2js(response.data, options).elements[0].elements;
//       const key = [];
//       for (let i = 6; i < 400; i += 1) {
//         key.push(nodes[i].elements[0].elements[0].text);
//       }
//       return key;
//     })
//     .then((key) => {
//       for (let i = 10; i < 495; i += 1) {
//         const numPhotos = Math.floor(Math.random() * (35 - 20)) + 1;
//         imageUrlArray.push(`https://gpkhomes.s3-us-west-1.amazonaws.com/${key[Math.floor(Math.random() * 400)]}`);
//       }
//       dataGen()
//       // seedListingPhotos();
//       // console.log(imageUrlArray);
//     })
//     .catch((error) => console.log(error));
// };
// getImageUrls();
// seedListingPhotos();
userinfoGen();

