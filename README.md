# airbnb-photogallery
System design for Photo Gallery Requests.

# CRUD API
## Create using POST request:
### Adding an image to a particular listing
'/api/reservations/:listingId'
## Read using GET request: 
### Get all listings associated with a listing
'/api/reservations/:listingId'
## Update using PUT request: 
### Update a listings image 
'/api/reservations/:listingId/:imageId'
## Delete using DELETE request: 
### Delete a particular image by its id
'/api/reservations/:listingId/:imageId'
