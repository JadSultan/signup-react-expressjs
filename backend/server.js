//Email Backend
const express = require("express");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var cors = require('cors');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:3000'
}));

const route = express.Router();

const port = process.env.PORT || 5000;

app.use('/v1', route);

app.listen(port, () => {
    console.log(`Email-Server listening on port ${port}`);
});


const transporter = nodemailer.createTransport({

    service: '',//Hotmail, Outlook365, Gmail
		auth: {
			user: '',//email Address
			pass: ''//Password
		}
});

route.post('/text-mail', (req, res) => {
    const {to, subject, text } = req.body;
	var mailOptions = {
		from: '',//email address
		to: to,
		subject: subject,
		text: text,
	};

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId });
    });
});

////////////////////////////////////////////////////////////////////////////////////////
// DB Backend


const express_db = require('express'),
  app_db = express_db(),
  mysql = require('mysql'), // import mysql module
  cors_db = require('cors'),
  bodyParser_db = require('body-parser');

// setup database
db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',//pass to connection
  database: '' //DB
})


// make server object that contain port property and the value for our server.
var server = {
  port: 8080
};

const usersRouter = require('./users');
// use the modules
app_db.use(cors_db())
app_db.use(bodyParser_db.json());
// use router
app_db.use('/api', usersRouter);

// starting the server
app_db.listen( server.port , () => console.log(`DB-Server started, listening port: ${server.port}`));