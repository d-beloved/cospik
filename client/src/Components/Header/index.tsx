import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import styles from "./style.module.scss";
import logo from "Assets/images/COSPIK.png";

interface Props {
  action?: string;
}

export default function Header({ action }: Props) {
  return (
    <Navbar expand="lg" className={styles.head} collapseOnSelect>
      <Navbar.Brand href="/students" className={styles.logo}>
        <img src={logo} alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className={styles.burger}
      />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Nav.Link href="#home" id={styles.action}>
            {action}
          </Nav.Link>
        <Navbar.Text id={styles.user}>Admin</Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
