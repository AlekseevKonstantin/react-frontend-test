import React, { useEffect, useState } from 'react'
import './preloader.css'

export default function Preloader (props) {
  
  const preloaderRef = React.createRef();

  let [state] = useState(function(){
    return {
      cx: props.width/2,
      cy: props.height/2,
      r: props.width/2 - props.strokeWidth*2,
    }
  })

  useEffect(()=>{
    const circumference = 2 * Math.PI * (props.width / 2 - props.strokeWidth * 2);
    let preloader = preloaderRef.current;
    preloader.style.strokeDasharray = `${circumference} ${circumference}`;
    preloader.style.strokeDashoffset = circumference - circumference * 70 / 100;
  }, [])

  return (
    <div className="preloader-wrapper">
      <svg className="preloader" width={props.width} height={props.height}>
        <circle ref={preloaderRef}
                className="preloader__circle"
                stroke={props.strokeColor}
                strokeWidth={props.strokeWidth}
                cx={state.cx}
                cy={state.cy}
                r={state.r}
                fill="transparent" />
      </svg>  

      <h2 className="preloader__title">Загрузка ...</h2>  
    </div>
  )
}