
const db = require("../db/database");
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const SECRET_KEY = 'some key'; // process.env.SECRET_KEY


function validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

module.exports.signup = function (req, res) {
    try {
        const {
            password,
            username,
            email
        } = req.body;
        if(!validateEmail(email)){
            res.status(200).json({
                success: false,
                message: `Error was found email input not correct`
            });
        }
        bcrypt.hash(password, 10, function (err, hash) { // hash the password
            if (err) {
                res.status(200).json({
                    success: false,
                    message: `Error was found input not correct`
                });
            }
            // insert into table user with password hashed
            db.run( 
                `INSERT INTO user (username, email, password)
                VALUES (?, ?, ?)`, [username, email, hash],  
                (error, rows) => { 
                    if (error) {
                        res.status(200).json({
                            success: false,
                            message: `Error was found input not correct or user already exist`
                        });
                    } else {
                        const token = jwt.sign({ email }, SECRET_KEY ); // generate token from jwt
                        res.status(200).json({
                            success: true,
                            token
                        });
                    }
                });
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            message: `Error was found input not correct`
        });
    }
};






module.exports.signin = function (req, res) {
    try {
        
        const {
            password,
            email
        } = req.body;

        if(!validateEmail(email)){
            res.status(200).json({
                success: false,
                message: `Error was found email input not correct`
            });
        }

        db.get(`SELECT * FROM user WHERE email  = ?`, [email], (err, row) => {  // verify if user exist
            if (err) {
                res.status(200).json({
                    success: false,
                    message: `Error was found`
                });
            } else if (row) {
                bcrypt.compare(password, row.password, function (err, result) {  // compare hashed password from db with the password
                    if (result) {
                        // Passwords match
                        const token = jwt.sign({ email }, SECRET_KEY ); // generate token from jwt
                        res.status(200).json({
                            success: true,
                            token
                        });
                    } else {
                        // Passwords don't match
                        res.status(200).json({
                            success: false,
                            message: `Error password incorrect`
                        });
                    }
                });
            } else {
                res.status(200).json({
                    success: false,
                    message: `Error user not found`
                });
            }
        });


    } catch (error) {
        res.status(200).json({
            success: false,
            message: `Error was found`
        });
    }
};


