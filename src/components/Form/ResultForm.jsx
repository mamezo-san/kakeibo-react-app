import React, { useState, useCallback } from 'react';
import TextInput from './TextInput';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import  baseUrl from '../Apis/KakeiboRails';
import  baseUrlLine from '../Apis/KakeiboRails';

const ResultForm = (props) => {

    //データ型をintegerにしている
    const numberElect = Number(props.elect);

    const numberGass = Number(props.gass);

    const numberWater = Number(props.water);

    const numberBankT = Number(props.bankT);

    const numberBankK = Number(props.bankK)

    //ここに計算式を記入する
    const resultTotal = numberElect+numberGass+numberWater+147000

    const resultTakuya = (resultTotal/2) - (77000+numberElect+numberGass) 

    const resultKyouka = (resultTotal/2) - numberWater

    const addTakuya = resultKyouka-70000

    const rTotal = numberBankT+numberBankK

    const bankToT = 25000-numberBankT

    const bankToK = 25000-numberBankK

    const bankRakuten = bankToK+bankToK

    const kyoukaDrop = bankRakuten+addTakuya+20000

    const headers = new Headers()
    headers.set("Content-Type","application/json");

    const money = {
        elect: numberElect,
        gass: numberGass,
        water: numberWater,
        r_takuya: numberBankT,
        r_kyouka: numberBankK,
        total: resultTotal,
        addTakuya: addTakuya,
        bankRakuten: bankRakuten,
        kyoukaDrop: kyoukaDrop
    };

    // const message = "sample"
    
    const submitForm = () =>{
      
      fetch(baseUrl,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(money)
      })
    //railsだと非同期処理かけるが、expressだと非同期にすると処理が進まない
    //   .then(() => {
        alert(`保存しました`);
        return props.handleClose()
    //   })
  };
//   console.log(fetch.body);
//   debugger






    

    // const linePost = () => {

    //     const line = require('@line/bot-sdk');

    //     const client = new line.Client({
    //       channelAccessToken: '20gVBOfyYhFUlh0z12Pk5YXqCI8rWRy2QwcOzCi5frHXZVZsnyWVMbxBvVcgKeNsx7eJo2wRN1FltRA7bHWDmWFaQPyxmclhE6TWKP8kGosnpYo0Exs1l+X4SqoNaavp9se2eB1OJ9HqhkCjlnn73QdB04t89/1O/w1cDnyilFU='
    //     });

    //     const message = {
    //       type: 'text',
    //       text: '今月の生活費のお知らせです\n' +
    //             '合計金額:' + money.total + '\n' +
    //             '電気代:' + money.elect + '\n' 
    //     };

    //     client.pushMessage('U7e2a632321c91095008d774c5a52c2e1', message)
    //       .then(() => {
    //         alert('LINEに送信しました')
    //       })
    //       .catch((err) => {
    //         // error handling
    //       });

    // };


    return(
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>生活費計算結果</DialogTitle>
            <DialogContent>
                <div>
                    支出額合計:{resultTotal}円
                </div>
                <div>
                    拓哉支払額:{resultTakuya}円
                </div>
                <div>
                    京香みずほから引き出す額:{resultKyouka}円
                </div>
                <div>
                    拓哉への補填代金:{addTakuya}円
                </div>
                <div>
                    三井住友に貯金する額:{rTotal}円
                </div>
                <div>
                    楽天口座送金額：{bankRakuten}円
                </div>
                {/* <div>
                    拓哉楽天口座送金額:{bankToT}円
                </div>
                <div>
                    京香楽天口座送金額:{bankToK}円
                </div> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    キャンセル
                </Button>
                {/* <Button onClick={submitFormLine} color="primary">
                    LINEで送信する
                </Button> */}
                <Button onClick={submitForm} color="primary">
                    保存する
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ResultForm;