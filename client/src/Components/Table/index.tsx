import React from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import styles from "./style.module.scss";

export default function InfoTable() {
  return (
    <div className={styles.info}>
      <Table striped hover responsive="lg" borderless>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Link to="/student/1"><td>Mark</td></Link>
            <td>Otto</td>
            <td>mark.otto@gmail.com</td>
            <td>Not Enrolled</td>
            <td>Edit Delete</td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>mark.otto@gmail.com</td>
            <td>Not Enrolled</td>
            <td>Edit Delete</td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>mark.otto@gmail.com</td>
            <td>Not Enrolled</td>
            <td>Edit Delete</td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>mark.otto@gmail.com</td>
            <td>Not Enrolled</td>
            <td>Edit Delete</td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>mark.otto@gmail.com</td>
            <td>Not Enrolled</td>
            <td>Edit Delete</td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>mark.otto@gmail.com</td>
            <td>Not Enrolled</td>
            <td>Edit Delete</td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>mark.otto@gmail.com</td>
            <td>Not Enrolled</td>
            <td>Edit Delete</td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>mark.otto@gmail.com</td>
            <td>Not Enrolled</td>
            <td>Edit Delete</td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>mark.otto@gmail.com</td>
            <td>Not Enrolled</td>
            <td>Edit Delete</td>
          </tr>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>mark.otto@gmail.com</td>
            <td>Not Enrolled</td>
            <td>Edit Delete</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
