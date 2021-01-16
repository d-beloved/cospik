import React, { useState } from "react";
import { useDispatch, useMappedState } from 'redux-react-hook';
import { logoutAdmin } from "Store/actions/auth.action";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import styles from "./style.module.scss";
import logo from "Assets/images/COSPIK.png";

interface Props {
  action?: string;
  goTo: string;
  goToLink: string;
  trigger?: string;
}

export default function Header({ action, goTo, goToLink, trigger }: Props) {
  const [studentModal, setStudentModal] = useState(false);
  const [courseModal, setCourseModal] = useState(false);
  const dispatch = useDispatch();

  const user = useMappedState(({ adminReducer }: any) => adminReducer);
  console.log('I dey', user);
  const handleCloseStudent = () => setStudentModal(false);
  const handleStudentModal = () => setStudentModal(true);

  const handleCloseCourse = () => setCourseModal(false);
  const handleCourseModal = () => setCourseModal(true);

  const logout = () => {
    dispatch(logoutAdmin());
  };

  return (
    <>
      <Navbar expand="lg" className={styles.head} collapseOnSelect>
        <Navbar.Brand href="/students" className={styles.logo}>
          <img src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={styles.burger}
        />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {action ? (
              <Nav.Link
                href="#"
                id={styles.action}
                onClick={
                  trigger === "student" ? handleStudentModal : handleCourseModal
                }
              >
                {action}
              </Nav.Link>
            ) : null}
            <Nav.Link href={goToLink} id={styles.action}>
              {goTo}
            </Nav.Link>
            <Navbar.Text id={styles.user}>{user.user.username}</Navbar.Text>
            {user.isAuthenticated && (
              <Navbar.Text onClick={logout} id={styles.logout}>logout</Navbar.Text>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* modals to be shown on the page */}
      <Modal
        show={studentModal}
        onHide={handleCloseStudent}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form className={styles.form}>
              <Form.Group controlId="fname">
                <Form.Label>Firstname</Form.Label>
                <Form.Control type="text" placeholder="" />
              </Form.Group>

              <Form.Group controlId="lname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control type="text" placeholder="" />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="" />
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
        show={courseModal}
        onHide={handleCloseCourse}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form className={styles.form}>
              <Form.Group controlId="courseName">
                <Form.Label>Course Name</Form.Label>
                <Form.Control type="text" placeholder="enter the course name" />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="grey" onClick={handleCloseCourse}>
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
