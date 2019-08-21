import React from 'react';
import LimitCardPie from './LimitCardPie';
import styles from './style/LimitCard.css';
import cx from 'classnames';

function LimitCard(props) {
  return (
    <div className={styles.card}>
      <LimitCardPie data={props.data} color={props.colorKey} />
      <div className={styles.profile}>
        <div>
          <span className={cx(
            styles.inuse,
            {
              [styles.cores]: 'cores' === props.colorKey,
              [styles.ram]: 'ram' === props.colorKey,
              [styles.instances]: 'instances' === props.colorKey
            }
          )}>
            {props.data.in_use}
          </span>
          /
          <span className={styles.limit}>
            {props.data.limit}
          </span>
          </div>
        <p>{props.kind}</p>
      </div>
    </div>
  )
}

export default LimitCard;