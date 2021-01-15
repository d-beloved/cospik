import React, { useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registerAdmin } from "Store/actions/auth.action";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from './auth.module.scss';
import logo from 'Assets/images/COSPIK.png'

interface SignupState {
  username: string;
  password: string;
}

export default function Signup() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState<SignupState>({
    username: "",
    password: "",
  });
  const { loading } = useSelector(({ adminReducer }: any) => ({
    loading: adminReducer.loading,
  }));

  const signUpAction = (e?: Event) => {
    e && e.preventDefault();
    dispatch(
      registerAdmin({ ...state }, () =>
        history.push("/auth/activation")
      )
    );
  };

  const setValue = (e: any) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

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
