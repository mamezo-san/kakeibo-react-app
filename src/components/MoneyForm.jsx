import React, { useState,useEffect, useCallback } from 'react';
// import Resources from './Resources';
import MoneyIndex from './MoneyIndex';
import baseUrl from './Apis/KakeiboRails';
import { Table } from '@material-ui/core';
import { mockComponent } from 'react-dom/test-utils';
import moment from 'moment';

const MoneyForm = () => {

    const[moneys,setMoneys] = useState([]);

    // const [open,setOpen] = useState(false);

    // const handleOpen = useCallback(() => {
    //     setOpen(!open)
    // },[open]);

    const getMoneys = async () => {
        await fetch(baseUrl)
            .then((res) => {
            if (!res.ok) {
              throw new Error('error');
          }
          return res.json();
        })
            .then((result) => {
                setMoneys(result)
                // console.log('ok');
        })
            .catch((reason) => {
            console.log(reason);
        })
    };

    // const getYearMonth = (created_at) => {
    //     let yearMonth = ""
    //     const date = created_at.toString()
    //     const year = date.getFullYear();
    //     const month = date.getMonth();
    //     return yearMonth = year + '年' + month + '月'
    // }

    // console.log(moneys);

    const headers = new Headers()
    headers.set("Content-Type","application/json");

    const deleteMoney = async(id) =>{
        await fetch(baseUrl+"/delete/"+id,{
            method: "POST"
        })
        .then((res) => {
            if (!res.ok) {
              throw new Error('error');
          }
          alert (`${id}を削除しました`)
          return res.json();
        })
            .then((result) => {
                setMoneys(result)
                // console.log('ok');
        })
            .catch((reason) => {
            console.log(reason);
        })
    };
    return(
        <div>
            {/* <button onClick={()=> handleOpen()}>生活費一覧</button> 
            {(open === true) &&(
                <MoneyIndex moneys={moneys} />
            )} */}
            <button onClick={() => getMoneys()}>生活費一覧</button>
            {(moneys.length > 0) ? 
                    <table border="1">
                        <tbody>
                            <tr>
                                <th>年月</th>
                                <th>合計金額</th>
                                <th>電気代</th>
                                <th>水道代</th>
                                <th>ガス代</th>
                            </tr>
                            {moneys.map(money => (
                                <tr key={money.id}>
                                    {/*年と月表示にする */}
                                    <th>{moment(money.created_at).format('YYYY-MM')}</th>
                                    {/* <th>{money.created_at}</th> */}
                                    <th>{money.total}</th>
                                    <th>{money.elect}</th>
                                    <th>{money.water}</th>
                                    <th>{money.gass}</th>
                                    <button onClick={() => deleteMoney(money.id)}>削除</button>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                : <div>生活費は空です</div>
            }
        </div>
    )
}

export default MoneyForm;
