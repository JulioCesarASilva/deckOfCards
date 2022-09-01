import React from 'react';
import { useNavigate } from 'react-router-dom';

import IStyle, { IStorage } from '../typings/types';

import { getStorage } from '../util/func';

const style: IStyle = {
    container: {
        position: "relative",
        cursor: "pointer",
        fontSize: "16px",
        textDecoration: "underline"
    }
}


const Historic = () => {
    const [storage, setStorage] = React.useState<IStorage | null>()
    const navigate = useNavigate()

    React.useEffect(() => {
        setStorage(getStorage())
    },[])

    return <>{storage && <span onClick={() => navigate(`/${storage.deck_id}&${storage.name}`)} style={style.container}>Ir para o jogo criado em {storage.time}</span>}</>
}

export default Historic