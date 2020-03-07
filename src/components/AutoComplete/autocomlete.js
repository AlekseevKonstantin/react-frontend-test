import React, { useState, useEffect } from "react";

import styles from './autocomplete.module.css';

export default function AutoComplete (props) {

  const inputRef = React.createRef();

  function initList () {
    if (props.list) {
      return props.list
    } else if (props.request && props.request.type === 'Function') {
      return props.request();
    } else {
      return [] 
    }
  }

  const listToProps = () => {
    if (viewList) {
      return viewList.map((item, i)=>{
        return (
          <div className={styles.autocomplete_list__item} key={i} onClick={chooseItem}>{item}</div>
        )
      })
    }
  }

  let [list, setList] = useState(function(){
    return initList ()
  })


  let [viewList, setViewList] = useState(function(){
    return [];
  })

  let [value, setValue] = useState(''); 

  function autocompleteChange (e) {
    let val = e.target.value;
    setValue(val)
  }

  useEffect(()=>{
    if (value !== '') {
      let newList = list.filter((listItem) => {
        let current = listItem.toLowerCase().trim(),
            val = value.toLowerCase().trim()
        return current.indexOf(val) > -1
      })

      setViewList(newList)

    }else{
      setViewList([])
    }

  }, [value])

  function chooseItem (e) {
    const input = inputRef.current;
    input.value = e.target.innerText;
    setValue('');
  }

  function clearInput (e) {
    e.preventDefault();
    const input = inputRef.current;
    input.value = '';
    setValue('');
  }

  const inputAddClass = viewList.length > 0 ? styles.autocomplete_active : ''
  const listAddClass =  viewList.length === 0 ? styles.autocomplete_list_hidden : ''

  return (
    <div className={styles.autocomplete}>
      <div className={styles.autocomplete_inner}>
        <input type="text" className={`${styles.autocomplete_input} ${inputAddClass}`} onChange={autocompleteChange} ref={inputRef}/>
        <button className={styles.autocomplete_clear} onClick={clearInput}>
          <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="https://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </button>
      </div>

      <div className={`${styles.autocomplete_list} ${listAddClass}`}>
        {viewList.length > 0 ? listToProps(): null}
      </div>
    </div>
  );
}

