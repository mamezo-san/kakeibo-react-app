import React, { useState, useCallback } from 'react';
import TextInput from './TextInput';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import baseUrl from '../Apis/KakeiboRails';

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

    const bankToT = 35000-numberBankT

    const bankToK = 35000-numberBankK

    const headers = new Headers()
    headers.set("Content-Type","application/json");
    
    const submitForm = () =>{
      const money = {
        elect: numberElect,
        gass: numberGass,
        water: numberWater,
        r_takuya: numberBankT,
        r_kyouka: numberBankK,
        total: resultTotal
      };
      // debugger
      fetch(baseUrl,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(money)
      }).then(() => {
        alert(`保存しました`);
        return props.handleClose()
      })
  };


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
                    京香支払額:{resultKyouka}円
                </div>
                <div>
                    拓哉への補填代金:{addTakuya}円
                </div>
                <div>
                    楽天残高合計:{rTotal}円
                </div>
                <div>
                    拓哉楽天口座送金額:{bankToT}円
                </div>
                <div>
                    京香楽天口座送金額:{bankToK}円
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    キャンセル
                </Button>
                <Button onClick={submitForm} color="primary">
                    保存する
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ResultForm;