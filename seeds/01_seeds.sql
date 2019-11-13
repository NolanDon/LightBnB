INSERT INTO users (name, email, password) 
VALUES ('nolan','nolan796@live.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('alyshah', 'aly85@telus.net', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('paul', 'paul8@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');


INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES ((SELECT id FROM users WHERE name = 'nolan'),'Speed lamp', 'description', 'https://images.pexels.com/photos/2080018', 'https://images.pexels.com/photos/2080018', 150, 1, 3, 'canada', '16th avenue southwest nw', 'calgary', 'alberta', 't3k046', true),
((SELECT id FROM users WHERE name = 'alyshah'), 'Bear Place', 'description', 'https://images.pexels.com/photos/2080018', 'https://images.pexels.com/photos/2080018', 150, 2, 4, 'canada', '10th avenue, close way sw', 'edmonton', 'alberta', 'p8f2g5', true),
((SELECT id FROM users WHERE name = 'paul'),'Willow grove', 'description', 'https://images.pexels.com/photos/2080018', 'https://images.pexels.com/photos/2080018', 150, 3, 5, 'canada', '167th avenue way close ne', 'montreal', 'quebec', 't8k0p2', true);

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(2, 2, '2019-01-04', '2019-02-01'),
(3, 3, '2021-10-01', '2021-10-14');

INSERT INTO propery_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES ((SELECT id FROM users WHERE name = 'nolan'), (SELECT id FROM users WHERE name = 'nolan'), (SELECT id FROM users WHERE name = 'nolan'), 5, 'was great here would stay again'),
((SELECT id FROM users WHERE name = 'alyshah'), (SELECT id FROM users WHERE name = 'alyshah'), (SELECT id FROM users WHERE name = 'alyshah'), 3, 'place was ok'),
((SELECT id FROM users WHERE name = 'paul'), (SELECT id FROM users WHERE name = 'paul'), (SELECT id FROM users WHERE name = 'paul'), 1, 'this place was not great');

CREATE TABLE guest_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  guest_id REFERENCE users.id NOT NULL,
  owner_id REFERENCE users.id NOT NULL,
  reservation_id REFERENCE users.id NOT NULL,
  rating SMALLINT,
  message TEXT
);

