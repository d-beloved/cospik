import React from "react";
import Header from "Components/Header";
import InfoTable from "Components/Table";
import Paginate from "Components/Pagination";
import Footer from "Components/Footer";
import styles from "../Student/AllStudents/style.module.scss";

export default function AllStudents() {
  return (
    <>
      <div className={styles.students}>
        <Header
          action="New Course"
          goTo="Students"
          goToLink="/students"
          trigger="course"
        />
        <div className={styles.content}>
          <p>
            <h1 className={styles.heading}>All Courses</h1>
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
