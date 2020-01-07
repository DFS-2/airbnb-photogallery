const faker = require('faker');
// const db = require('./index.js');
const fs = require(`fs`);
const path = require('path');
const { Pool, Client } = require('pg');
const writeUsers = fs.createWriteStream('listing.csv');
writeUsers.write('id,city,street,postdate,listingviews,host_id\n', 'utf8');

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
function writeListings(writer, encoding, callback) {
  let i = 10000000;
  let id = 1;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      const city = faker.address.city();
      const street = faker.address.streetAddress();
      const postdate = randomDate('10/13/2019', '01/01/2018');
      const listingviews = faker.random.number({min:1, max:5000000});
      const host_id = faker.random.number(5000000);
      const data = `${id},${city},${street},${postdate},${listingviews},${host_id}\n`;
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
writeListings(writeUsers, 'utf-8', () => {
  writeUsers.end();
});
