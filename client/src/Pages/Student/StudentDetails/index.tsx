import React from "react";
import Header from "Components/Header";
import Paginate from "Components/Pagination";
import Table from "Components/Table";
import Footer from "Components/Footer";
import styles from "./style.module.scss";

export default function OneStudent() {
  return (
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
            <p className={styles.buton}>Add Course</p>
          </div>
          <Table trigger="oneStudent"/>
          <Paginate />
        </div>
      </div>
      <Footer />
    </div>
  );
}
