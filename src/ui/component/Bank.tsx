import React from 'react';
import {Link, Navigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../bll/store";
import {DomainDataT} from "../../bll/banks-reducer";
import styles from '../styles/Bank.module.scss'
import {PATH} from "../router/Router";

export const Bank = () => {
   const {id} = useParams()

   const banks = useAppSelector<DomainDataT[]>(state => state.banks.currentData)
   const currentBank = banks.filter(el => el.id === id)[0]

   if (!currentBank) return <Navigate to={PATH.HOME}/>

   return (
      <div className={styles.container}>
         <div className={styles.tableConditions}>
            <h1><img src={currentBank.organization.logo} alt="bank logo"/></h1>

            <ul className={styles.list}>
               <li><span>Программа</span> {currentBank.name}</li>
               <li>
                  <span>Сумма</span>
                  {currentBank.rate.creditAmount.to
                     ? `${currentBank.rate.creditAmount.from} ₽ - ${currentBank.rate.creditAmount.to} ₽`
                     : `${currentBank.rate.creditAmount.from} ₽`}
               </li>
               <li><span>Срок</span> от {currentBank.rate.periods[0].term.from} до {currentBank.rate.periods[0].term.to}
               </li>
               <li><span>Ставка</span> {currentBank.rate.periods[0].rate.from}% - {currentBank.rate.periods[0].rate.to}%
               </li>
               <li><span>Лиц.</span> № {currentBank.organization.license}</li>
            </ul>

            <Link className={styles.link} to={PATH.HOME}>
               <button className={styles.btn}>Вернутся</button>
            </Link>
         </div>
      </div>
   )
}

