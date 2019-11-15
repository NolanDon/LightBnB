
const { Pool } = require('pg')

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

const queryStar = (sqlText, values) => {
  const start = Date.now()
  return pool.query(sqlText, values)
    .then((res) => {
    const duration = Date.now() - start;
    console.log(
      'executed query',
      { sqlText, duration, rows: res.rowCount }
    );
    return res;
  })
};

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
 
  return queryStar(`
    SELECT users.* FROM users
    WHERE users.email = $1
`, [email])
  .then(res => (res.rows[0]))
};
  
exports.getUserWithEmail = getUserWithEmail;


/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = function(id) {
  return queryStar(`
    SELECT users.* FROM users
    WHERE users.id = $1
`,[id])
.then(res => (res.rows[0]));
};
 
exports.getUserWithId = getUserWithId;


 /**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return queryStar(`
    INSERT INTO users (
      name, email, password
    )
    VALUES ($1, $2, $3)
    RETURNING users.id;
  `, [user.name, user.email, user.password])
  .then(res => (res.rows[0]))
};

exports.addUser = addUser;


/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 15) {
  
  return queryStar(`SELECT properties.*, reservations.*, avg(rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id 
    WHERE reservations.guest_id = $1
    AND reservations.end_date < now()::date
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT $2;
  `, [guest_id, limit])
  .then(res => res.rows);
};

exports.getAllReservations = getAllReservations;


/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    LEFT OUTER JOIN property_reviews ON properties.id = property_id
    `;
  let whereStr = '';
  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    whereStr += `WHERE city LIKE $${queryParams.length} `;
  }
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    whereStr += `AND owner_id = $${queryParams.length} `;
  }
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    whereStr += `AND cost_per_night >= $${queryParams.length} `;
    queryParams.push(`${options.maximum_price_per_night}`);
    whereStr += `AND cost_per_night <= $${queryParams.length} `;
  }
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    whereStr += `AND rating >= $${queryParams.length} `;
  }

  queryString += whereStr.replace(/^(AND)/, 'WHERE');

  // 4
  queryParams.push(limit);
  queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
  `;

  // 6
  return queryStar(queryString, queryParams)
  .then(res => res.rows);
};
  
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return queryStar(`
    INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `, [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms])
  .then(res => {
    return res.rows;
  })
};

exports.addProperty = addProperty;