import React, { useState, useEffect } from "react";
import c from '../../consts/consts'
import './autocomplete.css';
import { getCityId } from '../../store/cities';

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
          <div className="autocomplete__list-item" key={i} onClick={chooseItem}>{item}</div>
        )
      })
    }
  }

  let [list] = useState(function(){
    return initList ()
  })


  let [viewList, setViewList] = useState(function(){
    return [];
  })

  let [value, setValue] = useState(''); 

  let [isCheck, setCheck] = useState(false);

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
    setCheck(true)
    setTimeout(function(){
      input.focus()
    },100)
    
    const id = getCityId(e.target.innerText)
    props.fetchWeatherById(id, props.apiKey, c.SET_CUR_CITY)
    props.setDefaultId(id)
  }

  function clearInput (e) {
    e.preventDefault();
    const input = inputRef.current;
    input.value = '';
    setValue('');
    setCheck(false)
  }

  const inputAddClass = viewList.length > 0 ? "active" : ''
  const listAddClass =  viewList.length === 0 ? "hidden" : ''
  const btnAddClass = isCheck ? 'active' : 'hidden';

  return (
    <div className="autocomplete">
      <div className="autocomplete-inner">
        <input type="text" 
               className={`autocomplete__input ${inputAddClass}`} 
               onChange={autocompleteChange} 
               ref={inputRef}
               placeholder={props.placeholder}/>
        <div className="autocomplete-btn-group">       
          <button type="button" 
                  className={`autocomplete__clear ${btnAddClass}`} 
                  onClick={clearInput}>
            <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="https://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </button>
          {/* <button type="button" 
                  className="autocomplete__check"
                  onClick={enterCity}>
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
              <path fill-rule="evenodd" d="M 22.59375 3.5 L 8.0625 18.1875 L 1.40625 11.5625 L 0 13 L 8.0625 21 L 24 4.9375 Z" />
            </svg>
          </button> */}
        </div>
      </div>

      <div className={`autocomplete__list ${listAddClass}`}>
        {viewList.length > 0 ? listToProps(): null}
      </div>
    </div>
  );
}

