const { Pool, Client } = require('pg');
const faker = require('faker');

const pool = new Pool({
  user: 'gurparkashsingh',
  host: 'localhost',
  database: 'photogallery',
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log("Connection successful");
  // client.query('SELECT * from userinfo', (err, result) => {
  //   release();
  //   if (err) {
  //     return console.error('Error executing query', err.stack);
  //   }
  //   console.log(result.rows);
  //   client.release();
  // });
});

const getUserById = (id, response) => {
  console.log("getUserById called with request id" ,id);
  const idx = parseInt(id)
//SELECT listingphotos.imageurl
// FROM listingphotos
// INNER JOIN listing
// ON listing.id = listingphotos.listing_id
// Where listing.id =1;
  pool.query('SELECT listingphotos.imageurl FROM listingphotos INNER JOIN listing ON listing.id = listingphotos.listing_id WHERE listing.id = $1', [idx], (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results.rows);
    response.status(200).json(results.rows);
  })
};
// CREATE TABLE listingphotos(
//   id INT PRIMARY KEY  NOT NULL, 
//   imageurl TEXT,
//   imagedescription TEXT,
//   views INT,
//   listing_id INTEGER REFERENCES listing(id) 
// );
const createUser = (id, response) => {
  const imageurl = 'https://gpkhomes.s3-us-west-1.amazonaws.com/image-chris_jolly-GqbU78bdJFM.jpg';
  const imagedescription = faker.lorem.word();
  const views = 0;
  const listing_id = Math.floor(Math.random() * 1000000);
  console.log("createUser called with insertion", [imageurl, imagedescription, views, listing_id]);

  pool.query('INSERT INTO listingphotos (imageurl, imagedescription,views,listing_id) VALUES ($1, $2, $3, $4)', [imageurl, imagedescription, views, listing_id], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results);
    response.status(201).send(`Imageurl added to listing with ID: ${id}`);
  })
}
module.exports = {
  getUserById,
  createUser
};
