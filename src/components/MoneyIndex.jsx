import React,{useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const MoneyIndex = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const moneys = props.moneys;

  const id = "";

//   var arr = [1,2,3];
// var max = arr.reduce(function(a, b) {
//     return Math.max(a, b);
// });

//moneysの一番大きいidを取り出す
const latestId = (moneys) => {
  const moneysId = [];
    moneys.map(money => {
    moneysId.push(money.id)
  })
  // console.log(moneysId);
  const max = Math.max(...moneysId);
  return id.set(max)
}

// console.log(latestId(moneys));

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        生活費一覧
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"生活費一覧"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {id}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> latestId(moneys)} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MoneyIndex;