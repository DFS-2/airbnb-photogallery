DROP KEYSPACE IF EXISTS photos;

CREATE KEYSPACE photos WITH replication = {'class' : 'SimpleStrategy', 'replication_factor': '2'};
/*Query: Get all photos associated with a listing*/
CREATE TABLE photos.listing (
    id bigint, /*Not uniquely identifiable, multple listing id's for each photo*/
    listingviews bigint,
    imageurl text,
    imagedescription text,
    imageviews int,
    city text,
    street text,
    postdate text,
    username text, /*Host username*/
    PRIMARY KEY (id, imageurl)
);
/*Query:Get hosts contact information*/
Create table photos.hostInfo(
    hostid uuid,
    username text, /*This will be used to check user info*/
    hostemail text,
    hostphone text,
    hostname text,
    PRIMARY Key((hostid)) 
);
/*Verify the hosts information*/
CREATE TABLE photos.userInfo(
    id uuid,
    username TEXT, 
    pass TEXT,
    birhday date,
    PRIMARY Key((id))
);



