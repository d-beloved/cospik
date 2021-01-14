import React from "react";
import Header from "Components/Header";
import Paginate from "Components/Pagination";
import Footer from "Components/Footer";
import styles from "./style.module.scss";

export default function OneStudent() {
  return (
    <div className={styles.detail}>
      <Header goTo='Students' goToLink='/students'/>
      <div className={styles.content}>
        
      </div>
      <Footer />
    </div>

  )
}
