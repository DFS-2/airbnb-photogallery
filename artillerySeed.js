const faker = require('faker');
// const db = require('./index.js');
const fs = require(`fs`);
const path = require('path');
const { Pool, Client } = require('pg');
const writeUsers = fs.createWriteStream('id.csv');
writeUsers.write('hostid\n', 'utf8');

function writeHosts(writer, encoding, callback) {
  let i = 1000000;
  let hostid = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      hostid += 1;
      const data = `${hostid}\n`;
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