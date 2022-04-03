import React, {FC} from 'react';
import styles from '../styles/BankCard.module.scss'
import {Link} from "react-router-dom";
import {DomainDataT} from "../../bll/banks-reducer";

type BankCardT = {
   bank: DomainDataT
}

export const BankCard: FC<BankCardT> = ({bank}) => {
   return (
      <article className={styles.wrapper}>
         <div className={styles.column}>
            <h3><img src={bank.organization.logo} alt={'bank logo'}/></h3>
         </div>

         <div className={styles.column}>
            <span className={styles.bold}>От {bank.rate.periods[0].rate.from} %</span>
            <span>«{bank.name}»</span>
         </div>

         <div className={styles.column}>
            <span className={styles.bold}>
               {bank.rate.creditAmount.to
                  ? `${bank.rate.creditAmount.from} - ${bank.rate.creditAmount.to} ₽`
                  : `От ${bank.rate.creditAmount.from} ₽`}
            </span>
            <span> На срок {bank.rate.periods[0].term.to / 12} лет</span>
         </div>

         <div className={styles.column}>
            <span>Возраст от {bank.customerRequirements.age} {bank.customerRequirements.age <= 21 ? 'года' : 'лет'}</span>
            <span>Стаж от {bank.customerRequirements.lastExperience} месяцев</span>
            <span>{bank.customerRequirements.documents} документа</span>
         </div>

         <div className={styles.column}>
            <span>лиц. № {bank.organization.license}</span>
            <Link to={`${bank.id}`}>
               <button className={styles.btn}>Подробнее</button>
            </Link>
         </div>
      </article>
   )
}

