import React from 'react';

import { ICards } from '../typings/deckofcardsapi';
import IStyle from '../typings/types';

const style: IStyle = {
    card: {
        position: "relative",
        padding: "10px 20px",
        border: "1px solid",
        margin: "0 5px",
        borderRadius: "5px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "rgba(1,1,1,.3)"
    },
    img: {
        width: "100px"
    }
}

const Carta = ({ images, code, value }: ICards) => {
    return <div style={style.card} className="card">
        <img style={style.img} src={images.png} alt={code} />
        <div >

        <p>Tem o codigo {code}</p>
        <p>Com o valor '{value}'</p>
        </div>
    </div>
}

export default Carta