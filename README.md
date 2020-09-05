# signup-react-expressjs

### `npm install`

in backend and frontend to install the required modules

### `CREATE TABLE IN DB`

CREATE TABLE users (
  `ID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `email` (`email`)
  );
