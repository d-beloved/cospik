import React from "react";
import Table from "react-bootstrap/Table";
import styles from "./style.module.scss";

export default function InfoTable() {
  return (
    <Table striped hover responsive="lg">
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
        <tr>
          <td>Mark</td>
          <td>Otto</td>
          <td>mark.otto@gmail.com</td>
          <td>Not Enrolled</td>
          <td>Edit Delete</td>
        </tr>
      </tbody>
    </Table>
  );
}
