import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import Header from "Components/Header";
import Paginate from "Components/OldPagination";
import Table from "Components/Table";
import Footer from "Components/Footer";
import styles from "./style.module.scss";

export default function OneStudent() {
  const [enrollForCourseModal, setEnrollModal] = useState(false);

  const handleCloseEnroll = () => setEnrollModal(false);
  const handleEnrollModal = () => setEnrollModal(true);

  return (
    <>
      <div className={styles.detail}>
        <Header goTo="Students" goToLink="/students" />
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.student}>
              <h1>Enrolled Student</h1>
              <p>enrolledstudent@gmail.com</p>
            </div>
            <div className={styles.info}>
              <p className={styles.numb}>20</p>
              <p className={styles.text}>ENROLLED COURSES</p>
            </div>
          </div>
          <div className={styles.course}>
            <div className={styles.head}>
              <p className={styles.act}>ACTIVE COURSES</p>
              <p className={styles.buton} onClick={handleEnrollModal}>
                Add Course
              </p>
            </div>
            {/* <Table trigger="oneStudent" /> */}
            <Paginate />
          </div>
        </div>
        <Footer />
      </div>

      <Modal
        show={enrollForCourseModal}
        onHide={handleCloseEnroll}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Course For Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form>
              <Form.Group>
                <Form.Control as="select" size="lg" custom>
                  <option>Large select</option>
                  <option>Large select</option>
                  <option>Large select</option>
                  <option>Large select</option>
                  <option>Large select</option>
                  <option>Large select</option>
                  <option>Large select</option>
                  <option>Large select</option>
                  <option>Large select</option>
                  <option>Large select</option>
                  <option>Large select</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="grey" onClick={handleCloseEnroll}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseEnroll}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
