import React, {useEffect} from 'react';
import {FilterForm} from "./FilterForm";
import styles from "../styles/HomePage.module.scss";
import {Spinner} from "./common/Spinner";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../bll/store";
import {BankCard} from "./BankCard";
import {DomainDataT, fetchData} from "../../bll/banks-reducer";
import {Tooltip} from "./common/Tooltip";

export const HomePage = () => {
   const dispatch = useDispatch()

   const error = useAppSelector<boolean>(state => state.app.error)
   const loading = useAppSelector<boolean>(state => state.app.loading)
   const banks = useAppSelector<DomainDataT[]>(state => state.banks.currentData)
   const className = loading ? `${styles.container} ${styles.loading}` : `${styles.container}`

   const banksCards = banks.map((b, i) => <BankCard key={i} bank={b}/>)

   useEffect(() => {
      dispatch(fetchData(10))
   }, [dispatch])

   return (
      <>
         <main className={className}>
            <h1>Ипотечный калькулятор</h1>

            <FilterForm/>

            <div className={styles.cardWrap}>
               {banksCards}
               {!banks.length && <div className={styles.notFound}>Ничего не найдено.</div>}
            </div>
         </main>

         {loading && <Spinner/>}
         {error && <Tooltip/>}
      </>
   )
}

