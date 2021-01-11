import { Pool } from 'pg';
import { connectionString } from './../db/dbConfig';

const pool = new Pool(connectionString);

class StudentController {

  static createStudent(req, res) {
    const firstname: String = req.body.firstname.trim();
    const lastname: String = req.body.lastname.trim();
    const email: String = req.body.email.trim().toLowerCase();
    const studentQuery = `INSERT INTO students (firstname, lastname, email)
                          VALUES ($1, $2, $3)
                          RETURNING *`;

    pool.connect()
      .then((client) => {
        client.query({
          text: studentQuery,
          values: [
            firstname,
            lastname,
            email
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
            students: allStudents.rows
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
            return res.status(200).send({
              message: 'Student returned',
              student: student.rows[0],
            });
          })
          .catch((err) => {
            client.release();
            if (err) {
              res.status(500).send({
                message: 'Something went wrong',
                err
              });
            }
          });
      });
  }

  static updateStudent(req, res) {
    const studentId = req.params.studentId;
    const firstname: String = req.body.firstname.trim();
    const lastname: String = req.body.lastname.trim();
    const updateStudentQuery = `UPDATE students
                                  SET firstname = $1, lastname = $2
                                  WHERE student_id::text = $3`;

    pool.connect()
      .then((client) => {
        client.query({
          text: updateStudentQuery,
          values: [
            firstname,
            lastname,
            studentId
          ]
        })
          .then((updatedStudent) => {
            client.release();
            return res.status(200).send({
              message: 'Student name updated',
              student: updatedStudent.rows[0],
            });
          })
          .catch((err) => {
            client.release();
            if (err) {
              res.status(500).send({
                message: 'Something went wrong',
                err
              });
            }
          });
      });
  }

  static enrollStudentForCourse(req, res) {
    // query to check if the student is enrolled for the course already
    const checkStudentCourse = `SELECT * FROM student_courses
                                  WHERE student_id = $1 AND course_id = $2`;

    const enrollQuery = `INSERT INTO student_courses (student_id, course_id)
                            VALUES ($1, $2)`;

    pool.connect()
      .then((client) => {
        client.query({
          text: checkStudentCourse,
          values: [req.body.student_id, req.body.course_id]
        })
          .then((studentCourse) => {
            client.release();
            if(!studentCourse.rows[0]) {
              pool.connect()
                .then((client)=> {
                  client.query({
                    text: enrollQuery,
                    values: [req.body.student_id, req.body.course_id]
                  })
                    .then((enrolled) => {
                      client.release();
                      return res.status(200).send({
                        message: 'Student enrolled for course successfully',
                        enrolled: enrolled.rows[0],
                      });
                    })
                    .catch((err) => {
                      client.release();
                      if (err) {
                        res.status(500).send({
                          message: 'Something went wrong',
                          err
                        });
                      }
                    });
                });
            } else {
                return res.status(200).send({
                  message: 'Student is already enrolled for course'
                });
            }
          })
      })
  }

  static removeCourseForStudent(req, res) {
    const unenrollQuery = `DELETE FROM student_courses
                            WHERE student_id = $1 AND course_id = $2`;

    pool.connect()
      .then((client)=> {
        client.query({
          text: unenrollQuery,
          values: [req.body.student_id, req.body.course_id]
        })
          .then((unenrolled) => {
            client.release();
            return res.status(200).send({
              message: 'Student unenrolled for course successfully',
              unenrolled,
            });
          })
          .catch((err) => {
            client.release();
            if (err) {
              res.status(500).send({
                message: 'Something went wrong',
                err
              });
            }
          });
      });
  }
}

export default StudentController;
