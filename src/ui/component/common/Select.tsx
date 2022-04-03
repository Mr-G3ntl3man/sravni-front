import React, {CSSProperties, useEffect, useState} from 'react';
import styles from '../../styles/Select.module.scss'
import arrow from "../../images/icons/selectArrow.svg";

type SelectT = {
   items: string[]
   activeValue?: string
   defaultValue: string
   style?: CSSProperties
   onChange: (value: string) => void
}

export const Select: React.FC<SelectT> = (props) => {
   const {style, defaultValue, activeValue, onChange, items} = props

   const [collapsed, setCollapsed] = useState<boolean>(false)
   const [selectedValue, setSelectedValue] = useState<string>(defaultValue)

   const ulClassName = collapsed ? `${styles.selectList} ${styles.selectListActive}` : `${styles.selectList}`
   const spanClassName = collapsed ? `${styles.selectedValue} ${styles.selectedValueActive}` : `${styles.selectedValue}`

   const toggleSelect = () => {
      setCollapsed(!collapsed)
   }

   const onClickHandler = (el: string) => {
      setCollapsed(false)
      setSelectedValue(el)
      onChange(el)
   }

   const listener = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target) {
         if (!target.closest(`.${styles.select}`)
            || target.closest(`.${styles.selectItem}`)) {
            setCollapsed(false)
         }
      }
   }

   const listItem = items.map((el, index) => {
      const liClassName = el === activeValue || el === selectedValue ? `${styles.selectItem} ${styles.active}` : `${styles.selectItem}`

      return <li
         onClick={() => onClickHandler(el)}
         key={index}
         className={liClassName}>{el}</li>
   })

   useEffect(() => {
      window.addEventListener('click', listener)
      return () => {
         window.removeEventListener('click', listener)
      }
   }, [])

   return (
      <div className={styles.select}>
         <div
            className={spanClassName}
            onClick={toggleSelect}>
            <span className={styles.value}>{selectedValue}</span>
            <span className={styles.arrow}><img src={arrow} alt="arrow"/></span>
         </div>

         <ul
            style={style}
            className={ulClassName}>
            {listItem}
         </ul>
      </div>
   )
}