import React from 'react';
import styles from "./Preloader.module.css"
import preloaderImage from '../../../assets/loader.svg'

let Preloader = (props) => {
    return <div className={styles.preloader}>
        <img src={preloaderImage} alt = 'Preloader'/>
    </div>
};

export default Preloader;