import React, { useState,useCallback } from 'react';
import Month from './Month';
import MoneyForm from './MoneyForm';
import PostForm from './Form/PostForm';

const Main = () => {

    const [open,setOpen] = useState(false);

    const handleOpen = useCallback(() => {
        setOpen(true)
    },[setOpen]);

    const handleClose = useCallback(() => {
        setOpen(false)
    },[setOpen]);

    return(
        <div>
            <Month />
            <MoneyForm />
            <PostForm open={open} handleOpen={handleOpen} handleClose={handleClose} />
            <button onClick={handleOpen}>
                生活費を計算する
            </button>
        </div>
    )
}

export default Main;