import { Pool } from 'pg';
import { connectionString } from './../db/dbConfig';

const pool = new Pool(connectionString);

class StudentController {

  static createStudent(req, res) {
    const studentQuery = `INSERT INTO students (firstname, lastname, email)
                          VALUES ($1, $2)
                          RETURNING *`;

    pool.connect()
      .then((client) => {
        client.query({
          text: studentQuery,
          values: [
            req.userData,
            req.body.firstname,
            req.body.lastname,
            req.body.email
          ]
        })
          .then((newStudent) => {
            client.release();
            res.status(201).send({
              message: 'Student created successfully',
              data: newStudent.rows[0],
              success: true
            });
          })
          .catch((err) => {
            client.release();
            if(err) {
              res.status(400).send({
                message: 'Please try again',
                err,
                success: false
              });
            }
          });
      });
  }

  static getAllStudents(req, res) {
    const getStudentsQuery = `SELECT * from students`;
    pool.connect()
      .then((client) => {
        client.query({
          text: getStudentsQuery
        })
        .then((allStudents) => {
          client.release();
          return res.status(200).send({
            message: 'All students',
            students: allStudents.row
          });
        })
        .catch((err) => {
          client.release();
          if(err) {
            res.status(400).send({
              message: 'Something went wrong',
              err,
              success: false
            });
          }
        });
      });
  }

  static getStudent(req, res) {

  }
}