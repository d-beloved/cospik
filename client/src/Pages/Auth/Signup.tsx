import React from "react";
import { Link } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from './auth.module.scss';
import logo from 'Assets/images/COSPIK.png'

export default function Signup() {
  return (
    <div className={styles.auth}>
      <p className={styles.welcome}>Welcome to <span className={styles.logo}><img src={logo} alt="logo"/></span></p>
      <Form className={styles.form}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Form.Text className={styles.textShow}>
          Have an account? <Link to='/login'>Login here</Link>
        </Form.Text>

        <Button variant="primary" type="submit" block>
          Signup
        </Button>
      </Form>
    </div>
  );
}
