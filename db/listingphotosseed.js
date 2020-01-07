const faker = require('faker');
const axios = require('axios');
const convert = require('xml-js');
// const db = require('./index.js');
const fs = require(`fs`);
const path = require('path');
const { Pool, Client } = require('pg');
const writeUsers = fs.createWriteStream('listingphotos.csv');
writeUsers.write('imageurl,imagedescription,views,listing_id\n', 'utf8');
imageUrlArray = [];

function writePhotos(writer, encoding, callback) {
  let i = 10000000;
  let id = 1;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const imageurl = imageUrlArray[faker.random.number(400)];
      const imagedescription = faker.lorem.word();
      const views = faker.random.number(10);
      const listing_id = Math.floor(id/10)+2;
      const data = `${imageurl},${imagedescription},${views},${listing_id}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
// see if we should continue, or wait
// don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
// had to stop early!
// write some more once it drains
      writer.once('drain', write);
    }
  }
write()
}

const getImageUrls = () => {
  axios.get('https://gpkhomes.s3-us-west-1.amazonaws.com/')
    .then((response) => {

      const options = { ignoreComment: true, alwaysChildren: true };
      const nodes = convert.xml2js(response.data, options).elements[0].elements;
      const key = [];
      for (let i = 6; i < 400; i += 1) {
        key.push(nodes[i].elements[0].elements[0].text);
      }
      return key;
    })
    .then((key) => {
      console.log("Got data");
      for (let i = 10; i < 495; i += 1) {
        const numPhotos = Math.floor(Math.random() * (35 - 20)) + 1;
        imageUrlArray.push(`https://gpkhomes.s3-us-west-1.amazonaws.com/${key[Math.floor(Math.random() * 400)]}`);
      }
      writePhotos(writeUsers, 'utf-8', () => {
        writeUsers.end();
      });
    })
    .catch((error) => console.log(error));
};
getImageUrls();