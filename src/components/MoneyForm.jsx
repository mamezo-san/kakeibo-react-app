import React, { useState } from 'react';
import Resources from './Resources';
import KakeiboRails from '../Apis/KakeiboRails';

const MoneyForm = () => {
    const [ resources,setResources] = useState ([]);

    const getTotals = async () => {
        try {
            const totals = await  KakeiboRails.get('/');
            setResources(totals.data);
        }catch (error){
            console.log(error);
        }
    };


    return(
        <div>
            <button onClick={getTotals}>生活費一覧</button>
            <Resources resources={resources}/>
        </div>
    )
}

export default MoneyForm;