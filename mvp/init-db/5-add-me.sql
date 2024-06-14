
INSERT INTO users (email, password, name) VALUES ('ferencbesenyei@example.com', '$2b$12$00DlYhH2Chf7OMVLpQGZE.kjwLHiwGCKCJ9WpwVoTxCe4CGjSERhq', 'Ferenc Besenyei');

-- PW = ferencbesenyei

INSERT INTO ratings (user_id, movie_id, rating)
VALUES 
    (611, 296, 5),  -- pulp fiction
    (611, 2571, 5), -- matrix
    (611, 6365, 5), -- matrix reloaded
    (611, 6934, 5), -- matrix revolutions
    (611, 76093, 5), -- how to train your dragon
    (611, 112175, 5), -- how to train your dragon2
    (611, 2959, 5), -- fight club
    (611, 3702, 1), -- mad max
    (611, 109487, 5), --interstellar
    (611, 79132, 5), --inception
    (611, 2116, 3); -- lotr


INSERT INTO ratings (user_id, movie_id, rating)
VALUES
    (611, 750, 1), -- Dr Strangelove..
    (611, 1197, 1), -- The Princess Bride
    (611, 1223, 1), -- Grand Day Out with Wallace and Gromit 
    (611, 2202, 1), -- Lifeboat 
    (611, 3468, 1); -- The Hustler 