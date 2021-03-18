import React, { useState, useCallback } from 'react';
import TextInput from './TextInput';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import baseUrl from '../Apis/KakeiboRails';
import ResultForm from './ResultForm';

const PostForm = (props) =>{

  const [elect,setElect] = useState("");

  const [gass,setGass] = useState("");

  const [water,setWater] = useState("");

  const [bankT,setBankT] = useState("");

  const [bankK,setBankK] = useState("");

  const inputElect = useCallback((event) => {
    setElect(event.target.value)
  },[setElect]);

  const inputGass = useCallback((event) => {
    setGass(event.target.value)
  },[setGass]);

  const inputWater = useCallback((event) => {
    setWater(event.target.value)
  },[setWater]);

  const inputBankT = useCallback((event) => {
    setBankT(event.target.value)
  },[setBankT]);

  const inputBankK = useCallback((event) => {
    setBankK(event.target.value)
  },[setBankK]);

  const validateRequiredInput = (...args) => {
    let isBlank = false;
    for (let i = 0; i < args.length; i=(i+1)|0) {
        if (args[i] === "") {
            isBlank = true;
        }
    }
    return isBlank
  };

  const headers = new Headers()
    headers.set("Content-Type","application/json");

  const [open,setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true)
  },[setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false)
  },[setOpen]);

  const submitForm = () =>{
    const isBlank = validateRequiredInput(elect,gass,water,bankT,bankK)

    if(isBlank) {
      alert('空白です')
      return false
    } else {
      const money = {
        elect: elect,
        gass: gass,
        water: water,
        r_takuya: bankT,
        r_kyouka: bankK
      };
      // debugger
      fetch(baseUrl,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(money)
      }).then(() => {
        alert(`保存しました`);
        setElect("")
        setGass("")
        setWater("")
        setBankT("")
        setBankK("")
        return props.handleClose()
      })
    }
  };

  

  return(
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>生活費計算フォーム</DialogTitle>
      <DialogContent>
        <TextInput 
          label={"電気代"} multiline={false} row={1}
          value={elect} type={"elect"} onChange={inputElect}
        />
        <TextInput 
          label={"ガス代"} multiline={false} row={1}
          value={gass} type={"gass"} onChange={inputGass}
        />
        <TextInput 
          label={"水道代"} multiline={false} row={1}
          value={water} type={"water"} onChange={inputWater}
        />
        <TextInput 
          label={"拓哉の楽天残高"} multiline={false} row={1}
          value={bankT} type={"r_takuya"} onChange={inputBankT}
        />
        <TextInput 
          label={"京香の楽天残高"} multiline={false} row={1}
          value={bankK} type={"r_kyouka"} onChange={inputBankK}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={handleOpen} color="primary">
            計算する
        </Button>
        <ResultForm open={open}
                    handleOpen={handleOpen} 
                    handleClose={handleClose}
                    elect={elect}
                    gass={gass}
                    water={water}
                    bankT={bankT}
                    bankK={bankK}
        />
        <Button onClick={submitForm} color="primary">
            データを保存する
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PostForm;