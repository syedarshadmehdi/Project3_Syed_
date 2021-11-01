DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    day      VARCHAR(255) NOT NULL,
    starttime TIME DEFAULT now(),
    endtime TIME DEFAULT now()
);
