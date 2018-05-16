DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INTEGER NOT NULL,
  stock_quantity INTEGER NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flamethrower", "Tools", 1000, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LaserBeams", "Tools", 50000, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tesla", "Vehicles", 100000, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Range Rover", "Vehicles", 150000, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hammer", "Tools", 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook", "Tech", 1000, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Desktop", "Tech", 200, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Artificial Intelligence Robot", "Tech", 20000000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Robot Dog", "Tech", 20000, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Drake", "Rappers", 30000000, 1);
