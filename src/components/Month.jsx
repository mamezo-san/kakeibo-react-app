import React,{useState,useEffect} from 'react';

const Month = () => {

    const [count,counter] = useState(1);

    const countUp = () =>{
        counter(count+1)
    }

    // useEffect (() => {
    //     document.getElementById('counter').addEventListener('click',countUp)
    //     if(count>=13){
    //         counter(1)
    //     }
    //     return() => 
    //         document.getElementById('counter').removeEventListener('click',countUp)
    // },[]);

    return(
        <div>
            <button id={'counter'}
            >
                {count}月
            </button>
        </div>
    )
};

export default Month;