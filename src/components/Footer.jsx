import React ,{ useState,useCallback }from 'react';
import PostLine from './Line/PostLine';


const Footer = (props) => {

    const [open,setOpen] = useState(false);

    const handleOpen = useCallback(() => {
        setOpen(true)
    },[setOpen]);

    const handleClose = useCallback(() => {
        setOpen(false)
    },[setOpen]);

    return(
        <div>
            <PostLine open={open} handleClose={handleClose} handleOpen={handleOpen}/>
            <button onClick={handleOpen}>
                {props.line}
            </button>
            {console.log(open)}
        </div>
    );
}

export default Footer;