DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    day      VARCHAR(255) NOT NULL,
    starttime TIME DEFAULT now(),
    endtime TIME DEFAULT now()
);

DROP TABLE IF EXISTS schedules;

CREATE TABLE IF NOT EXISTS schedules (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    day VARCHAR(60) NOT NULL,
    starttime TIMESTAMPTZ NOT NULL,
    endtime TIMESTAMPTZ NOT NULL
);