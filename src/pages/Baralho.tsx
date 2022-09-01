import React from 'react';
import { useParams } from 'react-router-dom';
import Carta from "../components/Carta";

import { listCard, newCard, shuffleCards } from '../util/api';
import IDeck from '../typings/deckofcardsapi';
import IStyle from '../typings/types';
import Header from '../components/Header';

const style: IStyle = {
    container: {
        display: "flex",
        overflowX: "auto",
        maxWidth: "100vw",
        marginBottom: "50px"
    },
    pegar: {
        marginRight: "20px"
    }
}

const Baralho = () => {
    let { deck_id, name } = useParams();

    const [dataUser, setDataUser] = React.useState<IDeck | null>(null)

    React.useEffect(() => {
        getCards();
    })

    const getCards = () => {
        if (!deck_id || !name) return;

        listCard(deck_id, name).then((data: IDeck) => setDataUser(data))
    }

    const onButtonClick = () => {
        if (!deck_id || !name) return;

        newCard(deck_id, name).then(() => getCards());
    };

    const onButtonShuffle = () => {
        if (!deck_id || !name) return;

        shuffleCards(deck_id, name).then(() => getCards());
    };

    return <>{(!!dataUser && !!dataUser.piles && !!name) && <>
        { deck_id && name && <Header deck_id={deck_id} deck_name={name} back={true} />}
        <div>
        <div style={style.container}>
            {dataUser.piles[name].cards.map((card, i) => <Carta key={i} {...card} />)}
        </div>

        {(dataUser.piles[name].cards.length <= 8) && <button style={style.pegar} onClick={onButtonClick}>Pegar</button>}
        <button onClick={onButtonShuffle}>Embaralhar</button>
        </div>
    </>}
    </>
}

export default Baralho;