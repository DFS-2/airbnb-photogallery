/*There file is being loaded into a database called 'Photos'*/
DROP DATABASE IF EXISTS photogallery;
CREATE DATABASE photogallery;

\c photogallery


CREATE TABLE userInfo(
    id INT PRIMARY KEY  NOT NULL,
    username TEXT, 
    pass TEXT
);
CREATE TABLE host(
    id INT PRIMARY KEY  NOT NULL, 
    hostname TEXT,
    email TEXT,
    phone TEXT,
    userInfo_id INTEGER REFERENCES userinfo(id)

);
CREATE TABLE listing(
    id INT PRIMARY KEY,
    city    TEXT NOT NULL,
    street TEXT NOT NULL,
    postdate date,
    listingviews INT,
    host_id INTEGER REFERENCES host(id)

);
CREATE TABLE listingphotos(
    id SERIAL PRIMARY KEY, 
    imageurl TEXT,
    imagedescription TEXT,
    views INT,
    listing_id INTEGER REFERENCES listing(id) 
);

CREATE INDEX listing_idx ON listing(id);
CREATE INDEX photo_idx on listingphotos(listing_id);