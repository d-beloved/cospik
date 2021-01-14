import React from "react";
import Header from "Components/Header";
import InfoTable from "Components/Table";
import Paginate from "Components/Pagination";
import Footer from "Components/Footer";
import styles from "./style.module.scss";

export default function AllStudents() {
  return (
    <>
      <div className={styles.students}>
        <Header action="Add Student" goTo="Courses" goToLink="/courses" />
        <div className={styles.content}>
          <p>
            <h1 className={styles.heading}>All Students</h1>
            <hr />
          </p>
          <InfoTable />
          <Paginate />
        </div>
        <Footer />
      </div>
    </>
  );
}
