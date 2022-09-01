import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Historic from '../components/Historic';
import IStyle from '../typings/types';

import { newDeck } from '../util/api';
import { setStorage } from '../util/func';


const style: IStyle = {
    card: {
        background: "rgba(1,1,1,.3)"
    },
    container: {
        display: "flex",
        paddingBottom: "20px"
    }
}

const Home = () => {
    const inputEl: React.MutableRefObject<HTMLInputElement | null> = React.useRef(null);
    let navigate = useNavigate();

    const onButtonClick = () => {

        if (!inputEl.current || !inputEl.current["value"]) return;


        newDeck(inputEl.current.value).then(data => {
            if (!inputEl.current) return;

            setStorage({ deck_id: data.deck_id, name: inputEl.current.value })
            navigate(`/${data.deck_id}&${inputEl.current.value}`)
        });
    };

    return (
        <>
            <Header />

            <div style={style.card} className="card center">
                <h3>Qual o seu nome?</h3>
                <div style={style.container}>
                    <input ref={inputEl} type="text" ></input>
                    <button onClick={onButtonClick}>Ver cartas</button>
                </div>
                <Historic />
            </div>

        </>
    )
}

export default Home;