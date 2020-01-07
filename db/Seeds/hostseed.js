const faker = require('faker');
// const db = require('./index.js');
const fs = require(`fs`);
const path = require('path');
const { Pool, Client } = require('pg');
const writeUsers = fs.createWriteStream('host.csv');
writeUsers.write('id,hostname,email,phone,userInfo_id\n', 'utf8');

function writeHosts(writer, encoding, callback) {
  let i = 5000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const hostname = faker.internet.userName();
      const email = faker.internet.email();
      const phone = faker.phone.phoneNumber();
      const userInfo_id = id;
      const data = `${id},${hostname},${email},${phone},${userInfo_id}\n`;
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
writeHosts(writeUsers, 'utf-8', () => {
  writeUsers.end();
});

// const pool = new Pool({
//   user: 'gurparkashsingh',
//   host: 'localhost',
//   database: 'photogallery',
//   port: 5432,
// });

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error acquiring client', err.stack);
//   }
//   console.log("Connection successful");
//   client.query('SELECT * from userinfo', (err, result) => {
//     release();
//     if (err) {
//       return console.error('Error executing query', err.stack);
//     }
//     console.log(result.rows);
//   });
// });
// // const seedListingPhotos = () => {
// //   let listingphotos = [];
// //   for (let i = 0; i < 400; i += 1) {
// //     const listingPhoto = {
// //       id: i,
// //       imageurl: imageUrlArray[i],
// //       imagedescription: faker.random.alphaNumeric(20),
// //       views: faker.random.number(20),
// //       listing_id: faker.random.number(400)
// //     };
// //     listingphotos.push(listingPhoto)
// //   }
// //   // console.log(listingphotos);  
// // };
// // let counter = 204599;
// // userinfoGen = () => {
// //   writer.pipe(fs.createWriteStream('host.csv', { flags: 'a' }));
// //   for (var i = 0; i < 35000; i++) {
// //     writer.write({
// //       id: counter + i,
// //       hostname: faker.name.firstName(),
// //       email: faker.internet.email(),
// //       phone: faker.phone.phoneNumberFormat(),
// //       userInfo_id: counter + i
// //     });
// //   }
// //   writer.end();
// //   console.log('done');
// // };

// // userinfoGen();
// const numUsers = 1000000
// //create users table data for csv file
// let createUsers = function () {
//   // let insertQuery = `INSERT INTO users (name) VALUES`
//   let insertQuery = '';
//   for (var i = 0; i < numUsers + 1; i++) {
//     insertQuery += `('${faker.lorem.word()}')`
//     insertQuery += '\n'
//   }
//   return insertQuery.slice(0, -1)
// }
// //create csv file
// const writeCSV = function () {
//   fs.writeFile(path.resolve('test.csv'), createUsers(), () => {
//     console.log("Users table generated")
//     pool.query(`COPY users(name) FROM '${path.resolve('test.csv')}' DELIMITER ',';`)
//       .then(() => {
//         console.log("User table created in postgres")
//       }).catch((err) =>
//         console.log("the err is", err)
//       )
//   })
// }
// writeCSV()