import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useMappedState } from "redux-react-hook";
import { updateStudent, getStudents } from "Store/actions/student.action";
import { deleteCourse, getCourses } from "Store/actions/course.action";
import Paginate from "react-js-pagination";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import styles from "./style.module.scss";

interface Props {
  trigger: string;
  header?: Array<string>;
  tableData: any[];
}

interface tableState {
  activePage: number;
  itemsPerPage: number;
}

interface studentState {
  firstname: string;
  lastname: string;
  id: string;
}

export default function InfoTable({ trigger, header, tableData }: Props) {
  const dispatch = useDispatch();
  const [editStudentModal, setStudentModal] = useState(false);
  // const [editCourseModal, setCourseModal] = useState(false);
  const [state, setState] = useState<tableState>({
    activePage: 1,
    itemsPerPage: 6,
  });
  const [student, setStudent] = useState<studentState>({
    firstname: "",
    lastname: "",
    id: "",
  });

  const loading = useMappedState(
    ({ studentReducer }: any) => studentReducer
  );

  const courseLoading = useMappedState(
    ({ courseReducer }: any) => courseReducer
  );

  const updateStudentAction = (e: any) => {
    e && e.preventDefault();
    dispatch(
      updateStudent({ ...student }, () => {
        dispatch(getStudents());
        handleCloseStudent();
      })
    );
  };

  const deleteCourseAction = (passedId: string) => {
    dispatch(
      deleteCourse({ id: passedId }, () => {
        dispatch(getCourses());
      })
    );
  };

  const setValue = (e: any) =>
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });

  const handleStudentModal = (passedId: string) => {
    setStudent({
      ...student,
      id: passedId,
    });
    setStudentModal(true);
  };
  const handleCloseStudent = () => {
    setStudent({
      ...student,
      firstname: "",
      lastname: "",
      id: "",
    });
    setStudentModal(false);
  };

  // const handleDeleteCourse = () => setCourseModal(true);

  // const handleCloseCourse = () => setCourseModal(false);

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
        {tableData && tableData.length === 0 ? (
          <div className={styles.nodata}>
            <h3>No Data to Show</h3>
          </div>
        ) : (
          <>
            <Table striped hover responsive="lg" borderless>
              <thead>
                <tr>
                  {header?.map((title, i) => (
                    <th key={i}>{title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trigger === "student" &&
                  pagedTableData &&
                  pagedTableData.map((entry: any, i) => (
                    <tr key={i}>
                      <Link to={`/student/${entry.student_id}`}>
                        <td>{entry.firstname}</td>
                      </Link>
                      <td>{entry.lastname}</td>
                      <td>{entry.email}</td>
                      <td>{entry.status}</td>
                      <td>
                        <span
                          onClick={() => handleStudentModal(entry.student_id)}
                        >
                          Edit
                        </span>
                      </td>
                    </tr>
                  ))}
                {trigger === "course" &&
                  pagedTableData &&
                  pagedTableData.map((entry: any, i) => (
                    <tr key={i}>
                      <td>{entry.course_name}</td>
                      <td>
                        <span
                          id={courseLoading.loading && styles.dont}
                          onClick={() => deleteCourseAction(entry.course_id)}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                {trigger === "oneStudent" &&
                  pagedTableData &&
                  pagedTableData.map((entry: any, i) => (
                    <tr key={i}>
                      <td>{entry.cos_name}</td>
                      <td>
                        <span
                          id={courseLoading.loading && styles.dont}
                          onClick={() => deleteCourseAction(entry.course_id)}
                        >
                          unenroll
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <div className={styles.paginate}>
              <Paginate
                activePage={state.activePage}
                itemsCountPerPage={state.itemsPerPage}
                totalItemsCount={tableData.length}
                pageRangeDisplayed={3}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </>
        )}
      </div>

      {/* Update student modal */}
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
              {pagedTableData &&
                pagedTableData
                  .filter((one) => one.student_id === student.id)
                  .map((entry: any, i) => (
                    <>
                      <Form.Group controlId="fname">
                        <Form.Label>Firstname</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstname"
                          value={student.firstname}
                          placeholder={entry.firstname}
                          onChange={setValue}
                        />
                      </Form.Group>

                      <Form.Group controlId="lname">
                        <Form.Label>Lastname</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastname"
                          value={student.lastname}
                          placeholder={entry.lastname}
                          onChange={setValue}
                        />
                      </Form.Group>

                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          defaultValue={entry.email}
                          disabled
                        />
                      </Form.Group>
                    </>
                  ))}
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="gray" onClick={handleCloseStudent}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={updateStudentAction}
            disabled={(student.firstname === "" || loading.loading) && true}
          >
            {loading.loading ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Update course modal */}
      {/* <Modal
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
      </Modal> */}
    </>
  );
}
