import React from 'react';

import styles from './style/QuotaItem.css';

const QuotaItem = (props) => {
  const {title, used, left, limit, pbUsed, pbLeft } = props;

  return (
    <div className={styles.item}>
      <div className={styles.description}>
        <h4 className={styles.title}>{title}</h4>
      </div>

      <div className={styles.number}>
        <span className={styles.numberUsed}>{used} 已用</span>
        <span className={styles.numberSep}>|</span>
        <span className={styles.numberLeft}>{left} 剩余</span>
        <span className={styles.numberSep}>|</span>
        <span className={styles.numberLimit}>{limit} 配额</span>
      </div>

      <div className={styles.progressbar}>
        <div className={styles.pbUsed} style={{ width: pbUsed }}></div>
        <div className={styles.pbLeft} style={{ width: pbLeft }}></div>
      </div>
    </div>
  )
};

export default QuotaItem;
