const faker = require('faker');
const axios = require('axios');
const convert = require('xml-js');
// const db = require('./index.js');
const fs = require(`fs`);
const path = require('path');
const { Pool, Client } = require('pg');
const writeUsers = fs.createWriteStream('cas_listing.csv');
writeUsers.write('id,listingviews,imageurl,imagedescription,imageviews,city,street,postdate,username\n', 'utf8');
imageUrlArray = [];

function randomDate(date1, date2) {
    function randomValueBetween(min, max) {
        return Math.random() * (max - min) + min;
    }
    var date1 = date1 || '01-01-1970'
    var date2 = date2 || new Date().toLocaleDateString()
    date1 = new Date(date1).getTime()
    date2 = new Date(date2).getTime()
    if (date1 > date2) {
        return new Date(randomValueBetween(date2, date1)).toLocaleDateString()
    } else {
        return new Date(randomValueBetween(date1, date2)).toLocaleDateString()

    }
}
function writeListing(writer, encoding, callback) {
    let i = 1000000;
    let count = 0;
    function write() {
        let ok = true;
        do {
            i -= 1;
            count += 1;
            const id = Math.floor(count/10)+2;
            const listingviews = faker.random.number(10);
            const imageurl = imageUrlArray[faker.random.number(400)];
            const imagedescription = faker.lorem.word();
            const imageviews = faker.random.number(10);
            const city = faker.address.city();
            const street = faker.address.streetAddress();
            const postdate = randomDate('10/13/2019', '01/01/2018');
            const username = faker.internet.userName();
            const data = `${id},${listingviews},${imageurl},${imagedescription},${imageviews},${city},${street},${postdate},${username}\n`;
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
            console.log("Got data")
            for (let i = 10; i < 495; i += 1) {
                const numPhotos = Math.floor(Math.random() * (35 - 20)) + 1;
                imageUrlArray.push(`https://gpkhomes.s3-us-west-1.amazonaws.com/${key[Math.floor(Math.random() * 400)]}`);
            }
            writeListing(writeUsers, 'utf-8', () => {
                writeUsers.end();
            });
        })
        .catch((error) => console.log(error));
};
getImageUrls();