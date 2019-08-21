import React from 'react';
import { Carousel } from 'antd';
import home01 from 'assets/images/home_01.jpg';
import home02 from 'assets/images/home_02.jpg';
import home03 from 'assets/images/home_03.jpg';

import styles from './style/HomeContent.css';

function HomeContent() {
  return (
    <div className={styles.container}>
      <Carousel autoplay>
        <img className={styles.slider} src={home01} />
        <img className={styles.slider} src={home02} />
        <img className={styles.slider} src={home03} />
      </Carousel>
    </div>
  )
}
export default HomeContent;