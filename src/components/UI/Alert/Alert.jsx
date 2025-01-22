import React from 'react';
import styles from './Alert.module.css';

const Alert = (props) => {
    return (
        <div className={styles.alert}>
            <div className={styles.alert__text}>
                {props.text}
            </div>
        </div>
    )
};

export default Alert;