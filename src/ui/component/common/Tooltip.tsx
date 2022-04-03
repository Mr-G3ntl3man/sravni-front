import React from 'react';
import styles from '../../styles/Tooltip.module.scss'
import {useAppSelector} from "../../../bll/store";

export const Tooltip = () => {
   const message = useAppSelector<string>(state => state.app.errorMessage)

   return (
      <div className={styles.container}>
         <span>{message}</span>
      </div>
   );
};