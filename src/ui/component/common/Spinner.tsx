import React from 'react';
import spinner from '../../images/icons/spinner.svg'
import {ReactSVG} from "react-svg";
import styles from '../../styles/Spinner.module.scss'

export const Spinner = () => {
   return (
      <div className={styles.wrap}>
         <div className={styles.spinner}>
            <ReactSVG src={spinner}/>
         </div>
      </div>
   );
};

