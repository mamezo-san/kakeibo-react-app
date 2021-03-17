import React, {useState} from 'react';

const Header = (props) => {

    const [isModal,modalOpen] = useState(false)

    let modal="";

    {if(isModal){
        modal="拓哉と京香の生活費計算アプリである"
    }}

    return(
        <div>
            <h2>{props.title}</h2>
            <p onClick={()=> modalOpen(!isModal)}>{props.subtitle}</p>
            <p>
                {modal}
            </p>
        </div>
    );
}

export default Header;