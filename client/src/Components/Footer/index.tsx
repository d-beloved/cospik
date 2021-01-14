import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <p>Copyright &copy; <Link to="https://github.com/d-beloved">Ayodeji</Link> {new Date().getFullYear()}</p>
  );
}
