import React from 'react';
import Header from 'Components/Header';
import InfoTable from 'Components/Table';
import styles from "./style.module.scss";

export default function AllStudents() {
  return (
    <>
      <Header action="Add Student" />
      <div className={styles.students}>
        <h1>All Students</h1>
        <InfoTable />
      </div>
    </>
  );
};
