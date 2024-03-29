CREATE TABLE users
(
    id INT UNSIGNED AUTO_INCREMENT NOT NULL,
    username VARCHAR(64) NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    authorized BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
    CONSTRAINT users_pk PRIMARY KEY (id)
);