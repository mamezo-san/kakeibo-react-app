import React, { useState } from 'react';
// import Resources from './Resources';
import baseUrl from './Apis/KakeiboRails';

const MoneyForm = () => {
    
    const getMoneys = async () => {
            const moneys = await  fetch(baseUrl)
            .then((res)=> {
                return(res.json());
            })
            .then((json)=> {
                return console.log(moneys.id)
            });
        }


    return(
        <div>
            <button onClick={getMoneys}>生活費一覧</button>
        </div>
    )
}

export default MoneyForm;