const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


// const properties = require('./json/properties.json');
// const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  // let user;
  // for (const userId in users) {
    // user = users[userId];
    // if (user.email.toLowerCase() === email.toLowerCase()) {
      // break;
    // } else {
      // user = null;
    // }
  // }
  return pool.query(`
  SELECT users.* FROM users
  WHERE users.email = $1
  `, [email])
   .then(res => (res.rows[0]))
};
  
  /*let user;
  for (const userId in users) {
    user = users[userId];
    if (user.email.toLowerCase() === email.toLowerCase()) {
      break;
    } else {
      user = null;
    }
  }
  return Promise.resolve(user);
} */
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

 const getUserWithId = function(id) {
 return pool.query(`
SELECT users.* FROM users
WHERE users.id = $1
`, [id])
.then(res => (res.rows[0]));
}
 

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
  return pool.query(`
  INSERT INTO users (
    name, email, password
  )
  VALUES ($1, $2, $3)
  RETURNING users.id;`, [user.name, user.email, user.password]
)
.then(res => (res.rows[0]))
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  return pool.query(`
  SELECT * FROM properties
  LIMIT $1
  `, [limit])
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;

/** 
 * const getAllProperties = function(options, limit = 10) {
  pool.query(`
  SELECT * FROM properties
  LIMIT $1
  `, [limit])
  .then(res => {
    console.log(res.rows)
  });
} */


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
//   pool.query(`INSERT INTO properties (owner_id, title, description, thumbnail_photo_url,
//     cover_photo_url, cost_per_night, parking_spaces,
//     number_of_bathrooms, number_of_bedrooms, country, street, 
//     city, province, post_code, active)
//     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
//     `, [user.id, user.title, user.description, user.thumbnail_photo_url, user.cover_photo_url, user.cost_per_night, user.parking_spaces, user.number_of_bathrooms, user.number_of_bedrooms, user.country, user.street, user.city, user.province, user.post_code, true ])
// }.then(res => (res.rows[0]))
};
exports.addProperty = addProperty;