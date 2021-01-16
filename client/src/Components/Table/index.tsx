import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import styles from "./style.module.scss";

interface Props {
  trigger: string;
  header?: Array<string>;
  redirectTo?: boolean;
  tableData?: Object;
}

export default function InfoTable({
  trigger,
  header,
  redirectTo,
  tableData,
}: Props) {
  const [editStudentModal, setStudentModal] = useState(false);
  const [editCourseModal, setCourseModal] = useState(false);

  const handleCloseStudent = () => setStudentModal(false);
  const handleStudentModal = () => setStudentModal(true);

  const handleCloseCourse = () => setCourseModal(false);
  const handleCourseModal = () => setCourseModal(true);

  return (
    <>
      <div className={styles.info}>
        <Table striped hover responsive="lg" borderless>
          <thead>
            <tr>
              {header?.map((title, i) => (
                <th>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {tableData?}
              <Link to="/student/1">
                <td>Mark</td>
              </Link>
              <td>Otto</td>
              <td>mark.otto@gmail.com</td>
              <td>Not Enrolled</td>
              <td>
                {trigger !== "oneStudent" ? (
                  <span
                    onClick={
                      trigger === "student"
                        ? handleStudentModal
                        : handleCourseModal
                    }
                  >
                    Edit
                  </span>
                ) : null}{" "}
                {trigger !== "student" ? (
                  <span>
                    {trigger === "oneStudent" ? "Remove Course" : "Delete"}
                  </span>
                ) : null}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* modals to be shown on the page */}
      <Modal
        show={editStudentModal}
        onHide={handleCloseStudent}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Student Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form className={styles.form}>
              <Form.Group controlId="fname">
                <Form.Label>Firstname</Form.Label>
                <Form.Control type="text" defaultValue="current name" />
              </Form.Group>

              <Form.Group controlId="lname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control type="text" defaultValue=" current name" />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue="emailofuser@@gmail.com"
                  disabled
                />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="gray" onClick={handleCloseStudent}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseStudent}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={editCourseModal}
        onHide={handleCloseCourse}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Course Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form className={styles.form}>
              <Form.Group controlId="courseName">
                <Form.Label>Course Name</Form.Label>
                <Form.Control type="text" defaultValue="current name" />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="gray" onClick={handleCloseCourse}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseCourse}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
