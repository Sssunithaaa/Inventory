CREATE TABLE user (
  id int PRIMARY key AUTO_INCREMENT,
  name varchar(250),
  contactNumber varchar(20),
  email  varchar(50),
  PASSWORD varchar(20),
  role VARCHAR(20),
  UNIQUE(email)
);

insert into user(name,contactNumber,email,password,status,role) values('Admin','9740692830','admin@gmail.com','true','admin');

CREATE TABLE Categories (
  category_id INT PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL
);

CREATE TABLE Suppliers (
  supplier_id INT PRIMARY KEY,
  supplier_name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255)
);

CREATE TABLE Products (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  quantity_on_hand INT NOT NULL,
  category_id INT,
  supplier_id INT,
  FOREIGN KEY (category_id) REFERENCES Categories(category_id),
  FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id)
);

CREATE TABLE Transactions (
  transaction_id INT PRIMARY KEY,
  product_id INT,
  quantity INT NOT NULL,
  transaction_type ENUM('purchase', 'sale') NOT NULL,
  transaction_date DATE NOT NULL,
  FOREIGN KEY (product_id) REFERENCES Products(product_id)
);
