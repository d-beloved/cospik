import React, { useState, useEffect } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import { getOneStudent } from "Store/actions/student.action";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "Components/Header";
import Table from "Components/Table";
import Footer from "Components/Footer";
import styles from "./style.module.scss";

const tableHeader: Array<string> = ["Course Name", ""];

interface getOneState {
  passedId: string;
}

interface Props {
  match: any;
}

export default function OneStudent({ match }: Props) {
  const dispatch = useDispatch();
  const student = useMappedState(
    ({ oneStudentReducer }: any) => oneStudentReducer
  );
  const loading = student.loading;
  const [state, setState] = useState<getOneState>({
    passedId: "",
  });
  const [enrollForCourseModal, setEnrollModal] = useState(false);

  const handleCloseEnroll = () => setEnrollModal(false);
  const handleEnrollModal = () => setEnrollModal(true);

  useEffect(() => {
    const id = match.params.id;
    setState({
      ...state,
      passedId: id,
    });
    // console.log("I got here", id, state)
    dispatch(getOneStudent({ id }));
  }, [dispatch]);

  return (
    <>
      <div className={styles.detail}>
        <Header goTo="Students" goToLink="/students" />
        <div className={styles.content}>
          {loading ? (
            <Spinner className={styles.loader} animation="grow" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            <>
              {student && student.student && (
                <div className={styles.top}>
                  <div className={styles.student}>
                    <h1>{`${student.student.student.firstname} ${student.student.student.lastname}`}</h1>
                    <p>{student.student.student.email}</p>
                  </div>
                  <div className={styles.info}>
                    <p className={styles.numb}>
                      {student.student.enrolled_courses.length}
                    </p>
                    <p className={styles.text}>
                      {student.student.enrolled_courses.length > 1
                        ? "ENROLLED COURSES"
                        : "ENROLLED COURSE"}
                    </p>
                  </div>
                </div>
              )}
              <div className={styles.course}>
                <div className={styles.head}>
                  <p className={styles.act}>ACTIVE COURSES</p>
                  <p className={styles.buton} onClick={handleEnrollModal}>
                    Enroll Course
                  </p>
                </div>
                {student && student.student && (
                  <Table
                    trigger="oneStudent"
                    header={tableHeader}
                    tableData={student.student.enrolled_courses}
                  />
                )}
              </div>
            </>
          )}
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
