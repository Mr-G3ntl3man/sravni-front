import React, {ChangeEvent} from 'react';
import {Select} from './common/Select';
import {useAppSelector} from "../../bll/store";
import {useDispatch} from "react-redux";
import {
   CurrentSortT,
   fetchData,
   setCurrentProgram,
   setCurrentSort,
   setOptionsAndFilterData,
   setPrice,
   sortData
} from "../../bll/banks-reducer";
import styles from '../styles/FilterForm.module.scss'

export const FilterForm = () => {
   const dispatch = useDispatch()

   const onSortChange = (sort: string) => {
      dispatch(setCurrentSort(sort as CurrentSortT))
      dispatch(sortData())
   }
   const onLimitChange = (limit: string) => dispatch(fetchData(+limit))
   const onProgramChange = (program: string) => dispatch(setOptionsAndFilterData(setCurrentProgram(program)))
   const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setOptionsAndFilterData(setPrice(+e.currentTarget.value)))

   const program = useAppSelector<string[]>(state => state.banks.filterOptions.program)
   const currentPrice = useAppSelector<number>(state => state.banks.filterOptions.currentPrice)
   const currentSort = useAppSelector<CurrentSortT>(state => state.banks.filterOptions.currentSort)
   const currentProgram = useAppSelector<string>(state => state.banks.filterOptions.currentProgram)

   return (
      <form className={styles.filterForm}>
         <div className={styles.column}>
            <span className={styles.title}>Программа</span>
            <Select
               items={program}
               onChange={onProgramChange}
               defaultValue={'Любая'}
               activeValue={currentProgram}
            />
         </div>

         <div className={styles.column}>
            <span className={styles.title}>Показать банков</span>
            <Select
               defaultValue={'10'}
               onChange={onLimitChange}
               items={['10', '20', '30', '40', 'Все']}
            />
         </div>

         <div className={styles.column}>
            <span className={styles.title}>Сортировать</span>
            <Select
               onChange={onSortChange}
               defaultValue={currentSort}
               items={['По ставке', 'По платежу']}
            />
         </div>

         <div className={styles.column}>
            <span className={styles.title}>Стоимость недвижимости</span>
            <input
               type="number"
               value={currentPrice}
               onChange={onPriceChange}
               className={styles.priceInput}
            />
         </div>
      </form>
   )
}

