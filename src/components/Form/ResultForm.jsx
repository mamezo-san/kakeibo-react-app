import React, { useState, useCallback } from 'react';
import TextInput from './TextInput';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import baseUrl from '../Apis/KakeiboRails';

const ResultForm = (props) => {

    const [result,setResult] = useState();
    //ここに計算式を記入する
    const resultTotal = () => {
        setResult(props.elect+props.gass+props.water+14700)
    }

    return(
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>生活費計算結果</DialogTitle>
            <DialogContent>
                {/* string=>integer */}
                <div>{props.elect+props.gass+props.water}</div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    キャンセル
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ResultForm;