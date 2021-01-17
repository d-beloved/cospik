import React, { useState } from "react";
import { Link } from "react-router-dom";
import Paginate from "react-js-pagination";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import styles from "./style.module.scss";

interface Props {
  trigger: string;
  header?: Array<string>;
  tableData: Object[];
}

interface tableState {
  activePage: number;
  itemsPerPage: number;
}

export default function InfoTable({ trigger, header, tableData }: Props) {
  const [state, setState] = useState<tableState>({
    activePage: 1,
    itemsPerPage: 1,
  });

  const [editStudentModal, setStudentModal] = useState(false);
  const [editCourseModal, setCourseModal] = useState(false);

  const handleCloseStudent = () => setStudentModal(false);
  const handleStudentModal = () => setStudentModal(true);

  const handleCloseCourse = () => setCourseModal(false);
  const handleCourseModal = () => setCourseModal(true);

  const handlePageChange = (pageNumber: number) => {
    setState({ ...state, activePage: pageNumber });
  };

  // for the pagination data
  const idxOfLastEntry = state.activePage * state.itemsPerPage;
  const idxOfFirstEntry = idxOfLastEntry - state.itemsPerPage;
  const pagedTableData = tableData.slice(idxOfFirstEntry, idxOfLastEntry);

  return (
    <>
      <div className={styles.info}>
        <Table striped hover responsive="lg" borderless>
          <thead>
            <tr>
              {header?.map((title, i) => (
                <th key={i}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedTableData &&
              pagedTableData.map((entry: any, i) => (
                <tr>
                  <Link to={`/student/${entry.student_id}`}>
                    <td>{entry.firstname}</td>
                  </Link>
                  <td>{entry.lastname}</td>
                  <td>{entry.email}</td>
                  <td>{entry.status}</td>
                  <td>
                    <span onClick={handleStudentModal}>Edit</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {tableData && (
          <Paginate
            activePage={state.activePage}
            itemsCountPerPage={state.itemsPerPage}
            totalItemsCount={tableData.length}
            pageRangeDisplayed={3}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        )}
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
