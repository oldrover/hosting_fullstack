CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    image VARCHAR(100) NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description VARCHAR NOT NULL
);