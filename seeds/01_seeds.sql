INSERT INTO users (name, email, password) 
VALUES ('nolan','nolan796@live.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('alyshah', 'aly85@telus.net', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('paul', 'paul8@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (1,'Speed lamp', 'description', 'https://images.pexels.com/photos/2080018', 'https://images.pexels.com/photos/2080018', 150, 2, 1, 3, 'canada', '16th avenue southwest nw', 'calgary', 'alberta', 't3k046', true),
(2, 'Bear Place', 'description', 'https://images.pexels.com/photos/2080018', 'https://images.pexels.com/photos/2080018', 150, 2, 2, 4, 'canada', '10th avenue, close way sw', 'edmonton', 'alberta', 'p8f2g5', true),
(3,'Willow grove', 'description', 'https://images.pexels.com/photos/2080018', 'https://images.pexels.com/photos/2080018', 150, 2, 3, 5, 'canada', '167th avenue way close ne', 'montreal', 'quebec', 't8k0p2', true);

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
VALUES (1, 1, '2018-09-11', '2018-09-26'),
(1, 1, '2019-01-04', '2019-02-01'),
(1,1, '2021-10-01', '2021-10-14');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (1, 1, 1, 5, 'was great here would stay again'),
(2, 2, 2, 3, 'place was ok'),
(3, 3, 3, 1, 'this place was not great');

INSERT INTO guest_reviews (guest_id, owner_id, reservation_id, rating, message) 
VALUES (1, 1, 1, 3, 'Great pad'),
(2, 2, 2, 5, 'Fantatsic'),
(3, 3, 3, 4, 'Great pad');

INSERT INTO rates (start_date, end_date, cost_per_night, property_id) 
VALUES ('2018-09-11', '2018-09-26',150,1),
('2019-01-04', '2019-02-01',610,2),
('2021-10-01', '2021-10-14',560,3);