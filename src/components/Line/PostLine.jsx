import React, { useCallback, useState } from 'react';
import TextInput from '../Form/TextInput';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const PostLine = (props) => {

    const [line,setLine] = useState("");

    const inputLine = useCallback((event) => {
        setLine(event.target.value)
    },[setLine]);

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
    headers.set("Content-Type","application/json")

    const submitLine = () =>{
        const isBlank = validateRequiredInput(line)
    
        if(isBlank) {
          alert('空白です')
          return false
        } else {
          const message = {
            message: line
          };
          fetch("http://127.0.0.1:3001/api/v2/lines", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(message)
          }).then(() => {
                  alert('LINEに送信しました');
                  setLine("");
                  return props.handleClose();
              })
        }
      };

    return(
        <div>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Line送信画面</DialogTitle>
                <DialogContent>
                  <TextInput 
                    label={"金額"} multiline={false} row={1}
                    value={line} type={"line"} onChange={inputLine}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={props.handleClose} color="primary">
                    キャンセル
                  </Button>
                  <Button onClick={submitLine} color="primary">
                      送信する
                  </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PostLine;