import React from 'react';
import { useNavigate } from 'react-router-dom';

import IStyle from '../typings/types';

const style: IStyle = {
    container: {
        display: "flex",
        alignItems: "center",
        width: "100%"
    },
    info: {
        marginLeft: "auto",
        display: "flex",
        width: "min-content",
        flexDirection: "column",
        alignItems: "flex-end",
        paddingRight: "10px"
    }, 
    voltar: {
        cursor: "pointer",
        paddingLeft: "10px"
    },
    name: {
        paddingLeft: "10px",
        paddingTop: "10px",
        fontWeight: 700
    }
}
interface IInfo {
    deck_id?: string,
    deck_name?: string,
    back?: boolean
}

const Header = ({ deck_id, deck_name, back }: IInfo) => {
    const navigate = useNavigate()

    return <header style={style.container}>
        { back ? <span onClick={()=> navigate("/")} style={style.voltar}>← Voltar</span> : <h2  style={style.name}>Ola!</h2>}

        <div style={style.info}>
            { deck_name && <span style={style.name}>{deck_name}</span> }
            { deck_id && <span>{deck_id}</span> }
        </div>
    </header>
}

export default Header