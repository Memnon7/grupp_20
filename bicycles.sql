DROP TABLE IF EXISTS bicycles;

CREATE TABLE IF NOT EXISTS bicycles(
   id            INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
   model         VARCHAR(50) NOT NULL,  
   manufacturer  VARCHAR(50) NOT NULL,  
   year          INTEGER NOT NULL,      
   color         VARCHAR(15) NOT NULL   
);

INSERT INTO bicycles(id, model, manufacturer, year, color) VALUES (1, 'Mountain Bike', 'Giant', 2019, 'gray');
INSERT INTO bicycles(id, model, manufacturer, year, color) VALUES (2, 'Road Bike', 'Trek', 2020, 'purple');
INSERT INTO bicycles(id, model, manufacturer, year, color) VALUES (3, 'Hybrid Bike', 'Cannondale', 2022, 'green');
INSERT INTO bicycles(id, model, manufacturer, year, color) VALUES (4, 'BMX Bike', 'Mongoose', 1994, 'green');
INSERT INTO bicycles(id, model, manufacturer, year, color) VALUES (5, 'Folding Bike', 'Brompton', 2003, 'purple');
INSERT INTO bicycles(id, model, manufacturer, year, color) VALUES (6, 'Electric Bike', 'Specialized', 2015, 'green');

SELECT * FROM bicycles;
