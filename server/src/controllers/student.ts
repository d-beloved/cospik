import { Pool } from 'pg';
import { connectionString } from './../db/dbConfig';

const pool = new Pool(connectionString);

class StudentController {

  static createStudent(req, res) {
    const studentQuery = `INSERT INTO students (firstname, lastname, email)
                          VALUES ($1, $2, $3)
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
    const studentId = req.params.studentId;
    const getStudentQuery = `SELECT * from students
                              WHERE student_id::text = $1`;

    pool.connect()
      .then((client) => {
        client.query({
          text: getStudentQuery,
          values: [studentId]
        })
          .then((student) => {
            client.release();
            if (!student.rows[0]) {
              return res.status(404).send({
                message: 'Student not found!',
              });
            }
            return res.status(200).json({
              message: 'Student returned',
              ride: student.rows[0],
            });
          })
          .catch((err) => {
            client.release();
            if (err) {
              res.status(500).json({
                message: 'Something went wrong',
                err
              });
            }
          });
      });
  }

  static updateStudent(req, res) {
    const studentId = req.params.studentId;
    const updateStudentQuery = `UPDATE students
                                  SET firstname = $1, lastname = $2
                                  WHERE student_id::text = $3`;

    pool.connect()
      .then((client) => {
        client.query({
          text: updateStudentQuery,
          values: [
            req.body.firstname,
            req.body.lastname,
            studentId
          ]
        })
          .then((updatedStudent) => {
            client.release();
            return res.status(200).json({
              message: 'Student name updated',
              ride: updatedStudent.rows[0],
            });
          })
          .catch((err) => {
            client.release();
            if (err) {
              res.status(500).json({
                message: 'Something went wrong',
                err
              });
            }
          });
      });
  }

  
}