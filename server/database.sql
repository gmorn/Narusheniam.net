CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  FIO VARCHAR(255),
  number VARCHAR(255),
  login VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  role_id INT DEFAULT 1
);


CREATE TABLE statement (
  id SERIAL PRIMARY KEY,
  car_number VARCHAR(255),
  descriotion TEXT,
  status INT DEFAULT 1,
  user_id INT,

  FOREIGN KEY (user_id) REFERENCES users (id)
)
