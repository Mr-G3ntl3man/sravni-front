import React from 'react';
import styles from '../styles/NotFound.module.scss'
import {PATH} from "../router/Router";
import {Link} from "react-router-dom";

export const NotFound = () => {
   return (
      <div className={styles.container}>
         <div className={styles.wrap}>
            Странница не найдена.
            <Link className={styles.link} to={PATH.HOME}>
               <button className={styles.btn}>Вернутся</button>
            </Link>
         </div>
      </div>
   )
}

