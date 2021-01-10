import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import createToken from '../utils/tokenize';
import validateToken from '../utils/loginUtil';
import { connectionString } from './../db/dbConfig';

const pool = new Pool(connectionString);

const secretKey = process.env.JWT_SECRET;

class adminController {

  static createAdmin(req, res) {
    // checks the length of the password and its validity
    const pswd: String = req.body.password;
    if (pswd.length < 6) {
      return res.status(406).send({
        message: 'passwords cannot be less than 6 characters',
        success: false
      });
    };

    // Hash the password before saving it in the db
    const hashedPassword: String = bcrypt.hashSync(pswd, 10);
    const username: String = req.body.username.trim().toLowerCase();
    const adminQuery = `INSERT INTO admin (username, password)
                          VALUES ($1, $2)
                          RETURNING *`;

    pool.connect()
      .then((client) => {
        client.query({
          text: adminQuery,
          values: [username, hashedPassword]
        })
          .then((createdAdmin) => {
            const newAdmin = createdAdmin.rows[0];
            const { username } = newAdmin;
            // create the token after all the inputs are certified ok
            const authToken = createToken(username, secretKey);
            client.release();
            res.status(201).json({
              message: 'Admin created successfully',
              user: newAdmin,
              token: authToken,
              success: true
            });
          })
          .catch((err) => {
            if (err) {
              res.status(400).send({
                message: 'Sorry, please try again',
                success: false
              });
            }
          });
      })
      .catch((err) => {
        if (err) {
          res.status(400).send({
            message: 'It\'s not you, its us, we\'re sorry',
            success: false
          });
        }
      });
  }

  static adminLogin(req, res) {
    const username = req.body.username.trim().toLowerCase();
    const findAnAdmin = `SELECT * FROM admin
                          WHERE username = $1`;

    validateToken(req, res);

    pool.connect()
      .then((client) => {
        client.query({
          text: findAnAdmin,
          values: [username]
        })
          .then((admin) => {
            client.release();
            if (admin.rows[0]) {
              // check if the password is correct
              const authAdmin = admin.rows[0];
              bcrypt.compare(req.body.password, authAdmin.password).then((check) => {
                if (!check) { // If the password does not match
                  res.status(401).send({ message: 'wrong password!', success: false });
                } else {
                  // creates a token
                  const authToken = createToken(username, secretKey);
                  res.status(200).send({
                    message: 'You are logged in!',
                    authToken,
                    authAdmin,
                    success: true
                  });
                }
              })
                .catch((err) => {
                  if (err) {
                    res.status(400).send({ message: 'An error occured', success: false });
                  }
                });
            } else {
              res.status(404).json({
                message: 'User not registered or wrong email',
                success: false,
              });
            }
          })
          .catch((err) => {
            if (err) {
              res.status(400).send({ message: 'An error occured', success: false });
            }
          });
      });
  }
}

export default adminController;
