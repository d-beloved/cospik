import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import styles from "./style.module.scss";
import logo from "Assets/images/COSPIK.png";

interface Props {
  action?: string;
  goTo: string;
  goToLink: string;
}

export default function Header({ action, goTo, goToLink }: Props) {
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
          {action ? (
            <Nav.Link href="#home" id={styles.action}>
              {action}
            </Nav.Link>
          ) : null}
          <Nav.Link href={goToLink} id={styles.action}>
            {goTo}
          </Nav.Link>
          <Navbar.Text id={styles.user}>Admin</Navbar.Text>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
