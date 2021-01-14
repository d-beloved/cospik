import React from 'react';
import Header from 'Components/Header';
import InfoTable from 'Components/Table';
import Paginate from 'Components/Pagination';
import Footer from 'Components/Footer';
import styles from "./style.module.scss";

export default function AllStudents() {
  return (
    <>
      <Header action="Add Student" />
      <div className={styles.students}>
        <h1>All Students</h1>
        <InfoTable />
        <Paginate />
        <Footer />
      </div>
    </>
  );
};
