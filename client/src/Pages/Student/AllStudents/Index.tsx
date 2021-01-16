import React, { useState, useEffect } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import Paginate from "react-js-pagination";
import { getStudents } from "Store/actions/student.action";
import Spinner from 'react-bootstrap/Spinner'
import Header from "Components/Header";
import InfoTable from "Components/Table";
import Footer from "Components/Footer";
import styles from "./style.module.scss";


const tableHeader: Array<string> = ['First Name', 'Last Name', 'Email', 'Status', ''];

interface AllStudentsState {
  activePage: number
}

export default function AllStudents() {
  const [state, setState] = useState<AllStudentsState>({
    activePage: 1
  });
  const dispatch = useDispatch();
  const students = useMappedState(({ studentReducer }: any) => studentReducer);
  const loading = students.loading;

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  const handlePageChange = (pageNumber: number) => {
    setState({activePage: pageNumber});
  }

  return (
    <>
      <div className={styles.students}>
        <Header
          action="New Student"
          goTo="Courses"
          goToLink="/courses"
          trigger="student"
        />
        <div className={styles.content}>
          <p>
            <h1 className={styles.heading}>All Students</h1>
            <hr />
          </p>
          {loading ? (
            <Spinner className={styles.loader} animation="grow" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            students && students.student &&
            <div>
              <InfoTable trigger="student" header={tableHeader} tableData={students.student.students} />
              <div className={styles.paginate}>
              <Paginate
                activePage={state.activePage}
                itemsCountPerPage={1}
                totalItemsCount={students.student.students.length}
                pageRangeDisplayed={3}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
              />
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
