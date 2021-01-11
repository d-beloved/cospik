import { Pool } from 'pg';
import { connectionString } from './../db/dbConfig';

const pool = new Pool(connectionString);

class CourseController {

  static createCourse(req, res) {
    const courseName: String = req.body.course_name.trim();
    const courseQuery = `INSERT INTO courses (course_name)
                          VALUES ($1)
                          RETURNING *`;

    pool.connect()
      .then((client) => {
        client.query({
          text: courseQuery,
          values: [courseName]
        })
          .then((newCourse) => {
            client.release();
            res.status(201).send({
              message: 'Course created successfully',
              data: newCourse.rows[0],
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

  static getAllCourses(req, res) {
    const getCoursesQuery = `SELECT * from courses`;
    pool.connect()
      .then((client) => {
        client.query({
          text: getCoursesQuery
        })
        .then((allCourses) => {
          client.release();
          return res.status(200).send({
            message: 'All Courses',
            students: allCourses.row
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

  static updateCourse(req, res) {
    const courseId = req.params.courseId;
    const courseName: String = req.body.course_name.trim();
    const updateCourseQuery = `UPDATE courses
                                  SET course_name = $1
                                  WHERE course_id::text = $2`;

    pool.connect()
      .then((client) => {
        client.query({
          text: updateCourseQuery,
          values: [
            courseName,
            courseId
          ]
        })
          .then((updatedCourse) => {
            client.release();
            return res.status(200).send({
              message: 'Course name updated',
              student: updatedCourse.rows[0],
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

  static deleteCourse(req, res) {
    const deleteCourseQuery = `DELETE FROM courses
                            WHERE course_id = $1`;

    pool.connect()
      .then((client)=> {
        client.query({
          text: deleteCourseQuery,
          values: [req.body.course_id]
        })
          .then((deleted) => {
            client.release();
            return res.status(200).send({
              message: 'Course deleted successfully',
              deleted,
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

export default CourseController;
