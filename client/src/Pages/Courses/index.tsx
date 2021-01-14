import React from 'react';
import Header from 'Components/Header';
import InfoTable from 'Components/Table';
import Paginate from 'Components/Pagination';
import Footer from 'Components/Footer';
import styles from "./style.module.scss";

export default function AllStudents() {
  return (
    <>
      <Header action="Add Course" goTo="Students" goToLink="/students" />
      <div className={styles.students}>
        <p>
          <h1 className={styles.heading}>All Courses</h1>
          <hr/>
        </p>
        <InfoTable />
        <Paginate />
        <Footer />
      </div>
    </>
  );
};